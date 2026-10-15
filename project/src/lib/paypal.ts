// PayPal SDK loader with singleton caching (shared by memberships and LLC checkout)
let paypalSdkPromise: Promise<void> | null = null;

export function resetPayPalSdk(): void {
  paypalSdkPromise = null;
}

export function loadPayPalSdk(clientId: string): Promise<void> {
  if (paypalSdkPromise) return paypalSdkPromise;
  if (window.paypal) return Promise.resolve();

  paypalSdkPromise = new Promise<void>((resolve, reject) => {
    if (!clientId) {
      paypalSdkPromise = null;
      reject(new Error('PayPal client ID no configurado o no encontrado'));
      return;
    }

    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
    script.onload = () => resolve();
    script.onerror = () => {
      paypalSdkPromise = null;
      reject(new Error('Failed to load PayPal SDK'));
    };
    document.head.appendChild(script);
  });

  return paypalSdkPromise;
}
