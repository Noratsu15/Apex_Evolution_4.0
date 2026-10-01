import { Search, Rocket, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const icons = [Search, Rocket, TrendingUp];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{t.howItWorks.label}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0" />

          {t.howItWorks.steps.map((step, i) => {
            const Icon = icons[i] ?? Search;
            return (
              <div key={i} className="relative text-center">
                <div className="relative inline-flex w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 items-center justify-center mb-6 mx-auto shadow-xl">
                  <Icon className="w-10 h-10 text-sky-400" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center shadow-lg">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
