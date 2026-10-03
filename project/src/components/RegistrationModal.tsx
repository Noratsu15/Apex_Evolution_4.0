import { useState, useEffect, useRef } from 'react';
import { X, Loader2, AlertCircle, Lock, CreditCard, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import AuthModal from '@/components/AuthModal';
import { getLocalizedPlan } from '@/data/plans';
import type { Plan, Registration } from '@/types';

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  plan: Plan | null;
  onComplete: (registration: Registration) => void;
}

type Step = 'auth' | 'payment' | 'processing' | 'success' | 'error';

// PayPal SDK loader with singleton caching
let paypalSdkPromise: Promise<void> | null = null;

function loadPayPalSdk(clientId: string): Promise<void> {
  if (paypalSdkPromise) return paypalSdkPromise;
  if (window.paypal) return Promise.resolve();

  paypalSdkPromise = new Promise<void>((resolve, reject) => {
    if (!clientId){
      reject(new Error('PayPal client ID no configurado o no encontrado'));
      return;
    }

    //Evitar duplicados
    const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
    script.onload = () => resolve();
    script.onerror = () => {
      paypalSdkPromise = null
      reject(new Error('Failed to load PayPal SDK'));
    };
    document.head.appendChild(script);
  });

  return paypalSdkPromise;
}

