import { useEffect, useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchReferrerPreview, getStoredReferralCode } from '@/lib/referrals';
import type { MotherLineRole } from '@/types';

export default function ReferralBanner() {
  const { t } = useLanguage();
  const [referrer, setReferrer] = useState<{ full_name: string; role: MotherLineRole } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const code = getStoredReferralCode();
    if (!code) return;
    let cancelled = false;
    fetchReferrerPreview(code).then((data) => {
      if (!cancelled) setReferrer(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!referrer || dismissed) return null;

  const roleLabel =
    referrer.role === 'founder_mentor'
      ? t.referrals.roleFounder
      : referrer.role === 'mentor'
      ? t.referrals.roleMentor
      : t.referrals.roleLeader;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-40 flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-slate-900/95 backdrop-blur px-4 py-3 shadow-xl">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-sky-500/10 flex items-center justify-center">
        <UserPlus className="w-5 h-5 text-sky-400" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-slate-400">{t.referrals.invitedBy}</div>
        <div className="text-sm font-bold text-white truncate">{referrer.full_name}</div>
        <div className="text-xs text-sky-300">{roleLabel}</div>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t.referrals.dismiss}
        className="text-slate-500 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
