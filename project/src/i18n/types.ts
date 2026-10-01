export type LanguageCode = 'en' | 'es' | 'zh' | 'ja' | 'it' | 'fr' | 'de';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'zh', label: '中文', flag: 'ZH' },
  { code: 'ja', label: '日本語', flag: 'JA' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
];

export interface PlanStrings {
  name: string;
  tagline: string;
  features: string[];
}

export interface TestimonialStrings {
  name: string;
  role: string;
  content: string;
}

export interface FaqStrings {
  question: string;
  answer: string;
}

export interface HowItWorksStepStrings {
  title: string;
  description: string;
}

export interface FeatureStrings {
  title: string;
  description: string;
}

export interface Translations {
  // Navbar
  nav: {
    features: string;
    pricing: string;
    howItWorks: string;
    faq: string;
    dashboard: string;
    signOut: string;
    signIn: string;
    getStarted: string;
  };
  // Hero
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtext: string;
    ctaPrimary: string;
    ctaPrimaryUser: string;
    ctaSecondary: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  // Features section
  features: {
    label: string;
    title: string;
    subtitle: string;
    items: FeatureStrings[];
  };
  // How It Works section
  howItWorks: {
    label: string;
    title: string;
    subtitle: string;
    steps: HowItWorksStepStrings[];
  };
  // Pricing section
  pricing: {
    label: string;
    title: string;
    subtitle: string;
    perMonth: string;
    mostPopular: string;
    getStarted: string;
    plans: Record<string, PlanStrings>;
  };
  // Testimonials
  testimonials: {
    label: string;
    title: string;
    items: TestimonialStrings[];
  };
  // FAQ
  faq: {
    label: string;
    title: string;
    items: FaqStrings[];
  };
  // CTA
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  // Footer
  footer: {
    description: string;
    product: string;
    company: string;
    resources: string;
    legal: string;
    productLinks: string[];
    companyLinks: string[];
    resourcesLinks: string[];
    legalLinks: string[];
    rights: string;
    operational: string;
  };
  // Auth modal
  auth: {
    createAccount: string;
    welcomeBack: string;
    signUpSubtitle: string;
    signInSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    creatingAccount: string;
    signingIn: string;
    createAccountBtn: string;
    signInBtn: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    signInLink: string;
    signUpLink: string;
    nameRequired: string;
    passwordTooShort: string;
    unexpectedError: string;
  };
  // Registration modal
  registration: {
    createAccount: string;
    authPrompt: string;
    selectedPlan: string;
    completePurchase: string;
    signingUpFor: string;
    plan: string;
    billingCycle: string;
    monthly: string;
    accountEmail: string;
    totalToday: string;
    securedByPaypal: string;
    loadingCheckout: string;
    termsNotice: string;
    processing: string;
    processingDesc: string;
    success: string;
    successDesc: string;
    loadingDashboard: string;
    paymentFailed: string;
    paymentFailedDesc: string;
    tryAgain: string;
    paypalNotConfigured: string;
    paypalLoadError: string;
    paypalError: string;
    paymentCancelled: string;
    paymentProcessingFailed: string;
    renderError: string;
    initError: string;
  };
  // Dashboard
  dashboard: {
    backToSite: string;
    welcome: string;
    manageSubs: string;
    activePlans: string;
    completedPayments: string;
    totalSpent: string;
    yourRegistrations: string;
    noRegistrations: string;
    browsePlans: string;
    planSuffix: string;
    registeredOn: string;
    completed: string;
    pending: string;
    failed: string;
    signOut: string;
    locale: string;
  };
}
