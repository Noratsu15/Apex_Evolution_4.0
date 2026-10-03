/**
 * Netlify serverless function: Create a PayPal order
 *
 * Called from the frontend when the user clicks the PayPal button.
 * Creates an order on PayPal's servers and returns the order ID.
 *
 * Required environment variables:
 *   PAYPAL_CLIENT_ID     — PayPal REST API client ID
 *   PAYPAL_CLIENT_SECRET — PayPal REST API client secret
 *   PAYPAL_API_BASE     — PayPal API base URL (sandbox or live)
 */

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal auth failed: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.access_token;
}

exports.handler = async (event: { httpMethod: string; body: string }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'PayPal credentials are not configured on the server.' }),
    };
  }

  try {
    const { amount, planId, planName } = JSON.parse(event.body || '{}');

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'A valid amount is required.' }),
      };
    }

    const accessToken = await getAccessToken(clientId, clientSecret);

    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            description: `Nexus ${planName || planId || 'Subscription'}`,
            amount: {
              currency_code: 'USD',
              value: amount.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: 'Nexus',
          user_action: 'PAY_NOW',
          shipping_preference: 'NO_SHIPPING',
        },
      }),
    });

    if (!orderResponse.ok) {
      const errorBody = await orderResponse.text();
      throw new Error(`PayPal order creation failed: ${orderResponse.status} ${errorBody}`);
    }

    const order = await orderResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ orderId: order.id }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create PayPal order.';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: message }),
    };
  }
};
