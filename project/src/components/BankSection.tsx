import { useState } from 'react';
import { Check, ChevronDown, Clock, FileText, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';
import { BANK_PRICE_USD } from '@/data/llc';
import LLCLetter from '@/components/LLCLetter';

interface BankSectionProps {
  onGetBank: () => void;
}

export default function BankSection({ onGetBank }: BankSectionProps) {
  const { lang } = useLanguage();
  const s = getLlcStrings(lang);
  const [letterOpen, setLetterOpen] = useState(false);
  const requirements = s.modules[1].items;

  return (
    <section id="bank" className="relative py-24 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">{s.bank.label}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{s.bank.title}</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{s.bank.subtitle}</p>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl mx-auto">{s.bank.note}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{s.bank.requirementsTitle}</h3>
            </div>
            <p className="text-sm text-slate-400 mb-5">{s.modules[1].intro}</p>
            <ul className="space-y-3">
              {requirements.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-slate-100">{item.title}. </span>
                    <span className="text-slate-400">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-b from-amber-500/10 to-slate-900 border-2 border-amber-400/40 rounded-3xl p-8 shadow-2xl shadow-amber-500/10 text-center">
            <h3 className="text-xl font-bold text-white mb-4">{s.bank.price}</h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-white">${BANK_PRICE_USD}</span>
              <span className="text-slate-400 ml-2">{s.bank.priceOneTime}</span>
            </div>
            <p className="text-sm text-slate-300 mb-1">{s.bank.prerequisite}</p>
            <p className="inline-flex items-center gap-1.5 text-sm text-amber-300 mb-6">
              <Clock className="w-4 h-4" />
              {s.bank.timeline}
            </p>
            <button
              onClick={onGetBank}
              className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02]"
            >
              {s.bank.cta}
            </button>
            <button
              onClick={() => setLetterOpen((v) => !v)}
              aria-expanded={letterOpen}
              className="mt-4 inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {s.bank.readLetter}
              <ChevronDown className={`w-4 h-4 transition-transform ${letterOpen ? 'rotate-180' : ''}`} />
            </button>
            {letterOpen && (
              <div className="mt-6 text-left bg-slate-950/60 border border-slate-800 rounded-2xl p-6 max-h-[28rem] overflow-y-auto">
                <LLCLetter service="bank" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
