import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { claimStoredReferral } from '@/lib/referrals';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  /** True while the user arrived from a password-recovery e-mail and must choose a new password. */
  recovering: boolean;
  requestPasswordReset: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  finishRecovery: () => void;
}

// Captured at load: supabase-js removes the recovery params from the URL once it reads them.
const OPENED_AS_RECOVERY =
  typeof window !== 'undefined' && /type=recovery/.test(window.location.hash + window.location.search);

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(OPENED_AS_RECOVERY);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'PASSWORD_RECOVERY') setRecovering(true);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Attribute new accounts to the referral link they arrived through.
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    void claimStoredReferral();
  }, [userId]);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/`,
    });
    return { error: error ? (error.code ?? error.message) : null };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { error: error.code ?? error.message };
    // Best effort: end every other session once the password changed.
    await supabase.auth.signOut({ scope: 'others' }).catch(() => undefined);
    return { error: null };
  };

  const finishRecovery = () => {
    setRecovering(false);
    // Remove any leftover recovery parameters from the address bar.
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, recovering, requestPasswordReset, updatePassword, finishRecovery }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
