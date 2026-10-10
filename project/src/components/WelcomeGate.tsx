import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getOnboardingStrings } from '@/i18n/onboarding';
import { fetchMyMotherLineMembers } from '@/lib/referrals';
import { fetchOnboarding, markWelcomeSeen } from '@/lib/onboarding';
import ServiceOptions from '@/components/ServiceOptions';
import WhatsAppJoinCard from '@/components/WhatsAppJoinCard';

interface WelcomeGateProps {
  onBuyMembership: () => void;
  onBuyLlc: () => void;
}

/**
 * Shown once to every new user who is not part of the mother line:
 * WhatsApp group link + the two paid options (membership / LLC).
 */
export default function WelcomeGate({ onBuyMembership, onBuyLlc }: WelcomeGateProps) {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const o = getOnboardingStrings(lang);
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setOpen(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [members, row] = await Promise.all([
          fetchMyMotherLineMembers().catch(() => []),
          fetchOnboarding(userId),
        ]);
        if (cancelled) return;
        if (members.length > 0) return; // mother line members are not onboarded
        setJoined(Boolean(row?.whatsapp_joined_at));
        if (!row?.welcome_seen_at) setOpen(true);
      } catch {
        /* if onboarding cannot be read, do not block the user */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const finish = useCallback(
    (after?: () => void) => {
      setOpen(false);
      if (userId) void markWelcomeSeen(userId).catch(() => undefined);
      after?.();
    },
    [userId]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, finish]);

  if (!open || !user) return null;

  const firstName = String(user.user_metadata?.full_name ?? '').split(' ')[0];

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-[fadeInUp_0.3s_ease-out] max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => finish()}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-7">
          <div className="text-center">
            <h2 id="welcome-title" className="text-2xl sm:text-3xl font-bold text-white">
              {firstName ? `${o.welcome.title.replace('!', '')}, ${firstName}!` : o.welcome.title}
            </h2>
            <p className="text-sm text-slate-400 mt-2">{o.welcome.subtitle}</p>
          </div>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">{o.welcome.stepWhatsapp}</h3>
            <WhatsAppJoinCard joined={joined} onJoined={() => setJoined(true)} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">{o.welcome.stepNext}</h3>
            <ServiceOptions
              onMembership={() => finish(onBuyMembership)}
              onLlc={() => finish(onBuyLlc)}
            />
          </section>

          <button
            onClick={() => finish()}
            className="mx-auto block text-sm text-slate-400 hover:text-white transition-colors"
          >
            {o.welcome.later}
          </button>
        </div>
      </div>
    </div>
  );
}
