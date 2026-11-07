import { useState } from 'react';
import { AlertCircle, CheckCircle2, KeyRound, Loader2, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getRecoveryStrings } from '@/i18n/recovery';
import PasswordInput from '@/components/PasswordInput';

interface ResetPasswordModalProps {
  onDone: () => void;
}

/** Opens when the user arrives from the recovery e-mail and lets them choose a new password. */
export default function ResetPasswordModal({ onDone }: ResetPasswordModalProps) {
  const { recovering, session, updatePassword, finishRecovery, signOut } = useAuth();
  const { lang } = useLanguage();
  const r = getRecoveryStrings(lang);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!recovering) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError(r.tooShort);
    if (password !== confirm) return setError(r.mismatch);

    setLoading(true);
    const { error: updateError } = await updatePassword(password);
    setLoading(false);

    if (updateError) {
      setError(
        updateError.includes('same_password')
          ? r.samePassword
          : updateError.includes('weak_password')
          ? r.tooShort
          : updateError.toLowerCase().includes('session')
          ? r.expired
          : r.genericError
      );
      return;
    }
    setPassword('');
    setConfirm('');
    setDone(true);
  };

  const cancel = async () => {
    // The recovery link opened a session: close it if the user walks away without choosing a password.
    await signOut();
    finishRecovery();
  };

  const proceed = () => {
    finishRecovery();
    onDone();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="reset-title">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-[fadeInUp_0.3s_ease-out]">
        {!done && (
          <button onClick={() => void cancel()} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors" aria-label={r.cancel}>
            <X className="w-5 h-5" />
          </button>
        )}

        {done ? (
          <div className="text-center py-4">
            <div className="inline-flex w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 id="reset-title" className="text-2xl font-bold text-white mb-2">
              {r.successTitle}
            </h2>
            <p className="text-sm text-slate-400 mb-6">{r.successText}</p>
            <button
              onClick={proceed}
              className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all"
            >
              {r.continueBtn}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                <KeyRound className="w-7 h-7 text-slate-950" />
              </div>
              <h2 id="reset-title" className="text-2xl font-bold text-white">
                {r.resetTitle}
              </h2>
              <p className="text-sm text-slate-400 mt-2">{r.resetSubtitle}</p>
              {session?.user?.email && <p className="text-xs text-slate-500 mt-2">{session.user.email}</p>}
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-slate-300 mb-2">
                  {r.newPassword}
                </label>
                <PasswordInput id="new-password" value={password} onChange={setPassword} autoComplete="new-password" minLength={6} />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-2">
                  {r.confirmPassword}
                </label>
                <PasswordInput id="confirm-password" value={confirm} onChange={setConfirm} autoComplete="new-password" minLength={6} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {r.updating}
                  </>
                ) : (
                  r.updatePassword
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
