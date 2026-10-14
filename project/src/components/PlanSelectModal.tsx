import { Check, Star, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPlans } from '@/data/plans';
import type { Plan } from '@/types';

interface PlanSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (plan: Plan) => void;
}

/** Lets a signed-in user pick a membership without leaving the portal. */
export default function PlanSelectModal({ open, onClose, onSelect }: PlanSelectModalProps) {
  const { t } = useLanguage();
  if (!open) return null;
  const plans = getLocalizedPlans(t);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="plan-select-title">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-[fadeInUp_0.3s_ease-out] max-h-[92vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-8">
          <h2 id="plan-select-title" className="text-2xl sm:text-3xl font-bold text-white">
            {t.pricing.title}
          </h2>
          <p className="text-sm text-slate-400 mt-2">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-b from-amber-500/10 to-slate-900 border-2 border-amber-400/50'
                  : 'bg-slate-950/50 border border-slate-800'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    {t.pricing.mostPopular}
                  </div>
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{plan.tagline}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">${plan.price}</span>
                <span className="text-slate-400 ml-2 text-sm">{t.pricing.perMonth}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelect(plan)}
                className={`mt-auto w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {t.pricing.getStarted}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
