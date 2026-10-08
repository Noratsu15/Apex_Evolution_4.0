import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowLeft, Building2, CheckCircle2, CreditCard, Loader2, Lock, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { loadPayPalSdk, resetPayPalSdk } from '@/lib/paypal';
import { getLlcStrings } from '@/i18n/llc';
import { LLC_PRICE_USD, LLC_TERMS_VERSION } from '@/data/llc';
import AuthModal from '@/components/AuthModal';
import LLCLetter from '@/components/LLCLetter';

interface LLCOrderModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Step = 'auth' | 'letter' | 'payment' | 'processing' | 'success' | 'error';

export default function LLCOrderModal({ open, onClose, onComplete }: LLCOrderModalProps) {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const s = getLlcStrings(lang);
  const [step, setStep] = useState<Step>('auth');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [accepted, setAccepted] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [captured, setCaptured] = useState(false); // money taken: never offer a second charge
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const buttonsRenderedRef = useRef(false);

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string;
  const priceReady = LLC_PRICE_USD > 0;

  useEffect(() => {
    if (!open) return;
    setErrorMsg(null);
    setPaypalError(null);
    setAccepted(false);
    setAcceptedAt(null);
    setCaptured(false);
    buttonsRenderedRef.current = false;
    setStep(user ? 'letter' : 'auth');
  }, [open, user]);

  // Load the PayPal SDK once the payment step is shown
  useEffect(() => {
    if (step !== 'payment' || !priceReady) return;
    if (!paypalClientId) {
      setPaypalError(t.registration.paypalNotConfigured);
      return;
    }
    let cancelled = false;
    loadPayPalSdk(paypalClientId)
      .then(() => !cancelled && setPaypalLoaded(true))
      .catch((err: Error) => !cancelled && setPaypalError(err.message || t.registration.paypalLoadError));
    return () => {
      cancelled = true;
    };
  }, [step, priceReady, paypalClientId, t]);

  // Render PayPal buttons
  useEffect(() => {
    if (step !== 'payment' || !paypalLoaded || !window.paypal || buttonsRenderedRef.current) return;
    if (!paypalContainerRef.current || !acceptedAt) return;
    paypalContainerRef.current.innerHTML = '';
    buttonsRenderedRef.current = true;

    try {
      window.paypal
        .Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 48 },
          createOrder: async () => {
            const response = await fetch('/.netlify/functions/create-paypal-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: LLC_PRICE_USD,
                planId: 'llc-formation',
                planName: 'LLC Formation',
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
            let captureId: string | null = null;
            try {
              const captureResponse = await fetch('/.netlify/functions/capture-paypal-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: data.orderID,
                  planId: 'llc-formation',
                  planName: 'LLC Formation',
                  amount: LLC_PRICE_USD,
                }),
              });
              if (!captureResponse.ok) {
                const errData = await captureResponse.json().catch(() => ({}));
                throw new Error(errData.error || `Payment capture failed (${captureResponse.status})`);
              }
              const captureData = await captureResponse.json();
              captureId = captureData.captureId as string;
              setCaptured(true);

              const { error: orderError } = await supabase
                .from('llc_orders')
                .insert({
                  email: user?.email,
                  full_name: user?.user_metadata?.full_name ?? 'Unknown',
                  amount_paid: LLC_PRICE_USD,
                  payment_status: 'completed',
                  paypal_order_id: data.orderID,
                  paypal_capture_id: captureId,
                  terms_accepted_at: acceptedAt,
                  terms_version: LLC_TERMS_VERSION,
                })
                ;
              if (orderError) throw orderError;

              await supabase.from('payments').insert({
                registration_id: null,
                paypal_order_id: data.orderID,
                paypal_capture_id: captureId,
                amount: LLC_PRICE_USD,
                currency: 'USD',
                status: 'completed',
              });

              setStep('success');
              setTimeout(onComplete, 1800);
            } catch (err) {
              const message = err instanceof Error ? err.message : t.registration.paymentProcessingFailed;
              // If the money was captured but we could not record it, surface the reference.
              setErrorMsg(captureId ? `${message} (ref: ${captureId})` : message);
              setStep('error');
            }
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            setPaypalError(t.registration.paypalError);
          },
          onCancel: () => setPaypalError(t.registration.paymentCancelled),
        })
        .render(paypalContainerRef.current)
        .catch((err: unknown) => {
          console.error('PayPal render error:', err);
          setPaypalError(t.registration.renderError);
        });
    } catch (err) {
      console.error('PayPal setup error:', err);
      setPaypalError(t.registration.initError);
    }
  }, [step, paypalLoaded, acceptedAt, user, onComplete, t]);

  if (!open) return null;

  // Auth step uses the existing AuthModal as the only overlay.
  if (step === 'auth') {
    return (
      <AuthModal
        open
        mode={authMode}
        onClose={onClose}
        onSwitchToSignUp={() => setAuthMode('signup')}
        onSwitchToSignIn={() => setAuthMode('signin')}
        onSuccess={() => setStep('letter')}
      />
    );
  }

  const goToPayment = () => {
    if (!accepted) return;
    setAcceptedAt(new Date().toISOString());
    buttonsRenderedRef.current = false;
    setPaypalError(null);
    setStep('payment');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={step === 'processing' ? undefined : onClose}
      />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-[fadeInUp_0.3s_ease-out] max-h-[92vh] overflow-y-auto">
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8">
          {step === 'letter' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 items-center justify-center mb-4 shadow-lg shadow-sky-500/30">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{s.order.letterTitle}</h2>
                <p className="text-sm text-slate-400">{s.order.letterText}</p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 sm:p-6 max-h-[45vh] overflow-y-auto mb-5">
                <LLCLetter />
              </div>

              {!priceReady && (
                <div className="flex items-start gap-3 p-4 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{s.order.priceMissing}</span>
                </div>
              )}

              <label className="flex items-start gap-3 mb-5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-sky-400"
                />
                <span className="text-sm text-slate-300">{s.letter.accept}</span>
              </label>

              <button
                onClick={goToPayment}
                disabled={!accepted || !priceReady}
                className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {s.order.continueToPayment}
              </button>
              {!accepted && <p className="text-center text-xs text-slate-500 mt-3">{s.order.acceptRequired}</p>}
            </>
          )}

          {step === 'payment' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 items-center justify-center mb-4 shadow-lg shadow-sky-500/30">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{s.order.paymentTitle}</h2>
              </div>

              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{s.order.service}</span>
                  <span className="text-sm font-medium text-white">{s.order.serviceName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{t.registration.billingCycle}</span>
                  <span className="text-sm font-medium text-white">{s.order.oneTimePayment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{s.order.account}</span>
                  <span className="text-sm font-medium text-white truncate ml-4">{user?.email}</span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-base font-semibold text-white">{s.order.total}</span>
                  <span className="text-2xl font-bold text-white">${LLC_PRICE_USD.toFixed(2)}</span>
                </div>
              </div>

              {paypalError && (
                <div className="flex items-start gap-3 p-4 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{paypalError}</span>
                </div>
              )}

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

              <button
                onClick={() => setStep('letter')}
                className="mx-auto flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {s.order.back}
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="inline-flex w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500/20 items-center justify-center mb-6">
                <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{s.order.processing}</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">{s.order.processingDesc}</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12">
              <div className="inline-flex w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{s.order.success}</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto mb-6">{s.order.successDesc}</p>
              <Loader2 className="w-4 h-4 animate-spin text-slate-500 mx-auto" />
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-12">
              <div className="inline-flex w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-rose-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{s.order.failed}</h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6 break-words">{errorMsg || s.order.failedDesc}</p>
              {!captured && (
              <button
                onClick={() => {
                  resetPayPalSdk();
                  buttonsRenderedRef.current = false;
                  setPaypalLoaded(false);
                  setPaypalError(null);
                  setErrorMsg(null);
                  setStep('payment');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 transition-all"
              >
                {s.order.tryAgain}
              </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
