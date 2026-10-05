export type PlanId = 'starter' | 'pro' | 'business';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlight?: boolean;
}

export interface Registration {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  plan: PlanId;
  amount_paid: number;
  payment_status: 'pending' | 'completed' | 'failed';
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentRecord {
  id: string;
  registration_id: string | null;
  user_id: string;
  paypal_order_id: string;
  paypal_capture_id: string | null;
  amount: number;
  currency: string;
  status: 'created' | 'approved' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export type MotherLineRole = 'founder_mentor' | 'mentor' | 'leader';

export interface MotherLineMember {
  id: string;
  full_name: string;
  role: MotherLineRole;
  slug: string;
  sort_order: number;
  is_me: boolean;
}

export type ReferralPaymentStatus = 'completed' | 'pending' | 'failed' | 'none';

export interface Referral {
  referral_id: string;
  leader_id: string;
  full_name: string;
  email: string;
  plan: string | null;
  payment_status: ReferralPaymentStatus;
  amount_paid: number;
  referred_at: string;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => PayPalButtonsInstance;
    };
  }
}

interface PayPalButtonsInstance {
  render: (selector: HTMLElement | string) => Promise<void>;
}

interface PayPalButtonsConfig {
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'pay' | 'checkout' | 'buynow' | 'paypal';
    height?: number;
  };
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError?: (err: unknown) => void;
  onCancel?: () => void;
}
