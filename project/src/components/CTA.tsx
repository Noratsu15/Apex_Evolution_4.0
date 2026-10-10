import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { SHORT_LABELS } from '@/i18n/onboarding';

interface CTAProps {
  onGetStarted: () => void;
}

export default function CTA({ onGetStarted }: CTAProps) {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative py-24 bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-sky-500/20 via-slate-900 to-cyan-500/20 border border-sky-500/20 p-12 md:p-16 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-sky-500/20 blur-[100px] rounded-full" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {t.cta.title}
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              {t.cta.subtitle}
            </p>
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center gap-2 text-base font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 px-8 py-4 rounded-xl transition-all shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03]"
            >
              {user ? t.hero.ctaPrimaryUser : SHORT_LABELS[lang].signUpFree}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
