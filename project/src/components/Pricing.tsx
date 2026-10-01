import { Check, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPlans } from '@/data/plans';
import type { Plan } from '@/types';

interface PricingProps {
  onSelectPlan: (plan: Plan) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const { t } = useLanguage();
  const localizedPlans = getLocalizedPlans(t);

  return (
    <section id="pricing" className="relative py-24 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{t.pricing.label}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {localizedPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-sky-500/10 to-slate-900 border-2 border-sky-400/50 shadow-2xl shadow-sky-500/20'
                  : 'bg-slate-950/50 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 text-sm font-bold shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {t.pricing.mostPopular}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-slate-400 ml-2">{t.pricing.perMonth}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlight ? 'bg-sky-400/20' : 'bg-slate-800'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? 'text-sky-400' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 hover:from-sky-300 hover:to-cyan-300 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02]'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {t.pricing.getStarted}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
