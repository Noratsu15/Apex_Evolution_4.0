import { useState } from 'react';
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getOnboardingStrings } from '@/i18n/onboarding';
import { getWhatsappGroupUrl, markWhatsappJoined } from '@/lib/onboarding';

interface WhatsAppJoinCardProps {
  joined: boolean;
  onJoined: () => void;
}

export default function WhatsAppJoinCard({ joined, onJoined }: WhatsAppJoinCardProps) {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const w = getOnboardingStrings(lang).whatsapp;
  const url = getWhatsappGroupUrl();
  const [opened, setOpened] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  if (!url && !joined) return null;

  const confirm = async () => {
    if (!user) return;
    setSaving(true);
    setError(false);
    try {
      await markWhatsappJoined(user.id);
      onJoined();
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-500/15 flex items-center justify-center">
          {joined ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <MessageCircle className="w-5 h-5 text-emerald-400" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-white">{joined ? w.joined : w.title}</h3>
          {!joined && <p className="text-sm text-slate-400 mt-1">{w.text}</p>}

          {!joined && url && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpened(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {w.join}
              </a>
              {opened && (
                <span className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">{w.confirmPrompt}</span>
                  <button
                    onClick={() => void confirm()}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-60"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? w.saving : w.confirm}
                  </button>
                </span>
              )}
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-rose-300 mt-3">
              {w.error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
