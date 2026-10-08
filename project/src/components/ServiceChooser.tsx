import { Building2, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';

interface ServiceChooserProps {
  open: boolean;
  onClose: () => void;
  onChooseMembership: () => void;
  onChooseLlc: () => void;
}

/** Registration entry point: membership OR LLC formation. */
export default function ServiceChooser({ open, onClose, onChooseMembership, onChooseLlc }: ServiceChooserProps) {
  const { lang } = useLanguage();
  const { chooser } = getLlcStrings(lang);

  if (!open) return null;

  const options = [
    {
      icon: Sparkles,
      title: chooser.membershipTitle,
      text: chooser.membershipText,
      cta: chooser.membershipCta,
      onClick: onChooseMembership,
    },
    {
      icon: Building2,
      title: chooser.llcTitle,
      text: chooser.llcText,
      cta: chooser.llcCta,
      onClick: onChooseLlc,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-[fadeInUp_0.3s_ease-out] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">{chooser.title}</h2>
          <p className="text-sm text-slate-400 mt-2">{chooser.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map(({ icon: Icon, title, text, cta, onClick }) => (
            <button
              key={title}
              onClick={onClick}
              className="text-left bg-slate-950/50 border border-slate-800 hover:border-sky-500/60 rounded-2xl p-6 transition-all hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-bold text-white mb-1">{title}</div>
              <p className="text-sm text-slate-400 mb-4">{text}</p>
              <span className="text-sm font-semibold text-sky-300">{cta} →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
