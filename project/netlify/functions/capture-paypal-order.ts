/**
 * Netlify serverless function: Capture a PayPal order
 *
 * Called from the frontend after the user approves the PayPal payment.
 * Captures the payment on PayPal's servers and returns the capture ID.
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
    const { orderId } = JSON.parse(event.body || '{}');

    if (!orderId || typeof orderId !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'A valid orderId is required.' }),
      };
    }

    const accessToken = await getAccessToken(clientId, clientSecret);

    const captureResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!captureResponse.ok) {
      const errorBody = await captureResponse.text();
      throw new Error(`PayPal capture failed: ${captureResponse.status} ${errorBody}`);
    }

    const captureData = await captureResponse.json();

    // Extract the capture ID from the response
    const captureId = captureData?.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    if (!captureId) {
      throw new Error('PayPal capture response did not include a capture ID.');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        captureId,
        status: captureData.status,
        orderId,
      }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to capture PayPal payment.';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: message }),
    };
  }
};
