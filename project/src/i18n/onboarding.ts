import type { LanguageCode } from './types';

/** Short labels used on the main buttons; translated into every supported language. */
export const SHORT_LABELS: Record<LanguageCode, { signUpFree: string; membership: string; llc: string; or: string }> = {
  es: { signUpFree: 'Registrarme gratis', membership: 'Activar membresía', llc: 'Constituir LLC', or: 'o elige directamente' },
  en: { signUpFree: 'Sign up free', membership: 'Activate membership', llc: 'Form an LLC', or: 'or go straight to' },
  zh: { signUpFree: '免费注册', membership: '激活会员', llc: '成立 LLC', or: '或直接选择' },
  ja: { signUpFree: '無料で登録', membership: 'メンバーシップを有効化', llc: 'LLCを設立', or: 'または直接選ぶ' },
  it: { signUpFree: 'Registrati gratis', membership: 'Attiva la membership', llc: 'Costituisci una LLC', or: 'oppure scegli direttamente' },
  fr: { signUpFree: "S'inscrire gratuitement", membership: "Activer l'abonnement", llc: 'Créer une LLC', or: 'ou choisissez directement' },
  de: { signUpFree: 'Kostenlos registrieren', membership: 'Mitgliedschaft aktivieren', llc: 'LLC gründen', or: 'oder direkt wählen' },
};

export interface OnboardingStrings {
  welcome: {
    title: string;
    subtitle: string;
    stepWhatsapp: string;
    stepNext: string;
    later: string;
  };
  whatsapp: {
    title: string;
    text: string;
    join: string;
    confirmPrompt: string;
    confirm: string;
    saving: string;
    joined: string;
    error: string;
  };
  next: {
    title: string;
    subtitle: string;
    explore: string;
  };
}

const es: OnboardingStrings = {
  welcome: {
    title: '¡Bienvenido/a a Apex Evolution 4.0!',
    subtitle: 'Tu cuenta gratuita ya está lista. Sigue estos dos pasos para aprovecharla.',
    stepWhatsapp: 'Paso 1 · Únete a la comunidad',
    stepNext: 'Paso 2 · Elige cómo continuar',
    later: 'Explorar mi portal por ahora',
  },
  whatsapp: {
    title: 'Grupo de WhatsApp de la comunidad',
    text: 'Es el espacio donde recibes avisos, apoyo y acompañamiento. Todos los nuevos miembros deben ingresar.',
    join: 'Unirme al grupo',
    confirmPrompt: '¿Ya entraste al grupo?',
    confirm: 'Ya me uní',
    saving: 'Guardando…',
    joined: '¡Ya eres parte del grupo!',
    error: 'No pudimos guardar tu confirmación. Inténtalo de nuevo.',
  },
  next: {
    title: 'Tus próximos pasos',
    subtitle: 'Tu registro es gratuito. Cuando quieras, activa una membresía o constituye tu LLC.',
    explore: 'Explorar mi portal por ahora',
  },
};

const en: OnboardingStrings = {
  welcome: {
    title: 'Welcome to Apex Evolution 4.0!',
    subtitle: 'Your free account is ready. Follow these two steps to get the most out of it.',
    stepWhatsapp: 'Step 1 · Join the community',
    stepNext: 'Step 2 · Choose how to continue',
    later: 'Explore my portal for now',
  },
  whatsapp: {
    title: 'Community WhatsApp group',
    text: 'This is where you get announcements, support, and guidance. All new members must join.',
    join: 'Join the group',
    confirmPrompt: 'Did you already join the group?',
    confirm: 'I already joined',
    saving: 'Saving…',
    joined: 'You are part of the group!',
    error: 'We could not save your confirmation. Please try again.',
  },
  next: {
    title: 'Your next steps',
    subtitle: 'Sign-up is free. Whenever you are ready, activate a membership or form your LLC.',
    explore: 'Explore my portal for now',
  },
};

export function getOnboardingStrings(lang: LanguageCode): OnboardingStrings {
  return lang === 'es' ? es : en;
}
