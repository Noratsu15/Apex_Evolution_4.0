import type { Translations } from '../types';

const en: Translations = {
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    dashboard: 'Dashboard',
    signOut: 'Sign Out',
    signIn: 'Sign In',
    getStarted: 'Get Started',
  },
  hero: {
    badge: 'Now in public beta — join 12,000+ early users',
    headline1: 'Build, ship, and scale',
    headline2: 'faster than ever',
    subtext:
      'The all-in-one platform that helps teams design, deploy, and manage their products with confidence. Start your journey today with a risk-free 30-day guarantee.',
    ctaPrimary: 'Get Started Free',
    ctaPrimaryUser: 'Go to Dashboard',
    ctaSecondary: 'Watch Demo',
    trust1: 'No credit card required',
    trust2: '30-day money-back guarantee',
    trust3: 'Cancel anytime',
  },
  features: {
    label: 'Features',
    title: 'Everything you need to succeed',
    subtitle:
      'Powerful features designed to streamline your workflow and accelerate growth.',
    items: [
      {
        title: 'Lightning Fast',
        description:
          'Optimized infrastructure delivers sub-100ms response times globally. Your users never wait.',
      },
      {
        title: 'Enterprise Security',
        description:
          'SOC 2 Type II compliant with end-to-end encryption, SSO, and granular access controls built in.',
      },
      {
        title: 'Real-time Analytics',
        description:
          'Track every metric that matters with beautiful dashboards and automated insight reports.',
      },
      {
        title: 'Global CDN',
        description:
          'Edge-deployed across 200+ locations worldwide. Your content is always close to your users.',
      },
      {
        title: 'Seamless CI/CD',
        description:
          'Connect your Git repo and auto-deploy on every push. Preview branches and rollbacks included.',
      },
      {
        title: '24/7 Monitoring',
        description:
          'Proactive uptime monitoring with instant alerts. Our team resolves issues before you notice.',
      },
    ],
  },
  howItWorks: {
    label: 'How It Works',
    title: 'Get started in 3 simple steps',
    subtitle:
      'From sign-up to launch in under 5 minutes. No technical expertise required.',
    steps: [
      {
        title: 'Choose Your Plan',
        description:
          'Pick the plan that fits your needs. Compare features and pricing side by side, and select with a single click.',
      },
      {
        title: 'Register & Pay',
        description:
          'Create your account in seconds and complete payment securely through PayPal. Your spot is reserved instantly.',
      },
      {
        title: 'Launch & Grow',
        description:
          'Access your dashboard, connect your tools, and start building. Our team is here to support you every step of the way.',
      },
    ],
  },
  pricing: {
    label: 'Pricing',
    title: 'Simple, transparent pricing',
    subtitle:
      "Choose the plan that's right for you. All plans include a 30-day money-back guarantee.",
    perMonth: '/month',
    mostPopular: 'Most Popular',
    getStarted: 'Get Started',
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Everything you need to launch your first project.',
        features: [
          'Up to 3 projects',
          '5 GB storage',
          'Community support',
          'Basic analytics dashboard',
          'Email notifications',
        ],
      },
      pro: {
        name: 'Pro',
        tagline: 'For growing teams that need more power and flexibility.',
        features: [
          'Up to 25 projects',
          '50 GB storage',
          'Priority support (24h)',
          'Advanced analytics & reports',
          'Custom domain support',
          'Team collaboration (5 seats)',
          'API access',
        ],
      },
      business: {
        name: 'Business',
        tagline: 'Enterprise-grade infrastructure with dedicated support.',
        features: [
          'Unlimited projects',
          '500 GB storage',
          'Dedicated account manager',
          'Real-time analytics & SLA',
          'White-label branding',
          'Team collaboration (unlimited)',
          'Full API access & webhooks',
          'SSO & advanced security',
        ],
      },
    },
  },
  testimonials: {
    label: 'Testimonials',
    title: 'Loved by teams worldwide',
    items: [
      {
        name: 'Sarah Chen',
        role: 'CTO, TechFlow',
        content:
          'Nexus transformed our deployment pipeline. What used to take weeks now takes minutes. The analytics dashboard alone has paid for the subscription tenfold.',
      },
      {
        name: 'Marcus Rodriguez',
        role: 'Founder, DevHub',
        content:
          'The ease of use is unmatched. Our team was up and running in a single afternoon. The PayPal checkout was seamless for our customers too.',
      },
      {
        name: 'Aisha Patel',
        role: 'Lead Engineer, CloudNine',
        content:
          'I have tried every platform out there. Nexus is the only one that combines power with simplicity. The global CDN is incredibly fast.',
      },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        question: 'How does the 30-day money-back guarantee work?',
        answer:
          'If you are not satisfied within 30 days of your purchase, contact our support team and we will issue a full refund — no questions asked. Your satisfaction is our priority.',
      },
      {
        question: 'Can I upgrade or downgrade my plan later?',
        answer:
          'Absolutely. You can change your plan at any time from your dashboard. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.',
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Yes. All payments are processed through PayPal, which uses industry-leading encryption and fraud protection. We never store your credit card details on our servers.',
      },
      {
        question: 'Do you offer team or enterprise discounts?',
        answer:
          'We do. For teams larger than 10 people or enterprise customers, reach out to our sales team for custom pricing and dedicated support packages.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept PayPal and all major credit cards through PayPal checkout. This includes Visa, Mastercard, American Express, and Discover.',
      },
    ],
  },
  cta: {
    title: 'Ready to build something great?',
    subtitle:
      'Join thousands of teams already using Nexus to ship faster. Start your free trial today — no credit card required.',
    button: 'Start Free Trial',
  },
  footer: {
    description:
      'The all-in-one platform for building, shipping, and scaling your products with confidence.',
    product: 'Product',
    company: 'Company',
    resources: 'Resources',
    legal: 'Legal',
    productLinks: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'],
    companyLinks: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
    resourcesLinks: ['Documentation', 'API Reference', 'Guides', 'Community', 'Support'],
    legalLinks: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
    rights: 'All rights reserved.',
    operational: 'All systems operational',
  },
  auth: {
    createAccount: 'Create your account',
    welcomeBack: 'Welcome back',
    signUpSubtitle: 'Sign up to get started with Nexus',
    signInSubtitle: 'Sign in to access your dashboard',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Jane Doe',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    creatingAccount: 'Creating account...',
    signingIn: 'Signing in...',
    createAccountBtn: 'Create Account',
    signInBtn: 'Sign In',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    signInLink: 'Sign in',
    signUpLink: 'Sign up',
    nameRequired: 'Please enter your full name.',
    passwordTooShort: 'Password must be at least 6 characters.',
    unexpectedError: 'An unexpected error occurred. Please try again.',
  },
  registration: {
    createAccount: 'Create your account',
    authPrompt: 'Sign up or sign in to complete your registration for the',
    selectedPlan: 'Selected Plan',
    completePurchase: 'Complete your purchase',
    signingUpFor: "You're signing up for the",
    plan: 'plan',
    billingCycle: 'Billing cycle',
    monthly: 'Monthly',
    accountEmail: 'Account email',
    totalToday: 'Total due today',
    securedByPaypal:
      'Secured by PayPal — your payment information is encrypted and protected.',
    loadingCheckout: 'Loading secure checkout...',
    termsNotice:
      'By completing this purchase, you agree to our Terms of Service and Privacy Policy. Cancel anytime. 30-day money-back guarantee.',
    processing: 'Processing your payment...',
    processingDesc:
      'Please wait while we securely process your PayPal payment and set up your account. Do not close this window.',
    success: 'Welcome to Nexus!',
    successDesc:
      'Your registration is complete. Your plan is now active. Redirecting to your dashboard...',
    loadingDashboard: 'Loading dashboard...',
    paymentFailed: 'Payment failed',
    paymentFailedDesc:
      'An error occurred while processing your payment. Please try again.',
    tryAgain: 'Try Again',
    paypalNotConfigured:
      'PayPal is not configured. Set VITE_PAYPAL_CLIENT_ID in your environment variables to enable payments.',
    paypalLoadError: 'Failed to load PayPal payment system.',
    paypalError: 'A PayPal error occurred. Please try again.',
    paymentCancelled: 'Payment was cancelled. You can try again when ready.',
    paymentProcessingFailed: 'Payment processing failed.',
    renderError: 'Failed to render PayPal buttons. Please refresh and try again.',
    initError: 'Failed to initialize PayPal payment.',
  },
  dashboard: {
    backToSite: 'Back to site',
    welcome: 'Welcome back',
    manageSubs: 'Manage your subscriptions and account details.',
    activePlans: 'Active Plans',
    completedPayments: 'Completed Payments',
    totalSpent: 'Total Spent',
    yourRegistrations: 'Your Registrations',
    noRegistrations: "You don't have any registrations yet.",
    browsePlans: 'Browse Plans',
    planSuffix: 'Plan',
    registeredOn: 'Registered on',
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    signOut: 'Sign Out',
    locale: 'en-US',
  },
};

export default en;
