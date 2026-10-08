import { useState } from 'react';
import { Building2, Check, Clock, FileText, Landmark, ShieldCheck, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';
import { LLC_PRICE_USD, LLC_TIMELINE, LLC_TOTAL_DAYS } from '@/data/llc';
import LLCLetter from '@/components/LLCLetter';

interface LLCSectionProps {
  onGetLlc: () => void;
}

const MODULE_ICONS = [Building2, Landmark, ShieldCheck];
const STAGE_KEYS = ['formation', 'ein', 'bank'] as const;

export default function LLCSection({ onGetLlc }: LLCSectionProps) {
  const { lang } = useLanguage();
  const s = getLlcStrings(lang);
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section id="llc" className="relative py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{s.section.label}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {s.section.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{s.section.subtitle}</p>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl mx-auto">{s.section.separateNote}</p>
        </div>

        {/* Three modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {s.modules.map((mod, i) => {
            const Icon = MODULE_ICONS[i];
            return (
              <div key={mod.tag} className="bg-slate-900 border border-slate-800 rounded-3xl p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">{mod.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-sm text-slate-400 mb-5">{mod.intro}</p>
                <ul className="space-y-3 mt-auto">
                  {mod.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-sky-400/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-sky-400" />
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-slate-100">{item.title}. </span>
                        <span className="text-slate-400">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 sm:p-10 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">{s.timeline.title}</h3>
            <p className="text-slate-400 mt-1">{s.timeline.subtitle}</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.timeline.steps.map((step, i) => {
              const range = LLC_TIMELINE[STAGE_KEYS[i]];
              return (
                <li key={step.title} className="relative bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center mb-4">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-white mb-2">{step.title}</h4>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 mb-3">
                    <Clock className="w-4 h-4" />
                    {range.min}–{range.max} {s.timeline.businessDays}
                  </div>
                  <p className="text-sm text-slate-400">{step.includes}</p>
                </li>
              );
            })}
          </ol>
          <p className="text-center text-sm text-slate-300 mt-8">
            {s.timeline.total}:{' '}
            <span className="font-bold text-white">
              {LLC_TOTAL_DAYS.min}–{LLC_TOTAL_DAYS.max} {s.timeline.businessDays}
            </span>
          </p>
          <p className="text-center text-xs text-slate-500 mt-2">{s.timeline.disclaimer}</p>
        </div>

        {/* Price + CTA + letter */}
        <div className="max-w-xl mx-auto bg-gradient-to-b from-sky-500/10 to-slate-900 border-2 border-sky-400/40 rounded-3xl p-8 shadow-2xl shadow-sky-500/10 text-center">
          <h3 className="text-xl font-bold text-white mb-4">{s.section.price}</h3>
          {LLC_PRICE_USD > 0 ? (
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">${LLC_PRICE_USD}</span>
              <span className="text-slate-400 ml-2">{s.section.priceOneTime}</span>
            </div>
          ) : (
            <p className="mb-6 text-slate-400">{s.section.priceMissing}</p>
          )}
          <button
            onClick={onGetLlc}
            className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 hover:from-sky-300 hover:to-cyan-300 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02]"
          >
            {s.section.cta}
          </button>
          <button
            onClick={() => setLetterOpen((v) => !v)}
            aria-expanded={letterOpen}
            className="mt-4 inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200 transition-colors"
          >
            <FileText className="w-4 h-4" />
            {s.section.readLetter}
            <ChevronDown className={`w-4 h-4 transition-transform ${letterOpen ? 'rotate-180' : ''}`} />
          </button>
          {letterOpen && (
            <div className="mt-6 text-left bg-slate-950/60 border border-slate-800 rounded-2xl p-6 max-h-[28rem] overflow-y-auto">
              <LLCLetter />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
