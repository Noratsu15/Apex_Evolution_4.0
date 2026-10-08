import type { LlcState } from '@/types';

/** Price of the LLC formation service in USD. Set VITE_LLC_PRICE_USD (e.g. in Netlify). */
export const LLC_PRICE_USD = Number(import.meta.env.VITE_LLC_PRICE_USD ?? 0) || 0;

/** Bump when the payment letter changes; stored with each order as acceptance proof. */
export const LLC_TERMS_VERSION = '2026-10-v1';

export const LLC_STATES: { id: LlcState; label: string }[] = [
  { id: 'wyoming', label: 'Wyoming' },
  { id: 'florida', label: 'Florida' },
];

/** Estimated business days per stage (100% remote). */
export const LLC_TIMELINE = {
  formation: { min: 3, max: 7 },
  ein: { min: 4, max: 12 },
  bank: { min: 2, max: 5 },
} as const;

export const LLC_TOTAL_DAYS = {
  min: LLC_TIMELINE.formation.min + LLC_TIMELINE.ein.min + LLC_TIMELINE.bank.min,
  max: LLC_TIMELINE.formation.max + LLC_TIMELINE.ein.max + LLC_TIMELINE.bank.max,
};
