import type { LanguageCode, Translations } from './types';
import en from './locales/en';
import es from './locales/es';
import zh from './locales/zh';
import ja from './locales/ja';
import it from './locales/it';
import fr from './locales/fr';
import de from './locales/de';

export type { LanguageCode, Translations, LanguageMeta, PlanStrings } from './types';
export { LANGUAGES } from './types';

export const translations: Record<LanguageCode, Translations> = {
  en,
  es,
  zh,
  ja,
  it,
  fr,
  de,
};
