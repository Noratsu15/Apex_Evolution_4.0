import { supabase } from '@/lib/supabase';
import type { MotherLineMember, MotherLineRole, Referral } from '@/types';

const REF_STORAGE_KEY = 'apex-referral-code';
const REF_PATTERN = /^[a-z0-9-]{2,60}$/;

function normalize(code: string | null): string | null {
  const value = code?.trim().toLowerCase() ?? '';
  return REF_PATTERN.test(value) ? value : null;
}

/** Reads `?ref=` from the URL, stores it, and removes it from the address bar. */
export function captureReferralFromUrl(): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const code = normalize(url.searchParams.get('ref'));
  if (!url.searchParams.has('ref')) return;
  try {
    if (code) localStorage.setItem(REF_STORAGE_KEY, code);
  } catch {
    /* storage unavailable */
  }
  url.searchParams.delete('ref');
  window.history.replaceState({}, '', url.pathname + url.search + url.hash);
}

export function getStoredReferralCode(): string | null {
  try {
    return normalize(localStorage.getItem(REF_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function clearStoredReferralCode(): void {
  try {
    localStorage.removeItem(REF_STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function buildReferralLink(slug: string): string {
  return `${window.location.origin}/?ref=${slug}`;
}

/** Attributes the signed-in user to the stored leader. Returns true if a referral was created. */
export async function claimStoredReferral(): Promise<boolean> {
  const code = getStoredReferralCode();
  if (!code) return false;
  const { data, error } = await supabase.rpc('capture_referral', { p_code: code });
  if (error) return false; // keep the code, retry on next session
  clearStoredReferralCode();
  return data === true;
}

export async function fetchReferrerPreview(
  code: string
): Promise<{ full_name: string; role: MotherLineRole } | null> {
  const { data, error } = await supabase.rpc('get_referrer_preview', { p_code: code });
  if (error || !Array.isArray(data) || data.length === 0) return null;
  return data[0] as { full_name: string; role: MotherLineRole };
}

export async function fetchMyMotherLineMembers(): Promise<MotherLineMember[]> {
  const { data, error } = await supabase.rpc('my_mother_line_members');
  if (error) throw new Error(error.message);
  return (data ?? []) as MotherLineMember[];
}

export async function fetchMyReferrals(): Promise<Referral[]> {
  const { data, error } = await supabase.rpc('my_referrals');
  if (error) throw new Error(error.message);
  return ((data ?? []) as Referral[]).map((r) => ({ ...r, amount_paid: Number(r.amount_paid) }));
}
