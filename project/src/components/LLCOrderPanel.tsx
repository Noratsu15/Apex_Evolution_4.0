import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Loader2,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';
import { LLC_STATES, LLC_TIMELINE } from '@/data/llc';
import {
  deleteDocument,
  fetchDocuments,
  fetchPartners,
  openDocument,
  saveBusinessProfile,
  submitIntake,
  uploadDocument,
  validateFile,
} from '@/lib/llc';
import LLCLetter from '@/components/LLCLetter';
import type { LlcDocType, LlcDocument, LlcOrder, LlcPartner, LlcStageStatus, LlcState } from '@/types';

const inputClass =
  'w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm';
const primaryBtn =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed';

const STAGE_KEYS = ['formation', 'ein', 'bank'] as const;
type StageKey = (typeof STAGE_KEYS)[number];

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function StageBadge({ status, label }: { status: LlcStageStatus; label: string }) {
  const cls =
    status === 'completed'
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : status === 'in_progress'
      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
      : 'bg-slate-700/30 text-slate-300 border-slate-600/40';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${cls}`}>
      {status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'in_progress' && <Loader2 className="w-3 h-3 animate-spin" />}
      {label}
    </span>
  );
}

/* ----------------------------- Intake (Module 1) ----------------------------- */

interface IntakeProps {
  order: LlcOrder;
  partners: LlcPartner[];
  onSaved: () => void;
}

function IntakeForm({ order, partners, onSaved }: IntakeProps) {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const s = getLlcStrings(lang).portal.intake;
  const submitted = order.intake_submitted_at !== null;
  const locked = order.formation_status !== 'pending';
  const [editing, setEditing] = useState(!submitted);
  const [state, setState] = useState<LlcState>(order.state ?? 'wyoming');
  const [email, setEmail] = useState(order.contact_email ?? user?.email ?? '');
  const [phone, setPhone] = useState(order.contact_phone ?? '');
  const [names, setNames] = useState<string[]>(() => {
    const n = [...(order.name_options ?? [])];
    while (n.length < 3) n.push('');
    return n.slice(0, 3);
  });
  const [rows, setRows] = useState<{ full_name: string; ownership_pct: string }[]>(() =>
    partners.length > 0
      ? partners.map((p) => ({ full_name: p.full_name, ownership_pct: String(p.ownership_pct) }))
      : [{ full_name: user?.user_metadata?.full_name ?? '', ownership_pct: '100' }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = rows.reduce((sum, r) => sum + (Number(r.ownership_pct) || 0), 0);
  const totalOk = Math.abs(total - 100) < 0.001;

  const errorText = (code: string) => {
    const key = Object.keys(s.errors).find((k) => code.includes(k));
    return s.errors[key ?? 'generic'];
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanNames = names.map((n) => n.trim()).filter(Boolean);
    if (new Set(cleanNames.map((n) => n.toLowerCase())).size < 2 || cleanNames.length > 3) {
      setError(s.errors.invalid_names);
      return;
    }
    if (!totalOk) {
      setError(s.errors.ownership_must_total_100);
      return;
    }
    setSaving(true);
    try {
      await submitIntake({
        orderId: order.id,
        state,
        contactEmail: email,
        contactPhone: phone,
        nameOptions: cleanNames,
        partners: rows.map((r) => ({ full_name: r.full_name.trim(), ownership_pct: Number(r.ownership_pct) })),
      });
      setEditing(false);
      onSaved();
    } catch (err) {
      setError(errorText(err instanceof Error ? err.message : ''));
    } finally {
      setSaving(false);
    }
  };

  if (submitted && !editing) {
    return (
      <Card title={s.title}>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500">{s.state}</dt>
            <dd className="text-white font-medium capitalize">{order.state}</dd>
          </div>
          <div>
            <dt className="text-slate-500">{s.contactEmail}</dt>
            <dd className="text-white font-medium break-all">{order.contact_email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">{s.contactPhone}</dt>
            <dd className="text-white font-medium">{order.contact_phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">{s.names}</dt>
            <dd className="text-white font-medium">{(order.name_options ?? []).join(' · ')}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-500">{s.partners}</dt>
            <dd className="text-white font-medium">
              {partners.map((p) => `${p.full_name} (${p.ownership_pct}%)`).join(' · ')}
            </dd>
          </div>
        </dl>
        {!locked && (
          <button onClick={() => setEditing(true)} className="mt-5 text-sm font-semibold text-amber-300 hover:text-amber-200">
            {s.edit}
          </button>
        )}
      </Card>
    );
  }

  return (
    <Card title={s.title} subtitle={s.subtitle}>
      <form onSubmit={submit} className="space-y-6">
        {error && (
          <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-300 mb-2">{s.state}</span>
            <select value={state} onChange={(e) => setState(e.target.value as LlcState)} className={inputClass}>
              {LLC_STATES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-300 mb-2">{s.contactEmail}</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </label>
          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-slate-300 mb-2">{s.contactPhone}</span>
            <input type="tel" required minLength={7} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+1 555 000 0000" />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-300">{s.names}</legend>
          <p className="text-xs text-slate-500 mt-1 mb-3">{s.namesHint}</p>
          <div className="space-y-3">
            {names.map((n, i) => (
              <input
                key={i}
                type="text"
                required={i < 2}
                minLength={3}
                maxLength={100}
                value={n}
                onChange={(e) => setNames((prev) => prev.map((v, idx) => (idx === i ? e.target.value : v)))}
                placeholder={`${i + 1}. ${s.namePlaceholder}`}
                className={inputClass}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-slate-300 mb-3">{s.partners}</legend>
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_6rem_auto] gap-3 items-end">
                <label className="block">
                  <span className="block text-xs text-slate-500 mb-1">{s.partnerName}</span>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={r.full_name}
                    onChange={(e) => setRows((prev) => prev.map((v, idx) => (idx === i ? { ...v, full_name: e.target.value } : v)))}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="block text-xs text-slate-500 mb-1">{s.partnerPct}</span>
                  <input
                    type="number"
                    required
                    min={0.01}
                    max={100}
                    step={0.01}
                    value={r.ownership_pct}
                    onChange={(e) => setRows((prev) => prev.map((v, idx) => (idx === i ? { ...v, ownership_pct: e.target.value } : v)))}
                    className={inputClass}
                  />
                </label>
                <button
                  type="button"
                  disabled={rows.length === 1}
                  onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label={s.removePartner}
                  className="p-3 text-slate-500 hover:text-rose-400 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              disabled={rows.length >= 10}
              onClick={() => setRows((prev) => [...prev, { full_name: '', ownership_pct: '' }])}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200 disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
              {s.addPartner}
            </button>
            <span className={`text-sm font-semibold ${totalOk ? 'text-emerald-400' : 'text-orange-400'}`}>
              {s.total}: {Number(total.toFixed(2))}%
            </span>
          </div>
        </fieldset>

        <button type="submit" disabled={saving} className={primaryBtn}>
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? s.saving : s.submit}
        </button>
      </form>
    </Card>
  );
}

/* ---------------------------- Documents (Module 2) ---------------------------- */

interface DocRowProps {
  title: string;
  hint?: string;
  docs: LlcDocument[];
  busy: boolean;
  onUpload: (file: File) => void;
  onRemove: (doc: LlcDocument) => void;
}

function DocRow({ title, hint, docs, busy, onUpload, onRemove }: DocRowProps) {
  const { lang } = useLanguage();
  const d = getLlcStrings(lang).portal.documents;
  const inputRef = useRef<HTMLInputElement>(null);
  const done = docs.length > 0;

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          {hint && <div className="text-xs text-slate-500 mt-0.5">{hint}</div>}
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${
            done ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
          }`}
        >
          {done ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {done ? d.done : d.required}
        </span>
      </div>

      {docs.length > 0 && (
        <ul className="mt-3 space-y-2">
          {docs.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-3 bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2">
              <span className="text-xs text-slate-300 truncate">{doc.file_name}</span>
              <span className="flex items-center gap-3 shrink-0">
                <button onClick={() => void openDocument(doc)} className="text-xs font-semibold text-amber-300 hover:text-amber-200">
                  {d.view}
                </button>
                <button onClick={() => onRemove(doc)} className="text-xs text-slate-500 hover:text-rose-400">
                  {d.remove}
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
      >
        {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
        {busy ? d.uploading : d.upload}
      </button>
    </div>
  );
}

interface DocumentsProps {
  order: LlcOrder;
  partners: LlcPartner[];
  docs: LlcDocument[];
  reload: () => void;
}

function ClientDocuments({ order, partners, docs, reload }: DocumentsProps) {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const d = getLlcStrings(lang).portal.documents;
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clientDocs = docs.filter((x) => x.source === 'client');

  const slots = useMemo(() => {
    const passportSlots =
      partners.length > 0
        ? partners.map((p) => ({ key: `passport:${p.full_name}`, type: 'passport' as LlcDocType, label: p.full_name, title: `${d.passportFor} ${p.full_name}` }))
        : [{ key: 'passport:', type: 'passport' as LlcDocType, label: '', title: d.passport }];
    return [
      ...passportSlots,
      { key: 'proof_of_address:', type: 'proof_of_address' as LlcDocType, label: '', title: d.proofOfAddress, hint: d.proofHint },
      { key: 'selfie:', type: 'selfie' as LlcDocType, label: '', title: d.selfie, hint: d.selfieHint },
    ];
  }, [partners, d]);

  const upload = async (slot: { key: string; type: LlcDocType; label: string }, file: File) => {
    if (!user) return;
    setError(null);
    const check = validateFile(file);
    if (check === 'size') return setError(d.fileTooBig);
    if (check === 'type') return setError(d.fileType);
    setBusyKey(slot.key);
    try {
      await uploadDocument({ userId: user.id, orderId: order.id, docType: slot.type, label: slot.label || undefined, file });
      reload();
    } catch {
      setError(d.uploadError);
    } finally {
      setBusyKey(null);
    }
  };

  const remove = async (doc: LlcDocument) => {
    setError(null);
    try {
      await deleteDocument(doc);
      reload();
    } catch {
      setError(d.uploadError);
    }
  };

  return (
    <Card title={d.title} subtitle={d.subtitle}>
      {error && (
        <div role="alert" className="flex items-start gap-3 p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      <div className="divide-y divide-slate-800">
        {slots.map((slot) => (
          <DocRow
            key={slot.key}
            title={slot.title}
            hint={'hint' in slot ? slot.hint : undefined}
            docs={clientDocs.filter((x) => x.doc_type === slot.type && (x.label ?? '') === slot.label)}
            busy={busyKey === slot.key}
            onUpload={(file) => void upload(slot, file)}
            onRemove={(doc) => void remove(doc)}
          />
        ))}
      </div>
    </Card>
  );
}

function BusinessProfile({ order, reload }: { order: LlcOrder; reload: () => void }) {
  const { lang } = useLanguage();
  const p = getLlcStrings(lang).portal.profile;
  const [description, setDescription] = useState(order.business_description ?? '');
  const [website, setWebsite] = useState(order.business_website ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await saveBusinessProfile(order.id, description, website);
      setSaved(true);
      reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title={p.title} subtitle={p.subtitle}>
      <form onSubmit={save} className="space-y-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-300 mb-2">{p.description}</span>
          <textarea
            rows={4}
            maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={p.descriptionPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-300 mb-2">{p.website}</span>
          <input type="text" maxLength={200} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder={p.websitePlaceholder} className={inputClass} />
        </label>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className={primaryBtn}>
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {p.save}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              {p.saved}
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}

/* ------------------------------------ Panel ----------------------------------- */

export default function LLCOrderPanel({ order, onChanged }: { order: LlcOrder; onChanged: () => void }) {
  const { lang, t } = useLanguage();
  const llc = getLlcStrings(lang);
  const p = llc.portal;
  const [partners, setPartners] = useState<LlcPartner[]>([]);
  const [docs, setDocs] = useState<LlcDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    try {
      const [pa, dc] = await Promise.all([fetchPartners(order.id), fetchDocuments(order.id)]);
      setPartners(pa);
      setDocs(dc);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const statusOf = (k: StageKey): LlcStageStatus =>
    k === 'formation' ? order.formation_status : k === 'ein' ? order.ein_status : order.bank_status;

  const teamDocs = docs.filter((x) => x.source === 'team');

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-300 mb-4">{p.loadError}</p>
        <button onClick={() => void load()} className={primaryBtn}>
          {p.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card title={p.progress}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-500 -mt-3 mb-5">
          <span>
            {p.orderedOn}{' '}
            {new Date(order.created_at).toLocaleDateString(t.dashboard.locale, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          {order.approved_name && (
            <span>
              {p.approvedName}: <span className="text-slate-200 font-medium">{order.approved_name}</span>
            </span>
          )}
          {order.bank_provider && (
            <span>
              {p.bankProvider}: <span className="text-slate-200 font-medium capitalize">{order.bank_provider}</span>
            </span>
          )}
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STAGE_KEYS.map((k, i) => {
            const status = statusOf(k);
            const range = LLC_TIMELINE[k];
            return (
              <li key={k} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <StageBadge status={status} label={p.status[status]} />
                </div>
                <div className="text-sm font-bold text-white">{p.stages[k]}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {p.estimated}: {range.min}–{range.max} {llc.timeline.businessDays}
                </div>
              </li>
            );
          })}
        </ol>
      </Card>

      <IntakeForm
        key={`${order.intake_submitted_at ?? 'new'}-${partners.length}`}
        order={order}
        partners={partners}
        onSaved={() => {
          void load();
          onChanged();
        }}
      />

      {order.intake_submitted_at && (
        <>
          <ClientDocuments order={order} partners={partners} docs={docs} reload={() => void load()} />
          <BusinessProfile order={order} reload={onChanged} />
        </>
      )}

      {/* Team deliverables */}
      <Card title={p.team.title} subtitle={p.team.subtitle}>
        {teamDocs.length === 0 ? (
          <p className="text-sm text-slate-500">{p.team.empty}</p>
        ) : (
          <ul className="space-y-2">
            {teamDocs.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-3 bg-slate-950/60 border border-slate-800 rounded-lg px-4 py-3">
                <span className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm text-slate-200 truncate">{p.team.types[doc.doc_type] ?? p.team.types.other}</span>
                </span>
                <button
                  onClick={() => void openDocument(doc)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 shrink-0"
                >
                  {p.documents.view}
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Module 3 recommendations */}
      <Card title={p.recommendations.title} subtitle={p.recommendations.subtitle}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {llc.modules[2].items.map((item) => (
            <li key={item.title} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="text-sm font-bold text-white mb-1">{item.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Letter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setLetterOpen((v) => !v)}
          aria-expanded={letterOpen}
          className="w-full flex items-center justify-between gap-3 p-5 sm:p-6 text-left"
        >
          <span className="flex items-center gap-3 text-sm font-semibold text-white">
            <FileText className="w-5 h-5 text-amber-400" />
            {p.letterTitle}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${letterOpen ? 'rotate-180' : ''}`} />
        </button>
        {letterOpen && (
          <div className="px-5 sm:px-6 pb-6">
            <LLCLetter />
          </div>
        )}
      </div>
    </div>
  );
}
