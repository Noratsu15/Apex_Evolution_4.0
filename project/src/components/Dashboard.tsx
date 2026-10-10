import { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Clock, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { getLocalizedPlan } from '@/data/plans';
import { fetchMyMotherLineMembers } from '@/lib/referrals';
import Referrals from '@/components/Referrals';
import MyLLC from '@/components/MyLLC';
import NextSteps from '@/components/NextSteps';
import { fetchOnboarding } from '@/lib/onboarding';
import { getLlcStrings } from '@/i18n/llc';
import type { DashboardTab, MotherLineMember, Registration } from '@/types';

interface DashboardProps {
  onBackHome: () => void;
  onBuyLlc: () => void;
  onBuyMembership: () => void;
  initialTab?: DashboardTab;
}

export default function Dashboard({ onBackHome, onBuyLlc, onBuyMembership, initialTab = 'activations' }: DashboardProps) {
  const { user, signOut } = useAuth();
  const { t, lang } = useLanguage();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<MotherLineMember[]>([]);
  const [tab, setTab] = useState<DashboardTab>(initialTab);
  const [membersLoaded, setMembersLoaded] = useState(false);
  const [whatsappJoined, setWhatsappJoined] = useState<boolean | null>(null);

  // Mother-line members (founder, mentors, leaders) get the Referrals tab.
  useEffect(() => {
    if (!user) return;
    fetchMyMotherLineMembers()
      .then(setMembers)
      .catch(() => setMembers([]))
      .finally(() => setMembersLoaded(true));
    fetchOnboarding(user.id)
      .then((row) => setWhatsappJoined(Boolean(row?.whatsapp_joined_at)))
      .catch(() => setWhatsappJoined(null));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('registrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setRegistrations(data as Registration[]);
        }
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;

  const fullName = user.user_metadata?.full_name ?? 'User';
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const llcLabel = getLlcStrings(lang).portal.tab;
  const tabList: { key: DashboardTab; label: string }[] = [
    { key: 'activations', label: t.referrals.tabActivations },
    { key: 'llc', label: llcLabel },
    ...(members.length > 0 ? [{ key: 'referrals' as const, label: t.referrals.tabReferrals }] : []),
  ];

  const statusLabel = (status: string) => {
    if (status === 'completed') return t.dashboard.completed;
    if (status === 'pending') return t.dashboard.pending;
    return t.dashboard.failed;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackHome}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.dashboard.backToSite}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 text-sm font-bold">
                {initials}
              </div>
              <button
                onClick={signOut}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
              >
                {t.dashboard.signOut}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t.dashboard.welcome}, {fullName.split(' ')[0]}!
          </h1>
          <p className="text-slate-400">{t.dashboard.manageSubs}</p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-slate-800 overflow-hidden" role="tablist">
          {tabList.map((item) => (
            <button
              key={item.key}
              role="tab"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition-colors ${
                tab === item.key
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'referrals' && members.length > 0 ? (
          <Referrals members={members} />
        ) : tab === 'llc' ? (
          <MyLLC onBuyLlc={onBuyLlc} />
        ) : (
        <>
        <NextSteps
          showWhatsapp={membersLoaded && members.length === 0 && whatsappJoined === false}
          hasMembership={registrations.some((r) => r.payment_status === 'completed')}
          onJoined={() => setWhatsappJoined(true)}
          onBuyMembership={onBuyMembership}
          onBuyLlc={onBuyLlc}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-sm text-slate-400">{t.dashboard.activePlans}</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {registrations.filter((r) => r.payment_status === 'completed').length}
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-sm text-slate-400">{t.dashboard.completedPayments}</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {registrations.filter((r) => r.payment_status === 'completed').length}
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-sm text-slate-400">{t.dashboard.totalSpent}</span>
            </div>
            <span className="text-2xl font-bold text-white">
              ${registrations.reduce((sum, r) => sum + Number(r.amount_paid), 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Registrations list */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">{t.dashboard.yourRegistrations}</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-400 mb-4">{t.dashboard.noRegistrations}</p>
              <button
                onClick={onBackHome}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all"
              >
                {t.dashboard.browsePlans}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {registrations.map((reg) => {
                const plan = getLocalizedPlan(reg.plan, t);
                return (
                  <div key={reg.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {plan?.name ?? reg.plan} {t.dashboard.planSuffix}
                        </div>
                        <div className="text-xs text-slate-500">
                          {t.dashboard.registeredOn} {new Date(reg.created_at).toLocaleDateString(t.dashboard.locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-white">${Number(reg.amount_paid).toFixed(2)}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          reg.payment_status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : reg.payment_status === 'pending'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {reg.payment_status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {statusLabel(reg.payment_status)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
