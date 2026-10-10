import { ArrowRight, Play, Check, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { SHORT_LABELS } from '@/i18n/onboarding';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  const trustItems = [t.hero.trust1, t.hero.trust2, t.hero.trust3];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 animate-[fadeInUp_0.6s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-300">{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 animate-[fadeInUp_0.7s_ease-out]">
            {t.hero.headline1}
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
              {t.hero.headline2}
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
            {t.hero.subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-[fadeInUp_0.9s_ease-out]">
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center gap-2 text-base font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03]"
            >
              {user ? t.hero.ctaPrimaryUser : SHORT_LABELS[lang].signUpFree}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 text-base font-medium text-white border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl transition-all hover:bg-slate-900/50"
            >
              <Play className="w-4 h-4 fill-current" />
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Direct paths: membership or LLC */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-[fadeInUp_0.95s_ease-out]">
            <span className="text-sm text-slate-500">{SHORT_LABELS[lang].or}:</span>
            <button
              onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10 px-5 py-2.5 rounded-full transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {SHORT_LABELS[lang].membership}
            </button>
            <button
              onClick={() => document.querySelector('#llc')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10 px-5 py-2.5 rounded-full transition-all"
            >
              <Building2 className="w-4 h-4" />
              {SHORT_LABELS[lang].llc}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 animate-[fadeInUp_1s_ease-out]">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                <Check className="w-4 h-4 text-yellow-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
