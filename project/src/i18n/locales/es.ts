import type { Translations } from '../types';

const es: Translations = {
  nav: {
    features: 'Características',
    pricing: 'Precios',
    howItWorks: 'Cómo Funciona',
    faq: 'Preguntas Frecuentes',
    dashboard: 'Panel',
    signOut: 'Cerrar Sesión',
    signIn: 'Iniciar Sesión',
    getStarted: 'Comenzar',
  },
  hero: {
    badge: 'Ahora en beta pública — únete a más de 12,000 usuarios',
    headline1: 'Construye, lanza y escala',
    headline2: 'más rápido que nunca',
    subtext:
      'La plataforma todo en uno que ayuda a los equipos a diseñar, desplegar y gestionar sus productos con confianza. Comienza tu viaje hoy con una garantía de 30 días sin riesgo.',
    ctaPrimary: 'Comienza Gratis',
    ctaPrimaryUser: 'Ir al Panel',
    ctaSecondary: 'Ver Demo',
    trust1: 'No se requiere tarjeta de crédito',
    trust2: 'Garantía de devolución de 30 días',
    trust3: 'Cancela cuando quieras',
  },
  features: {
    label: 'Características',
    title: 'Todo lo que necesitas para tener éxito',
    subtitle:
      'Funciones potentes diseñadas para optimizar tu flujo de trabajo y acelerar el crecimiento.',
    items: [
      {
        title: 'Velocidad Relámpago',
        description:
          'Infraestructura optimizada con tiempos de respuesta inferiores a 100ms a nivel mundial. Tus usuarios nunca esperan.',
      },
      {
        title: 'Seguridad Empresarial',
        description:
          'Cumplimiento SOC 2 Tipo II con cifrado de extremo a extremo, SSO y controles de acceso granulares integrados.',
      },
      {
        title: 'Analíticas en Tiempo Real',
        description:
          'Rastrea cada métrica importante con paneles hermosos e informes automatizados de análisis.',
      },
      {
        title: 'CDN Global',
        description:
          'Desplegado en el borde en más de 200 ubicaciones en todo el mundo. Tu contenido siempre está cerca de tus usuarios.',
      },
      {
        title: 'CI/CD Sin Esfuerzo',
        description:
          'Conecta tu repositorio Git y despliega automáticamente en cada push. Incluye ramas de vista previa y rollbacks.',
      },
      {
        title: 'Monitoreo 24/7',
        description:
          'Monitoreo proactivo de tiempo de actividad con alertas instantáneas. Nuestro equipo resuelve problemas antes de que los notes.',
      },
    ],
  },
  howItWorks: {
    label: 'Cómo Funciona',
    title: 'Comienza en 3 sencillos pasos',
    subtitle:
      'De registro a lanzamiento en menos de 5 minutos. No se requiere experiencia técnica.',
    steps: [
      {
        title: 'Elige Tu Plan',
        description:
          'Selecciona el plan que se ajuste a tus necesidades. Compara características y precios uno al lado del otro y elige con un solo clic.',
      },
      {
        title: 'Regístrate y Paga',
        description:
          'Crea tu cuenta en segundos y completa el pago de forma segura a través de PayPal. Tu lugar se reserva al instante.',
      },
      {
        title: 'Lanza y Crece',
        description:
          'Accede a tu panel, conecta tus herramientas y empieza a construir. Nuestro equipo está aquí para apoyarte en cada paso.',
      },
    ],
  },
  pricing: {
    label: 'Precios',
    title: 'Precios simples y transparentes',
    subtitle:
      'Elige el plan adecuado para ti. Todos los planes incluyen una garantía de devolución de 30 días.',
    perMonth: '/mes',
    mostPopular: 'Más Popular',
    getStarted: 'Comenzar',
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Todo lo que necesitas para lanzar tu primer proyecto.',
        features: [
          'Hasta 3 proyectos',
          '5 GB de almacenamiento',
          'Soporte comunitario',
          'Panel de analíticas básico',
          'Notificaciones por email',
        ],
      },
      pro: {
        name: 'Pro',
        tagline: 'Para equipos en crecimiento que necesitan más potencia y flexibilidad.',
        features: [
          'Hasta 25 proyectos',
          '50 GB de almacenamiento',
          'Soporte prioritario (24h)',
          'Analíticas avanzadas e informes',
          'Dominio personalizado',
          'Colaboración de equipo (5 puestos)',
          'Acceso a API',
        ],
      },
      business: {
        name: 'Business',
        tagline: 'Infraestructura de nivel empresarial con soporte dedicado.',
        features: [
          'Proyectos ilimitados',
          '500 GB de almacenamiento',
          'Gerente de cuenta dedicado',
          'Analíticas en tiempo real y SLA',
          'Marca de etiqueta blanca',
          'Colaboración de equipo (ilimitada)',
          'Acceso completo a API y webhooks',
          'SSO y seguridad avanzada',
        ],
      },
    },
  },
  testimonials: {
    label: 'Testimonios',
    title: 'Amado por equipos de todo el mundo',
    items: [
      {
        name: 'Sarah Chen',
        role: 'CTO, TechFlow',
        content:
          'Nexus transformó nuestro proceso de despliegue. Lo que solía tomar semanas ahora toma minutos. El panel de analíticas por sí solo ha pagado la suscripción diez veces.',
      },
      {
        name: 'Marcus Rodriguez',
        role: 'Fundador, DevHub',
        content:
          'La facilidad de uso no tiene comparación. Nuestro equipo estaba funcionando en una sola tarde. El pago con PayPal también fue fluido para nuestros clientes.',
      },
      {
        name: 'Aisha Patel',
        role: 'Ingeniera Principal, CloudNine',
        content:
          'He probado todas las plataformas. Nexus es la única que combina potencia con simplicidad. El CDN global es increíblemente rápido.',
      },
    ],
  },
  faq: {
    label: 'Preguntas Frecuentes',
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Cómo funciona la garantía de devolución de 30 días?',
        answer:
          'Si no estás satisfecho dentro de los 30 días posteriores a tu compra, contacta a nuestro equipo de soporte y te emitiremos un reembolso completo, sin preguntas. Tu satisfacción es nuestra prioridad.',
      },
      {
        question: '¿Puedo cambiar mi plan más adelante?',
        answer:
          'Por supuesto. Puedes cambiar tu plan en cualquier momento desde tu panel. Las mejoras se aplican inmediatamente y las bajadas se aplican al inicio de tu próximo ciclo de facturación.',
      },
      {
        question: '¿Es segura mi información de pago?',
        answer:
          'Sí. Todos los pagos se procesan a través de PayPal, que utiliza cifrado y protección contra fraude líderes en la industria. Nunca almacenamos los detalles de tu tarjeta de crédito en nuestros servidores.',
      },
      {
        question: '¿Ofrecen descuentos para equipos o empresas?',
        answer:
          'Sí. Para equipos de más de 10 personas o clientes empresariales, comunícate con nuestro equipo de ventas para precios personalizados y paquetes de soporte dedicado.',
      },
      {
        question: '¿Qué métodos de pago aceptan?',
        answer:
          'Aceptamos PayPal y todas las principales tarjetas de crédito a través del pago de PayPal. Esto incluye Visa, Mastercard, American Express y Discover.',
      },
    ],
  },
  cta: {
    title: '¿Listo para construir algo genial?',
    subtitle:
      'Únete a miles de equipos que ya usan Nexus para lanzar más rápido. Comienza tu prueba gratuita hoy, no se requiere tarjeta de crédito.',
    button: 'Comenzar Prueba Gratis',
  },
  footer: {
    description:
      'La plataforma todo en uno para construir, lanzar y escalar tus productos con confianza.',
    product: 'Producto',
    company: 'Empresa',
    resources: 'Recursos',
    legal: 'Legal',
    productLinks: ['Características', 'Precios', 'Cambios', 'Hoja de Ruta', 'Estado'],
    companyLinks: ['Acerca de', 'Blog', 'Empleo', 'Prensa', 'Contacto'],
    resourcesLinks: ['Documentación', 'Referencia API', 'Guías', 'Comunidad', 'Soporte'],
    legalLinks: ['Política de Privacidad', 'Términos de Servicio', 'Política de Cookies', 'GDPR', 'Seguridad'],
    rights: 'Todos los derechos reservados.',
    operational: 'Todos los sistemas operativos',
  },
  auth: {
    createAccount: 'Crea tu cuenta',
    welcomeBack: 'Bienvenido de nuevo',
    signUpSubtitle: 'Regístrate para comenzar con Nexus',
    signInSubtitle: 'Inicia sesión para acceder a tu panel',
    fullName: 'Nombre Completo',
    fullNamePlaceholder: 'Juan Pérez',
    email: 'Correo',
    emailPlaceholder: 'tu@ejemplo.com',
    password: 'Contraseña',
    creatingAccount: 'Creando cuenta...',
    signingIn: 'Iniciando sesión...',
    createAccountBtn: 'Crear Cuenta',
    signInBtn: 'Iniciar Sesión',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta?',
    signInLink: 'Iniciar sesión',
    signUpLink: 'Regístrate',
    nameRequired: 'Por favor ingresa tu nombre completo.',
    passwordTooShort: 'La contraseña debe tener al menos 6 caracteres.',
    unexpectedError: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
  },
  registration: {
    createAccount: 'Crea tu cuenta',
    authPrompt: 'Regístrate o inicia sesión para completar tu registro para el plan',
    selectedPlan: 'Plan Seleccionado',
    completePurchase: 'Completa tu compra',
    signingUpFor: 'Te estás registrando para el plan',
    plan: '',
    billingCycle: 'Ciclo de facturación',
    monthly: 'Mensual',
    accountEmail: 'Correo de cuenta',
    totalToday: 'Total a pagar hoy',
    securedByPaypal:
      'Protegido por PayPal — tu información de pago está cifrada y protegida.',
    loadingCheckout: 'Cargando pago seguro...',
    termsNotice:
      'Al completar esta compra, aceptas nuestros Términos de Servicio y Política de Privacidad. Cancela cuando quieras. Garantía de devolución de 30 días.',
    processing: 'Procesando tu pago...',
    processingDesc:
      'Por favor espera mientras procesamos de forma segura tu pago de PayPal y configuramos tu cuenta. No cierres esta ventana.',
    success: '¡Bienvenido a Nexus!',
    successDesc:
      'Tu registro está completo. Tu plan ya está activo. Redirigiendo a tu panel...',
    loadingDashboard: 'Cargando panel...',
    paymentFailed: 'Pago fallido',
    paymentFailedDesc:
      'Ocurrió un error al procesar tu pago. Inténtalo de nuevo.',
    tryAgain: 'Intentar de Nuevo',
    paypalNotConfigured:
      'PayPal no está configurado. Establece VITE_PAYPAL_CLIENT_ID en tus variables de entorno para habilitar pagos.',
    paypalLoadError: 'Error al cargar el sistema de pago de PayPal.',
    paypalError: 'Ocurrió un error de PayPal. Inténtalo de nuevo.',
    paymentCancelled: 'El pago fue cancelado. Puedes intentarlo de nuevo cuando estés listo.',
    paymentProcessingFailed: 'El procesamiento del pago falló.',
    renderError: 'Error al renderizar los botones de PayPal. Actualiza e inténtalo de nuevo.',
    initError: 'Error al inicializar el pago de PayPal.',
  },
  dashboard: {
    backToSite: 'Volver al sitio',
    welcome: 'Bienvenido de nuevo',
    manageSubs: 'Gestiona tus suscripciones y detalles de cuenta.',
    activePlans: 'Planes Activos',
    completedPayments: 'Pagos Completados',
    totalSpent: 'Total Gastado',
    yourRegistrations: 'Tus Registros',
    noRegistrations: 'Aún no tienes ningún registro.',
    browsePlans: 'Ver Planes',
    planSuffix: 'Plan',
    registeredOn: 'Registrado el',
    completed: 'Completado',
    pending: 'Pendiente',
    failed: 'Fallido',
    signOut: 'Cerrar Sesión',
    locale: 'es-ES',
  },
};

export default es;
