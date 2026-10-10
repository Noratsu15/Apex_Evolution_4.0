import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onSwitchToSignUp?: () => void;
  onSwitchToSignIn?: () => void;
  mode?: 'signin' | 'signup';
}

export default function AuthModal({
  open,
  onClose,
  onSuccess,
  onSwitchToSignUp,
  onSwitchToSignIn,
  mode: initialMode = 'signin',
}: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError(null);
    }
  }, [open, initialMode]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (fullName.trim().length < 2) {
          setError(t.auth.nameRequired);
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError(t.auth.passwordTooShort);
          setLoading(false);
          return;
        }
        const { error: signUpError } = await signUp(email, password, fullName);
        if (signUpError) {
          setError(signUpError);
          setLoading(false);
          return;
        }
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError(signInError);
          setLoading(false);
          return;
        }
      }

      setEmail('');
      setPassword('');
      setFullName('');
      onSuccess?.();
    } catch {
      setError(t.auth.unexpectedError);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-[fadeInUp_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
            <User className="w-7 h-7 text-slate-950" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'signup' ? t.auth.createAccount : t.auth.welcomeBack}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {mode === 'signup' ? t.auth.signUpSubtitle : t.auth.signInSubtitle}
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.auth.fullName}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.auth.fullNamePlaceholder}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{t.auth.email}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.auth.emailPlaceholder}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{t.auth.password}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {mode === 'signup' ? t.auth.creatingAccount : t.auth.signingIn}
              </>
            ) : (
              mode === 'signup' ? t.auth.createAccountBtn : t.auth.signInBtn
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          {mode === 'signup' ? (
            <>
              {t.auth.alreadyHaveAccount}{' '}
              <button
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  onSwitchToSignIn?.();
                }}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                {t.auth.signInLink}
              </button>
            </>
          ) : (
            <>
              {t.auth.dontHaveAccount}{' '}
              <button
                onClick={() => {
                  setMode('signup');
                  setError(null);
                  onSwitchToSignUp?.();
                }}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                {t.auth.signUpLink}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
