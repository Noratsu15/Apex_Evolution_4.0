import { supabase } from '@/lib/supabase';

/** Asks the server for a one-time URL that signs the member into the PHP system. Throws the error code. */
export async function requestSystemUrl(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('unauthorized');

  const response = await fetch('/.netlify/functions/system-sso', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || typeof body.url !== 'string') throw new Error(body.error ?? 'generic');
  return body.url;
}
