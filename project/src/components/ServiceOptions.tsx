import { Building2, Landmark, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';

interface ServiceOptionsProps {
  onMembership: () => void;
  onLlc: () => void;
  onBank: () => void;
  showMembership?: boolean;
}

/** The three paid paths: membership, LLC formation, international bank account. */
export default function ServiceOptions({ onMembership, onLlc, onBank, showMembership = true }: ServiceOptionsProps) {
  const { lang } = useLanguage();
  const { chooser } = getLlcStrings(lang);

  const options = [
    ...(showMembership
      ? [{ icon: Sparkles, title: chooser.membershipTitle, text: chooser.membershipText, cta: chooser.membershipCta, onClick: onMembership }]
      : []),
    { icon: Building2, title: chooser.llcTitle, text: chooser.llcText, cta: chooser.llcCta, onClick: onLlc },
    { icon: Landmark, title: chooser.bankTitle, text: chooser.bankText, cta: chooser.bankCta, onClick: onBank },
  ];

  return (
    <div className={`grid grid-cols-1 gap-4 ${options.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {options.map(({ icon: Icon, title, text, cta, onClick }) => (
        <button
          key={title}
          onClick={onClick}
          className="text-left bg-slate-950/50 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center mb-3">
            <Icon className="w-5 h-5 text-slate-950" />
          </div>
          <div className="font-bold text-white mb-1">{title}</div>
          <p className="text-sm text-slate-400 mb-3">{text}</p>
          <span className="text-sm font-semibold text-amber-300">{cta} →</span>
        </button>
      ))}
    </div>
  );
}
