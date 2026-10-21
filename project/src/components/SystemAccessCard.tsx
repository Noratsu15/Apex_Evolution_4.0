import { useState } from 'react';
import { AlertCircle, ArrowRight, Loader2, Lock, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getSystemStrings } from '@/i18n/system';
import { requestSystemUrl } from '@/lib/system';

interface SystemAccessCardProps {
  hasMembership: boolean;
  onBuyMembership: () => void;
}

/** One-click entry to the PHP system for paying members; a clear upgrade path for everyone else. */
export default function SystemAccessCard({ hasMembership, onBuyMembership }: SystemAccessCardProps) {
  const { lang } = useLanguage();
  const s = getSystemStrings(lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enter = async () => {
    setLoading(true);
    setError(null);
    try {
      window.location.assign(await requestSystemUrl());
    } catch (err) {
      const code = err instanceof Error ? err.message : 'generic';
      setError(s.errors[code] ?? s.errors.generic);
      setLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="system-access-title"
      className={`mb-10 rounded-2xl border p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
        hasMembership
          ? 'bg-gradient-to-r from-amber-500/10 to-yellow-400/5 border-amber-500/40'
          : 'bg-slate-900 border-slate-800'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${
            hasMembership ? 'bg-gradient-to-br from-amber-500 to-yellow-400' : 'bg-slate-800'
          }`}
        >
          {hasMembership ? <Rocket className="w-6 h-6 text-slate-950" /> : <Lock className="w-6 h-6 text-slate-400" />}
        </div>
        <div>
          <h2 id="system-access-title" className="text-lg font-bold text-white">
            {s.title}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">{hasMembership ? s.text : s.locked}</p>
          {error && (
            <p role="alert" className="mt-3 flex items-start gap-2 text-sm text-orange-300">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </p>
          )}
        </div>
      </div>

      {hasMembership ? (
        <button
          onClick={() => void enter()}
          disabled={loading}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {loading ? s.entering : s.enter}
        </button>
      ) : (
        <button
          onClick={onBuyMembership}
          className="shrink-0 px-6 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all"
        >
          {s.activate}
        </button>
      )}
    </section>
  );
}
