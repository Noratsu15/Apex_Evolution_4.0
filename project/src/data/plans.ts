import type { Plan } from '@/types';
import type { Translations } from '@/i18n';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Membresía Franquiciado',
    price: 200,
    tagline: 'Quienes buscan la máxima libertad financiera (Mantenimiento Mensual de $100 USD ).',
    features: [
      'Conviertete en dueño de tu propio canal digital',
      'Genera ingresos reales y transparentes por producción',
      'Soporte prioritario (24h)',
    ],
  },
  {
    id: 'pro',
    name: 'Membresía Élite ($200 USD/Anual)',
    price: 200,
    tagline: 'Emprendedores y empresarios que buscan resaltar en el networking y potenciar su marketing.',
    highlight: true,
    features: [
      'Domina herramientas digitales e inteligencia artificial',
      'Estructura empresas para elevar ventas y éxito al máximo nivel',
      'Soporte en comunidad de emprendedores y empresarios',
      'Panel de control de gestión de negocios',
      'Acceso a recursos y plantillas de marketing',
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
