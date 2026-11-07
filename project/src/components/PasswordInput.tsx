import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getRecoveryStrings } from '@/i18n/recovery';

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: 'current-password' | 'new-password';
  placeholder?: string;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Password field with an eye button. Clicking it switches the input `type`
 * between "password" (hidden) and "text" (visible), and back.
 */
export default function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
  placeholder = '••••••••',
  minLength,
  required = true,
  disabled,
}: PasswordInputProps) {
  const { lang } = useLanguage();
  const r = getRecoveryStrings(lang);
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        disabled={disabled}
        className="w-full pl-12 pr-12 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? r.hidePassword : r.showPassword}
        aria-pressed={visible}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-500 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
      >
        {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
