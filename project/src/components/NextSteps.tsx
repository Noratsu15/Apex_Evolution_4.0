import { useLanguage } from '@/context/LanguageContext';
import { getOnboardingStrings } from '@/i18n/onboarding';
import { getWhatsappGroupUrl } from '@/lib/onboarding';
import ServiceOptions from '@/components/ServiceOptions';
import WhatsAppJoinCard from '@/components/WhatsAppJoinCard';

interface NextStepsProps {
  showWhatsapp: boolean;
  hasMembership: boolean;
  onJoined: () => void;
  onBuyMembership: () => void;
  onBuyLlc: () => void;
}

/** Always-visible guidance in the portal: join the group, activate a membership, or form an LLC. */
export default function NextSteps({ showWhatsapp, hasMembership, onJoined, onBuyMembership, onBuyLlc }: NextStepsProps) {
  const { lang } = useLanguage();
  const n = getOnboardingStrings(lang).next;
  const whatsappVisible = showWhatsapp && getWhatsappGroupUrl() !== null;

  return (
    <section aria-labelledby="next-steps-title" className="mb-10 space-y-4">
      <div>
        <h2 id="next-steps-title" className="text-lg font-bold text-white">
          {n.title}
        </h2>
        {!hasMembership && <p className="text-sm text-slate-400">{n.subtitle}</p>}
      </div>
      {whatsappVisible && <WhatsAppJoinCard joined={false} onJoined={onJoined} />}
      <ServiceOptions onMembership={onBuyMembership} onLlc={onBuyLlc} showMembership={!hasMembership} />
    </section>
  );
}
