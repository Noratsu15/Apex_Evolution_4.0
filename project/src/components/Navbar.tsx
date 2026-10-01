import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LANGUAGES } from '@/i18n';
import LanguageSelector from '@/components/LanguageSelector';

interface NavbarProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onDashboard: () => void;
}

export default function Navbar({ onGetStarted, onSignIn, onDashboard }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, lang } = useLanguage();

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.faq, href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Nexus</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            {user ? (
              <>
                <button
                  onClick={onDashboard}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
                >
                  {t.nav.dashboard}
                </button>
                <button
                  onClick={signOut}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
                >
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
                >
                  {t.nav.signIn}
                </button>
                <button
                  onClick={onGetStarted}
                  className="text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.03]"
                >
                  {t.nav.getStarted}
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/60 rounded-b-2xl">
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-medium text-slate-400">{currentLang.label}</span>
                <LanguageSelector />
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                {user ? (
                  <>
                    <button
                      onClick={() => { setMobileOpen(false); onDashboard(); }}
                      className="block w-full text-center text-sm font-medium text-white bg-slate-800 px-5 py-3 rounded-xl"
                    >
                      {t.nav.dashboard}
                    </button>
                    <button
                      onClick={() => { setMobileOpen(false); signOut(); }}
                      className="block w-full text-center text-sm font-medium text-slate-300 px-5 py-3"
                    >
                      {t.nav.signOut}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setMobileOpen(false); onSignIn(); }}
                      className="block w-full text-center text-sm font-medium text-white bg-slate-800 px-5 py-3 rounded-xl"
                    >
                      {t.nav.signIn}
                    </button>
                    <button
                      onClick={() => { setMobileOpen(false); onGetStarted(); }}
                      className="block w-full text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 px-5 py-3 rounded-xl"
                    >
                      {t.nav.getStarted}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
