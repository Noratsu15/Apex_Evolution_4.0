import { useCallback, useEffect, useState } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';
import { fetchMyLlcOrders } from '@/lib/llc';
import LLCOrderPanel from '@/components/LLCOrderPanel';
import type { LlcOrder } from '@/types';

interface MyLLCProps {
  onBuyLlc: () => void;
  onOrdersLoaded?: (count: number) => void;
}

export default function MyLLC({ onBuyLlc, onOrdersLoaded }: MyLLCProps) {
  const { lang } = useLanguage();
  const p = getLlcStrings(lang).portal;
  const [orders, setOrders] = useState<LlcOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchMyLlcOrders();
      setOrders(data);
      setError(false);
      onOrdersLoaded?.(data.length);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [onOrdersLoaded]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section aria-labelledby="my-llc-title">
      <div className="mb-8">
        <h2 id="my-llc-title" className="text-2xl font-bold text-white mb-1">
          {p.title}
        </h2>
        <p className="text-slate-400">{p.subtitle}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-slate-300 mb-4">{p.loadError}</p>
          <button
            onClick={() => void load()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400"
          >
            {p.retry}
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl text-center py-16 px-4">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-slate-800/50 items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-white font-semibold">{p.emptyTitle}</p>
          <p className="text-slate-400 text-sm mt-1 mb-6">{p.emptyText}</p>
          <button
            onClick={onBuyLlc}
            className="px-6 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 transition-all"
          >
            {p.emptyCta}
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {orders.map((order) => (
            <LLCOrderPanel key={order.id} order={order} onChanged={() => void load()} />
          ))}
        </div>
      )}
    </section>
  );
}
