import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  Link2,
  Loader2,
  Search,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPlan } from '@/data/plans';
import { buildReferralLink, fetchMyReferrals } from '@/lib/referrals';
import type { MotherLineMember, MotherLineRole, Referral } from '@/types';

interface ReferralsProps {
  members: MotherLineMember[];
}

type StatusFilter = 'all' | 'completed' | 'notCompleted';

const ROLE_STYLES: Record<MotherLineRole, string> = {
  founder_mentor: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  mentor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  leader: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
};

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Referrals({ members }: ReferralsProps) {
  const { t } = useLanguage();
  const r = t.referrals;
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [leaderFilter, setLeaderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setReferrals(await fetchMyReferrals());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const roleLabel = (role: MotherLineRole) =>
    role === 'founder_mentor' ? r.roleFounder : role === 'mentor' ? r.roleMentor : r.roleLeader;

  const memberById = useMemo(() => new Map(members.map((m) => [m.id, m])), [members]);
  const showAll = members.length > 1;

  const statsByLeader = useMemo(() => {
    const map = new Map<string, { total: number; activated: number }>();
    for (const m of members) map.set(m.id, { total: 0, activated: 0 });
    for (const ref of referrals) {
      const s = map.get(ref.leader_id);
      if (!s) continue;
      s.total += 1;
      if (ref.payment_status === 'completed') s.activated += 1;
    }
    return map;
  }, [members, referrals]);

  const scoped = useMemo(
    () => (leaderFilter === 'all' ? referrals : referrals.filter((x) => x.leader_id === leaderFilter)),
    [referrals, leaderFilter]
  );

  const totals = useMemo(() => {
    const activated = scoped.filter((x) => x.payment_status === 'completed');
    return {
      total: scoped.length,
      activated: activated.length,
      notActivated: scoped.length - activated.length,
      revenue: activated.reduce((sum, x) => sum + x.amount_paid, 0),
    };
  }, [scoped]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scoped.filter((x) => {
      if (statusFilter === 'completed' && x.payment_status !== 'completed') return false;
      if (statusFilter === 'notCompleted' && x.payment_status === 'completed') return false;
      if (!q) return true;
      return x.full_name.toLowerCase().includes(q) || x.email.toLowerCase().includes(q);
    });
  }, [scoped, search, statusFilter]);

  const copy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(buildReferralLink(slug));
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug((c) => (c === slug ? null : c)), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const statusLabel = (s: Referral['payment_status']) => {
    if (s === 'completed') return t.dashboard.completed;
    if (s === 'pending') return t.dashboard.pending;
    if (s === 'failed') return t.dashboard.failed;
    return r.statusNone;
  };

  const statusClass = (s: Referral['payment_status']) =>
    s === 'completed'
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : s === 'pending'
      ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      : s === 'failed'
      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      : 'bg-slate-700/30 text-slate-300 border-slate-600/40';

  const stats = [
    { label: r.totalReferrals, value: String(totals.total), icon: Users, color: 'amber' },
    { label: r.activated, value: String(totals.activated), icon: CheckCircle2, color: 'emerald' },
    { label: r.notActivated, value: String(totals.notActivated), icon: Clock, color: 'orange' },
    { label: r.revenue, value: `$${totals.revenue.toFixed(2)}`, icon: DollarSign, color: 'yellow' },
  ] as const;

  const colorMap: Record<string, { bg: string; text: string }> = {
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  };

  return (
    <section aria-labelledby="referrals-title">
      <div className="mb-8">
        <h2 id="referrals-title" className="text-2xl font-bold text-white mb-1">
          {r.title}
        </h2>
        <p className="text-slate-400">{showAll ? r.subtitleAll : r.subtitleOwn}</p>
      </div>

      {/* Mother line cards / own link */}
      <div className="mb-8">
        {showAll && (
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            {r.motherLine}
          </h3>
        )}
        <div className={`grid gap-4 ${showAll ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {members.map((m) => {
            const s = statsByLeader.get(m.id) ?? { total: 0, activated: 0 };
            const selected = leaderFilter === m.id;
            return (
              <div
                key={m.id}
                className={`bg-slate-900 border rounded-2xl p-5 transition-colors ${
                  selected ? 'border-amber-500/60' : 'border-slate-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() => showAll && setLeaderFilter(selected ? 'all' : m.id)}
                  className={`flex w-full items-center gap-3 text-left ${showAll ? 'cursor-pointer' : 'cursor-default'}`}
                  aria-pressed={showAll ? selected : undefined}
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 text-sm font-bold">
                    {initialsOf(m.full_name)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{m.full_name}</div>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${ROLE_STYLES[m.role]}`}
                    >
                      {roleLabel(m.role)}
                    </span>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xl font-bold text-white leading-none">{s.total}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {s.activated} {r.activated.toLowerCase()}
                    </div>
                  </div>
                </button>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800">
                    <Link2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-xs text-slate-400 truncate">/?ref={m.slug}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(m.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all"
                  >
                    {copiedSlug === m.slug ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSlug === m.slug ? r.copied : r.copyLink}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl ${colorMap[color].bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${colorMap[color].text}`} />
              </div>
              <span className="text-sm text-slate-400">{label}</span>
            </div>
            <span className="text-2xl font-bold text-white">{value}</span>
          </div>
        ))}
      </div>

      {/* Referral list */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={r.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>
          {showAll && (
            <select
              value={leaderFilter}
              onChange={(e) => setLeaderFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
            >
              <option value="all">{r.allLeaders}</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.full_name}
                </option>
              ))}
            </select>
          )}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60"
          >
            <option value="all">{r.allStatuses}</option>
            <option value="completed">{r.activated}</option>
            <option value="notCompleted">{r.notActivated}</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16 px-4">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            <p className="text-slate-300 mb-4">{r.loadError}</p>
            <button
              type="button"
              onClick={() => void load()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all"
            >
              {r.retry}
            </button>
          </div>
        ) : referrals.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-slate-800/50 items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-300 font-medium">{r.noReferrals}</p>
            <p className="text-slate-500 text-sm mt-1">{r.noReferralsHint}</p>
          </div>
        ) : visible.length === 0 ? (
          <p className="text-center text-slate-400 py-16 px-4">{r.noResults}</p>
        ) : (
          <div className="divide-y divide-slate-800">
            {visible.map((ref) => {
              const leader = memberById.get(ref.leader_id);
              const plan = ref.plan ? getLocalizedPlan(ref.plan, t) : undefined;
              return (
                <div
                  key={ref.referral_id}
                  className="p-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 flex items-center justify-center text-amber-300 text-sm font-bold">
                      {initialsOf(ref.full_name || ref.email)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white truncate">{ref.full_name || ref.email}</div>
                      <div className="text-xs text-slate-500 truncate">{ref.email}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {r.colDate}{' '}
                        {new Date(ref.referred_at).toLocaleDateString(t.dashboard.locale, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                        {showAll && leader && (
                          <>
                            {' · '}
                            {r.colLeader}: <span className="text-slate-300">{leader.full_name}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:justify-end">
                    {ref.plan && (
                      <span className="text-xs text-slate-400 hidden md:inline">
                        {ref.product === 'llc' ? 'LLC' : ref.product === 'both' ? `${plan?.name ?? ref.plan} + LLC` : plan?.name ?? ref.plan}
                      </span>
                    )}
                    {ref.payment_status === 'completed' && (
                      <span className="text-sm font-bold text-white">${ref.amount_paid.toFixed(2)}</span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${statusClass(ref.payment_status)}`}
                    >
                      {ref.payment_status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                      {statusLabel(ref.payment_status)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
