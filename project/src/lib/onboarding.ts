import { supabase } from '@/lib/supabase';

export interface OnboardingRow {
  welcome_seen_at: string | null;
  whatsapp_joined_at: string | null;
}

/** Group invite link, set in Netlify as VITE_WHATSAPP_GROUP_URL. Only WhatsApp invite links are accepted. */
export function getWhatsappGroupUrl(): string | null {
  const url = String(import.meta.env.VITE_WHATSAPP_GROUP_URL ?? '').trim();
  return /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+/.test(url) ? url : null;
}

export async function fetchOnboarding(userId: string): Promise<OnboardingRow | null> {
  const { data, error } = await supabase
    .from('member_onboarding')
    .select('welcome_seen_at, whatsapp_joined_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as OnboardingRow | null) ?? null;
}

export async function markWelcomeSeen(userId: string): Promise<void> {
  const { error } = await supabase
    .from('member_onboarding')
    .upsert({ user_id: userId, welcome_seen_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw new Error(error.message);
}

export async function markWhatsappJoined(userId: string): Promise<void> {
  const { error } = await supabase
    .from('member_onboarding')
    .upsert({ user_id: userId, whatsapp_joined_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw new Error(error.message);
}