export default function RegistrationModal({ open, onClose, plan, onComplete }: RegistrationModalProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('auth');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const buttonsRenderedRef = useRef(false);

  const paypalClientId = import.meta.env.PAYPAL_CLIENT_ID as string;

  // Get localized plan display name
  const localizedPlanName = plan ? (getLocalizedPlan(plan.id, t)?.name ?? plan.name) : '';

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setErrorMsg(null);
      setPaypalError(null);
      buttonsRenderedRef.current = false;
      if (user) {
        setStep('payment');
      } else {
        setStep('auth');
      }
    }
  }, [open, user]);

  // Load PayPal SDK when on payment step
  useEffect(() => {
    if (step !== 'payment' || !plan) return;

    if (!paypalClientId) {
      setPaypalError(t.registration.paypalNotConfigured);
      return;
    }

    let cancelled = false;

    loadPayPalSdk(paypalClientId)
      .then(() => {
        if (cancelled) return;
        setPaypalLoaded(true);
      })
      .catch((err) => {
        if (cancelled) return;
        setPaypalError(err.message || t.registration.paypalLoadError);
      });

    return () => {
      cancelled = true;
    };
  }, [step, plan, paypalClientId, t]);

  // Render PayPal buttons when SDK is loaded
  useEffect(() => {
    if (step !== 'payment' || !paypalLoaded || !plan || !window.paypal || buttonsRenderedRef.current) return;
    if (!paypalContainerRef.current) return;
    // Clear any existing buttons
    paypalContainerRef.current.innerHTML = '';
    buttonsRenderedRef.current = true;

    try {
      window.paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 48,
          },
          createOrder: async () => {
            const response = await fetch('/.netlify/functions/create-paypal-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: plan.price,
                planId: plan.id,
                planName: plan.name,
              }),
            });

            if (!response.ok) {
              const errData = await response.json().catch(() => ({}));
              throw new Error(errData.error || `Failed to create order (${response.status})`);
            }

            const data = await response.json();
            return data.orderId;
          },
          onApprove: async (data) => {
            setStep('processing');
            setErrorMsg(null);

            try {
              // Capture payment on the server
              const captureResponse = await fetch('/.netlify/functions/capture-paypal-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: data.orderID,
                  planId: plan.id,
                  planName: plan.name,
                  amount: plan.price,
                }),
              });

              if (!captureResponse.ok) {
                const errData = await captureResponse.json().catch(() => ({}));
                throw new Error(errData.error || `Payment capture failed (${captureResponse.status})`);
              }

              const captureData = await captureResponse.json();

              // Create registration record in Supabase
              const { data: registration, error: regError } = await supabase
                .from('registrations')
                .insert({
                  email: user?.email,
                  full_name: user?.user_metadata?.full_name ?? 'Unknown',
                  plan: plan.id,
                  amount_paid: plan.price,
                  payment_status: 'completed',
                  paypal_order_id: data.orderID,
                  paypal_capture_id: captureData.captureId,
                })
                .select()
                .single();

              if (regError) throw regError;

              // Also record in payments table
              await supabase.from('payments').insert({
                registration_id: registration?.id,
                paypal_order_id: data.orderID,
                paypal_capture_id: captureData.captureId,
                amount: plan.price,
                currency: 'USD',
                status: 'completed',
              });

              setStep('success');
              if (registration) {
                setTimeout(() => onComplete(registration as Registration), 2000);
              }
            } catch (err) {
              const message = err instanceof Error ? err.message : t.registration.paymentProcessingFailed;
              setErrorMsg(message);
              setStep('error');
            }
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            setPaypalError(t.registration.paypalError);
          },
          onCancel: () => {
            setPaypalError(t.registration.paymentCancelled);
          },
        })
        .render(paypalContainerRef.current)
        .catch((err) => {
          console.error('PayPal render error:', err);
          setPaypalError(t.registration.renderError);
        });
    } catch (err) {
      console.error('PayPal setup error:', err);
      setPaypalError(t.registration.initError);
    }
  }, [step, paypalLoaded, plan, user, onComplete, t]);

  if (!open || !plan) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={step === 'processing' ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-[fadeInUp_0.3s_ease-out] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-8">
          {/* Auth step */}
          {step === 'auth' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{t.registration.createAccount}</h2>
                <p className="text-sm text-slate-400">
                  {t.registration.authPrompt}{' '}
                  <span className="text-sky-400 font-medium">{localizedPlanName}</span>{' '}
                  {t.registration.plan}.
                </p>
              </div>

              {/* Plan summary */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">{t.registration.selectedPlan}</span>
                  <span className="text-sm font-bold text-white">{localizedPlanName}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-400">{t.pricing.perMonth}</span>
                </div>
              </div>

              <AuthModal
                open={true}
                mode={authModalMode}
                onClose={onClose}
                onSwitchToSignUp={() => setAuthModalMode('signup')}
                onSwitchToSignIn={() => setAuthModalMode('signin')}
                onSuccess={() => setStep('payment')}
              />
            </>
          )}

          {/* Payment step */}
          {step === 'payment' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 items-center justify-center mb-4 shadow-lg shadow-sky-500/30">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.registration.completePurchase}</h2>
                <p className="text-sm text-slate-400">
                  {t.registration.signingUpFor} <span className="text-sky-400 font-medium">{localizedPlanName}</span> {t.registration.plan}.
                </p>
              </div>

              {/* Order summary */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{t.registration.plan}</span>
                  <span className="text-sm font-medium text-white">{localizedPlanName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{t.registration.billingCycle}</span>
                  <span className="text-sm font-medium text-white">{t.registration.monthly}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{t.registration.accountEmail}</span>
                  <span className="text-sm font-medium text-white truncate ml-4">{user?.email}</span>
                </div>
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">{t.registration.totalToday}</span>
                    <span className="text-2xl font-bold text-white">${plan.price}.00</span>
                  </div>
                </div>
              </div>

              {/* PayPal error */}
              {paypalError && (
                <div className="flex items-start gap-3 p-4 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{paypalError}</span>
                </div>
              )}

              {/* PayPal buttons */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5" />
                  {t.registration.securedByPaypal}
                </div>
                {!paypalLoaded && !paypalError && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
                    <span className="ml-3 text-sm text-slate-400">{t.registration.loadingCheckout}</span>
                  </div>
                )}
                <div ref={paypalContainerRef} className="paypal-buttons-container" />
              </div>

              <p className="text-center text-xs text-slate-500">
                {t.registration.termsNotice}
              </p>
            </>
          )}

          {/* Processing step */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="inline-flex w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500/20 items-center justify-center mb-6">
                <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{t.registration.processing}</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                {t.registration.processingDesc}
              </p>
            </div>
          )}

          {/* Success step */}
          {step === 'success' && (
            <div className="text-center py-12">
              <div className="inline-flex w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-6 animate-[fadeIn_0.5s_ease-out]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.registration.success}</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto mb-6">
                {t.registration.successDesc}
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.registration.loadingDashboard}
              </div>
            </div>
          )}

          {/* Error step */}
          {step === 'error' && (
            <div className="text-center py-12">
              <div className="inline-flex w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-rose-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{t.registration.paymentFailed}</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto mb-6">
                {errorMsg || t.registration.paymentFailedDesc}
              </p>
              <button
                onClick={() => {
                  paypalSdkPromise = null;
                  setStep('payment');
                  setErrorMsg(null);
                  buttonsRenderedRef.current = false;
                  setPaypalLoaded(false);
                  setTimeout(() => setPaypalLoaded(true), 100);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 transition-all"
              >
                {t.registration.tryAgain}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
