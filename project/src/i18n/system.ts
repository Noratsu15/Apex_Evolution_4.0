import type { LanguageCode } from './types';

export interface SystemStrings {
  title: string;
  text: string;
  enter: string;
  entering: string;
  locked: string;
  activate: string;
  errors: Record<string, string>;
}

const es: SystemStrings = {
  title: 'Tu sistema Apex Evolution',
  text: 'Biblioteca, billetera, comisiones y tu asistente de IA. Entras directo, sin volver a iniciar sesión.',
  enter: 'Entrar a mi sistema',
  entering: 'Abriendo tu sistema…',
  locked: 'El sistema es exclusivo para miembros con una membresía activa. Tu cuenta gratuita ya puede usar el portal y los demás servicios.',
  activate: 'Activar membresía',
  errors: {
    no_membership: 'No encontramos una membresía pagada en tu cuenta.',
    membership_expired: 'Tu membresía anual venció. Renuévala para volver a entrar.',
    email_not_confirmed: 'Confirma tu correo electrónico para entrar al sistema.',
    not_configured: 'El acceso al sistema aún no está configurado. Contacta con soporte.',
    unauthorized: 'Tu sesión venció. Vuelve a iniciar sesión.',
    generic: 'No pudimos abrir el sistema. Inténtalo de nuevo en un momento.',
  },
};

const en: SystemStrings = {
  title: 'Your Apex Evolution system',
  text: 'Library, wallet, commissions and your AI assistant. You enter directly, with no second login.',
  enter: 'Enter my system',
  entering: 'Opening your system…',
  locked: 'The system is exclusive to members with an active membership. Your free account can already use the portal and the other services.',
  activate: 'Activate membership',
  errors: {
    no_membership: 'We could not find a paid membership on your account.',
    membership_expired: 'Your annual membership has expired. Renew it to get back in.',
    email_not_confirmed: 'Confirm your e-mail address to enter the system.',
    not_configured: 'System access is not configured yet. Please contact support.',
    unauthorized: 'Your session expired. Please sign in again.',
    generic: 'We could not open the system. Please try again in a moment.',
  },
};

export function getSystemStrings(lang: LanguageCode): SystemStrings {
  return lang === 'es' ? es : en;
}
