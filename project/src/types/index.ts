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

export type ReferralProduct = 'membership' | 'llc' | 'both';

export type ReferralPaymentStatus = 'completed' | 'pending' | 'failed' | 'none';

export interface Referral {
  referral_id: string;
  leader_id: string;
  full_name: string;
  email: string;
  plan: string | null;
  product: ReferralProduct | null;
  payment_status: ReferralPaymentStatus;
  amount_paid: number;
  referred_at: string;
}

export type DashboardTab = 'activations' | 'llc' | 'referrals';

export type LlcState = 'wyoming' | 'florida';
export type LlcStageStatus = 'pending' | 'in_progress' | 'completed';
export type LlcDocType =
  | 'passport'
  | 'proof_of_address'
  | 'selfie'
  | 'articles_of_organization'
  | 'operating_agreement'
  | 'ein_letter'
  | 'other';

export interface LlcOrder {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  amount_paid: number;
  payment_status: 'pending' | 'completed' | 'failed';
  terms_accepted_at: string;
  terms_version: string;
  intake_submitted_at: string | null;
  state: LlcState | null;
  contact_email: string | null;
  contact_phone: string | null;
  name_options: string[] | null;
  business_description: string | null;
  business_website: string | null;
  formation_status: LlcStageStatus;
  ein_status: LlcStageStatus;
  bank_status: LlcStageStatus;
  bank_provider: 'relay' | 'wise' | null;
  approved_name: string | null;
  created_at: string;
}

export interface LlcPartner {
  id: string;
  order_id: string;
  full_name: string;
  ownership_pct: number;
}

export interface LlcDocument {
  id: string;
  order_id: string;
  doc_type: LlcDocType;
  source: 'client' | 'team';
  label: string | null;
  file_name: string;
  storage_path: string;
  created_at: string;
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
  onClick?: (data: unknown, actions: { resolve: () => Promise<void>; reject: () => Promise<void> }) => Promise<void> | void;
  onError?: (err: unknown) => void;
  onCancel?: () => void;
}
