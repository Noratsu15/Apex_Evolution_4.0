import type { Plan } from '@/types';
import type { Translations } from '@/i18n';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    tagline: 'Everything you need to launch your first project.',
    features: [
      'Up to 3 projects',
      '5 GB storage',
      'Community support',
      'Basic analytics dashboard',
      'Email notifications',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    tagline: 'For growing teams that need more power and flexibility.',
    highlight: true,
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
  {
    id: 'business',
    name: 'Business',
    price: 199,
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
];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function getLocalizedPlans(t: Translations) {
  return PLANS.map((plan) => ({
    ...plan,
    name: t.pricing.plans[plan.id]?.name ?? plan.name,
    tagline: t.pricing.plans[plan.id]?.tagline ?? plan.tagline,
    features: t.pricing.plans[plan.id]?.features ?? plan.features,
  }));
}

export function getLocalizedPlan(id: string, t: Translations) {
  const plan = getPlan(id);
  if (!plan) return undefined;
  const localized = t.pricing.plans[plan.id];
  if (!localized) return plan;
  return {
    ...plan,
    name: localized.name,
    tagline: localized.tagline,
    features: localized.features,
  };
}
