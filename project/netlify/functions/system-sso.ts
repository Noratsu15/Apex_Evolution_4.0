/**
 * Netlify serverless function: single sign-on from the landing to the Apex system (PHP).
 *
 * The browser sends the Supabase access token. This function:
 *   1. Verifies the Supabase user and that the e-mail is confirmed.
 *   2. Finds the user's completed MEMBERSHIP payments (RLS: only their own rows).
 *   3. Re-verifies the payment directly with PayPal (the registrations row is written by
 *      the browser, so it is never trusted on its own).
 *   4. Returns a one-time, 60-second signed token (HS256) and the system URL to open.
 *
 * Only memberships open the system. LLC / bank-account orders never grant access.
 *
 * Required environment variables (Netlify):
 *   SUPABASE_URL (or VITE_SUPABASE_URL), SUPABASE_ANON_KEY (or VITE_SUPABASE_ANON_KEY)
 *   SSO_SHARED_SECRET   — same value as SSO_SHARED_SECRET in the PHP system (min. 32 chars)
 *   SYSTEM_URL          — e.g. https://sistema.tudominio.com  (no trailing slash)
 *   PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_BASE
 */

const { createHmac, randomUUID } = require('crypto');

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';
const TOKEN_TTL_SECONDS = 60;

interface PlanRule {
  match: RegExp;
  role: 'franchisee' | 'elite_business';
  minAmount: number;
  validDays: number | null;
}

// Keep in sync with src/data/plans.ts. The Elite plan is annual; the franchise activation does not expire here
// (the PHP system controls the monthly maintenance state).
const PLAN_RULES: PlanRule[] = [
  { match: /franquiciado/i, role: 'franchisee', minAmount: 200, validDays: null },
  { match: /[eé]lite/i, role: 'elite_business', minAmount: 200, validDays: 365 },
];

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const reply = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

function signJwt(payload: Record<string, unknown>, secret: string): string {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64url(JSON.stringify(payload));
  const signature = b64url(createHmac('sha256', secret).update(`${header}.${body}`).digest());
  return `${header}.${body}.${signature}`;
}

async function paypalAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error('paypal_not_configured');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) throw new Error('paypal_auth_failed');
  return (await response.json()).access_token;
}

interface Registration {
  plan: string;
  amount_paid: number | string;
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  created_at: string;
  full_name: string | null;
}

/** True only if PayPal itself confirms the capture for this order, amount and currency. */
async function captureIsValid(reg: Registration, rule: PlanRule, token: string): Promise<boolean> {
  if (!reg.paypal_capture_id || !reg.paypal_order_id) return false;
  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/payments/captures/${encodeURIComponent(reg.paypal_capture_id)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!response.ok) return false;
  const capture = await response.json();
  const amount = Number(capture?.amount?.value);
  const orderId = capture?.supplementary_data?.related_ids?.order_id;
  return (
    capture?.status === 'COMPLETED' &&
    capture?.amount?.currency_code === 'USD' &&
    Number.isFinite(amount) &&
    amount >= rule.minAmount &&
    orderId === reg.paypal_order_id
  );
}

exports.handler = async (event: { httpMethod: string; headers: Record<string, string | undefined> }) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { error: 'method_not_allowed' });

  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  const sharedSecret = process.env.SSO_SHARED_SECRET || '';
  const systemUrl = (process.env.SYSTEM_URL || '').replace(/\/$/, '');

  if (!supabaseUrl || !anonKey || sharedSecret.length < 32 || !/^https:\/\//.test(systemUrl)) {
    return reply(500, { error: 'not_configured' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!accessToken) return reply(401, { error: 'unauthorized' });

  try {
    // 1) Who is calling? (Supabase validates the token)
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` },
    });
    if (!userResponse.ok) return reply(401, { error: 'unauthorized' });
    const user = await userResponse.json();

    if (!user?.id || !user?.email) return reply(401, { error: 'unauthorized' });
    // The PHP system links accounts by e-mail: never accept an unconfirmed address.
    if (!user.email_confirmed_at && !user.confirmed_at) return reply(403, { error: 'email_not_confirmed' });

    // 2) Their own completed membership payments (row-level security applies)
    const regResponse = await fetch(
      `${supabaseUrl}/rest/v1/registrations?select=plan,amount_paid,paypal_order_id,paypal_capture_id,created_at,full_name` +
        `&payment_status=eq.completed&order=created_at.desc&limit=5`,
      { headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` } }
    );
    if (!regResponse.ok) return reply(502, { error: 'registrations_unavailable' });
    const registrations: Registration[] = await regResponse.json();
    if (registrations.length === 0) return reply(403, { error: 'no_membership' });

    // 3) Re-verify with PayPal; pick the most recent payment that is valid and not expired
    const paypalToken = await paypalAccessToken();
    let entitled: { reg: Registration; rule: PlanRule } | null = null;
    let sawExpired = false;

    for (const reg of registrations) {
      const rule = PLAN_RULES.find((r) => r.match.test(reg.plan));
      if (!rule) continue;
      if (rule.validDays !== null) {
        const ageDays = (Date.now() - new Date(reg.created_at).getTime()) / 86_400_000;
        if (ageDays > rule.validDays) {
          sawExpired = true;
          continue;
        }
      }
      if (await captureIsValid(reg, rule, paypalToken)) {
        entitled = { reg, rule };
        break;
      }
    }

    if (!entitled) return reply(403, { error: sawExpired ? 'membership_expired' : 'no_membership' });

    // 4) Sponsor (mother-line leader), if any. Optional: ignore failures.
    let sponsor: string | null = null;
    try {
      const refResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/my_referrer`, {
        method: 'POST',
        headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: '{}',
      });
      if (refResponse.ok) {
        const rows = await refResponse.json();
        sponsor = Array.isArray(rows) && rows[0]?.slug ? String(rows[0].slug) : null;
      }
    } catch {
      /* optional */
    }

    const now = Math.floor(Date.now() / 1000);
    const fullName = entitled.reg.full_name || user.user_metadata?.full_name || user.email;
    const token = signJwt(
      {
        iss: 'apex-landing',
        aud: 'apex-system',
        sub: user.id,
        email: String(user.email).toLowerCase(),
        name: fullName,
        plan: entitled.reg.plan,
        role: entitled.rule.role,
        cap: entitled.reg.paypal_capture_id,
        ord: entitled.reg.paypal_order_id,
        amt: Number(entitled.reg.amount_paid),
        paid: entitled.reg.created_at,
        sponsor,
        iat: now,
        exp: now + TOKEN_TTL_SECONDS,
        jti: randomUUID(),
      },
      sharedSecret
    );

    return reply(200, { url: `${systemUrl}/sso.php?token=${token}`, expiresIn: TOKEN_TTL_SECONDS });
  } catch (err) {
    console.error('system-sso error:', err instanceof Error ? err.message : err);
    return reply(500, { error: 'server_error' });
  }
};
