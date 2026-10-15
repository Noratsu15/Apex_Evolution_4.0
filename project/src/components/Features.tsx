import { Zap, Shield, BarChart3, Globe, GitBranch, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const icons = [Zap, Shield, BarChart3, Globe, GitBranch, Clock];
const colors = [
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-green-500',
  'from-amber-400 to-blue-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
  'from-yellow-400 to-teal-500',
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="relative py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">{t.features.label}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.features.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, i) => {
            const Icon = icons[i] ?? Zap;
            return (
              <div
                key={i}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i] ?? colors[0]} items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
