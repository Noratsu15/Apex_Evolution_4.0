import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import RegistrationModal from '@/components/RegistrationModal';
import Dashboard from '@/components/Dashboard';
import ReferralBanner from '@/components/ReferralBanner';
import LLCSection from '@/components/LLCSection';
import LLCOrderModal from '@/components/LLCOrderModal';
import WelcomeGate from '@/components/WelcomeGate';
import type { DashboardTab, Plan, Registration } from '@/types';

type View = 'landing' | 'dashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [llcModalOpen, setLlcModalOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('activations');

  // Redirect to dashboard if user is logged in and tries to access dashboard view
  useEffect(() => {
    if (view === 'dashboard' && !user && !loading) {
      setView('landing');
    }
  }, [view, user, loading]);

  // Sign-up is free: visitors create an account, then the welcome modal guides them.
  const handleGetStarted = () => {
    if (user) {
      setDashboardTab('activations');
      setView('dashboard');
    } else {
      setAuthMode('signup');
      setAuthModalOpen(true);
    }
  };

  const handleBuyMembership = () => {
    setView('landing');
    setTimeout(() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  const handleGetLlc = () => {
    setView('landing');
    setLlcModalOpen(true);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setRegModalOpen(true);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleDashboard = () => {
    setDashboardTab('activations');
    setView('dashboard');
  };

  const handleRegComplete = (_registration: Registration) => {
    setRegModalOpen(false);
    setSelectedPlan(null);
    setView('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const page =
    view === 'dashboard' && user ? (
      <Dashboard
        onBackHome={() => setView('landing')}
        initialTab={dashboardTab}
        onBuyLlc={handleGetLlc}
        onBuyMembership={handleBuyMembership}
      />
    ) : (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
        onDashboard={handleDashboard}
      />
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <Features />
        <HowItWorks />
        <Pricing onSelectPlan={handleSelectPlan} />
        <LLCSection onGetLlc={handleGetLlc} />
        <Testimonials />
        <FAQ />
        <CTA onGetStarted={handleGetStarted} />
      </main>
      <Footer />
      <ReferralBanner />

      <AuthModal
        open={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          setView('dashboard');
        }}
      />

      <LLCOrderModal
        open={llcModalOpen}
        onClose={() => setLlcModalOpen(false)}
        onComplete={() => {
          setLlcModalOpen(false);
          setDashboardTab('llc');
          setView('dashboard');
        }}
      />

      <RegistrationModal
        open={regModalOpen}
        plan={selectedPlan}
        onClose={() => {
          setRegModalOpen(false);
          setSelectedPlan(null);
        }}
        onComplete={handleRegComplete}
      />
    </div>
    );

  // WelcomeGate stays mounted across view changes so it never re-opens by mistake.
  return (
    <>
      {page}
      <WelcomeGate onBuyMembership={handleBuyMembership} onBuyLlc={handleGetLlc} />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
