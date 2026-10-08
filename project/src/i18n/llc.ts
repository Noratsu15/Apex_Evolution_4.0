import type { LanguageCode } from './types';

export interface LlcLetterSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LlcStrings {
  navLabel: string;
  section: {
    label: string;
    title: string;
    subtitle: string;
    separateNote: string;
    price: string;
    priceOneTime: string;
    priceMissing: string;
    cta: string;
    readLetter: string;
  };
  modules: { tag: string; title: string; intro: string; items: { title: string; text: string }[] }[];
  timeline: {
    title: string;
    subtitle: string;
    businessDays: string;
    total: string;
    disclaimer: string;
    steps: { title: string; includes: string }[];
  };
  chooser: {
    title: string;
    subtitle: string;
    membershipTitle: string;
    membershipText: string;
    membershipCta: string;
    llcTitle: string;
    llcText: string;
    llcCta: string;
  };
  letter: {
    title: string;
    intro: string;
    sections: LlcLetterSection[];
    accept: string;
    version: string;
  };
  order: {
    authTitle: string;
    authText: string;
    letterTitle: string;
    letterText: string;
    continueToPayment: string;
    paymentTitle: string;
    service: string;
    account: string;
    oneTimePayment: string;
    total: string;
    back: string;
    processing: string;
    processingDesc: string;
    success: string;
    successDesc: string;
    failed: string;
    failedDesc: string;
    tryAgain: string;
    priceMissing: string;
    acceptRequired: string;
    serviceName: string;
  };
  portal: {
    tab: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyText: string;
    emptyCta: string;
    orderedOn: string;
    progress: string;
    stages: { formation: string; ein: string; bank: string };
    status: { pending: string; in_progress: string; completed: string };
    estimated: string;
    approvedName: string;
    bankProvider: string;
    intake: {
      title: string;
      subtitle: string;
      state: string;
      contactEmail: string;
      contactPhone: string;
      names: string;
      namesHint: string;
      namePlaceholder: string;
      partners: string;
      partnerName: string;
      partnerPct: string;
      addPartner: string;
      removePartner: string;
      total: string;
      submit: string;
      saving: string;
      saved: string;
      edit: string;
      errors: Record<string, string>;
    };
    documents: {
      title: string;
      subtitle: string;
      passport: string;
      passportFor: string;
      proofOfAddress: string;
      proofHint: string;
      selfie: string;
      selfieHint: string;
      upload: string;
      uploading: string;
      remove: string;
      view: string;
      fileTooBig: string;
      fileType: string;
      uploadError: string;
      required: string;
      done: string;
    };
    profile: {
      title: string;
      subtitle: string;
      description: string;
      descriptionPlaceholder: string;
      website: string;
      websitePlaceholder: string;
      save: string;
      saved: string;
    };
    team: {
      title: string;
      subtitle: string;
      empty: string;
      types: Record<string, string>;
    };
    recommendations: {
      title: string;
      subtitle: string;
    };
    letterTitle: string;
    loadError: string;
    retry: string;
  };
}

const es: LlcStrings = {
  navLabel: 'Constituir LLC',
  section: {
    label: 'Formación de LLC en EE. UU.',
    title: 'Crea tu empresa en Estados Unidos, 100% remoto',
    subtitle:
      'Te acompañamos desde el nombre de tu compañía hasta tu EIN y tu cuenta bancaria internacional. Sin viajar y con seguimiento de cada etapa desde tu portal.',
    separateNote:
      'Este servicio es independiente de las membresías: al registrarte decides si activas una membresía o si constituyes tu LLC.',
    price: 'Servicio de formación de LLC',
    priceOneTime: 'pago único',
    priceMissing: 'Precio por confirmar',
    cta: 'Quiero mi LLC',
    readLetter: 'Leer la carta del servicio',
  },
  modules: [
    {
      tag: 'Módulo 1',
      title: 'Requisitos para la formación de la LLC',
      intro:
        'Para iniciar el proceso de creación de tu empresa en Estados Unidos 100% remoto, solo necesitas aportar esta información básica:',
      items: [
        {
          title: 'Documento de identidad',
          text: 'Pasaporte vigente del titular (o de cada socio, si es una estructura multi-miembro).',
        },
        {
          title: 'Datos de contacto',
          text: 'Correo electrónico corporativo y número de teléfono activo.',
        },
        {
          title: 'Opciones de nombre',
          text: 'Propuesta de 2 o 3 opciones para el nombre de la LLC (la agencia verifica la disponibilidad en tiempo real con el estado elegido).',
        },
        {
          title: 'Estructura de participación',
          text: 'Definición de los porcentajes de propiedad en caso de tener socios.',
        },
      ],
    },
    {
      tag: 'Módulo 2',
      title: 'Requisitos para abrir tu cuenta bancaria internacional',
      intro:
        'Una vez constituida la LLC y obtenido el EIN, inicia la solicitud en plataformas financieras y neobancos aliados (como Relay Financial o Wise Business). Los requisitos esenciales son:',
      items: [
        {
          title: 'Documentación corporativa oficial',
          text: 'Certificado de formación de la LLC (Articles of Organization) y el Operating Agreement.',
        },
        {
          title: 'Documento fiscal',
          text: 'Carta oficial de asignación del EIN emitida por el IRS.',
        },
        {
          title: 'Verificación de identidad',
          text: 'Pasaporte vigente del titular y foto de verificación (selfie de seguridad que solicita la plataforma).',
        },
        {
          title: 'Comprobante de domicilio',
          text: 'Recibo de servicios o estado de cuenta bancario reciente que coincida con los datos personales del titular.',
        },
        {
          title: 'Perfil del negocio',
          text: 'Breve descripción de la actividad, sitio web o redes sociales activas de la empresa para agilizar el filtro de cumplimiento.',
        },
      ],
    },
    {
      tag: 'Módulo 3',
      title: 'Recomendaciones clave para operar y proteger tu negocio',
      intro:
        'Para cuidar la salud financiera, legal y operativa de tu LLC después de la apertura, te sugerimos estas buenas prácticas corporativas:',
      items: [
        {
          title: 'Separación financiera absoluta',
          text: 'Nunca uses tu cuenta personal para movimientos de la LLC ni viceversa. Todo ingreso y gasto del negocio debe pasar por la cuenta corporativa para mantener el "velo corporativo" y proteger tu patrimonio personal.',
        },
        {
          title: 'Trazabilidad y soportes',
          text: 'Conserva facturas, comprobantes de gastos y soportes digitales de ventas; facilitarán cualquier auditoría o trámite fiscal futuro.',
        },
        {
          title: 'Cumplimiento anual obligatorio',
          text: 'Ten presente la renovación del Registered Agent y la presentación de los reportes anuales en el estado correspondiente (Wyoming o Florida) para mantener la empresa activa.',
        },
        {
          title: 'Uso seguro de pasarelas y Zelle',
          text: 'Opera siempre desde la geolocalización correcta o bajo esquemas de red estables recomendados por la mentoría, evitando cambios bruscos de IP que activen los protocolos de seguridad de los bancos digitales.',
        },
      ],
    },
  ],
  timeline: {
    title: 'Tiempos estimados del proceso',
    subtitle: '100% remoto, de principio a fin.',
    businessDays: 'días hábiles',
    total: 'Total estimado',
    disclaimer:
      'Son tiempos estimados; pueden variar según la carga de trabajo del estado, los tiempos del IRS y la revisión de cada plataforma.',
    steps: [
      {
        title: 'Formación de la LLC (Wyoming o Florida)',
        includes:
          'Desde la revisión y presentación de los Articles of Organization a través de nuestra agencia aliada (Northwest Registered Agent) hasta la aprobación oficial y la emisión del certificado de la empresa en tu portal corporativo.',
      },
      {
        title: 'Obtención del EIN (el "RIF" de EE. UU.)',
        includes: 'Días hábiles adicionales una vez aprobada la LLC, según los tiempos de procesamiento del IRS.',
      },
      {
        title: 'Apertura de cuenta bancaria (Relay Financial / Wise Business)',
        includes:
          'Una vez listos la LLC y el EIN: el registro en la plataforma digital, la carga de documentos corporativos y la revisión de cumplimiento, hasta la aprobación final de la cuenta sin necesidad de viajar.',
      },
    ],
  },
  chooser: {
    title: '¿Qué quieres hacer hoy?',
    subtitle: 'Elige una opción para continuar con tu registro.',
    membershipTitle: 'Activar una membresía',
    membershipText: 'Mentoría, herramientas de IA y acceso a la comunidad Apex Evolution 4.0.',
    membershipCta: 'Ver membresías',
    llcTitle: 'Constituir mi LLC en EE. UU.',
    llcText: 'Tu empresa, tu EIN y tu cuenta bancaria internacional, 100% remoto.',
    llcCta: 'Empezar con mi LLC',
  },
  letter: {
    title: 'Carta de servicio y condiciones de pago',
    intro:
      'Antes de realizar tu pago, te explicamos con detalle en qué consiste el servicio de formación de LLC, qué necesitamos de ti y qué puedes esperar en cada etapa.',
    sections: [
      {
        heading: '1. Qué es este servicio',
        paragraphs: [
          'Constituimos tu empresa (LLC) en Estados Unidos de forma 100% remota y te acompañamos hasta obtener tu EIN y solicitar tu cuenta bancaria internacional. Es un servicio independiente de las membresías de Apex Evolution 4.0.',
        ],
      },
      {
        heading: '2. Qué incluye',
        items: [
          'Revisión y presentación de los Articles of Organization en Wyoming o Florida a través de nuestra agencia aliada (Northwest Registered Agent).',
          'Verificación en tiempo real de la disponibilidad del nombre de tu LLC con el estado elegido.',
          'Gestión de la obtención del EIN ante el IRS.',
          'Acompañamiento en la solicitud de tu cuenta en plataformas aliadas (Relay Financial o Wise Business): registro, carga de documentos y revisión de cumplimiento.',
          'Un portal donde ves el avance de cada etapa, subes tus documentos y recibes los documentos corporativos de tu empresa.',
        ],
      },
      {
        heading: '3. Lo que necesitamos de ti (Módulo 1)',
        items: [
          'Pasaporte vigente del titular, o de cada socio si hay varios.',
          'Correo electrónico corporativo y un teléfono activo.',
          '2 o 3 opciones para el nombre de tu LLC.',
          'Los porcentajes de propiedad si tienes socios (deben sumar 100 %).',
        ],
      },
      {
        heading: '4. Requisitos para tu cuenta bancaria (Módulo 2)',
        items: [
          'Certificado de formación (Articles of Organization) y Operating Agreement.',
          'Carta de asignación del EIN emitida por el IRS.',
          'Pasaporte vigente del titular y selfie de verificación solicitada por la plataforma.',
          'Comprobante de domicilio reciente (recibo de servicios o estado de cuenta) que coincida con los datos del titular.',
          'Breve descripción de la actividad del negocio, sitio web o redes sociales activas.',
        ],
      },
      {
        heading: '5. Tiempos estimados',
        items: [
          'Formación de la LLC: de 3 a 7 días hábiles.',
          'Obtención del EIN: de 4 a 12 días hábiles adicionales, una vez aprobada la LLC.',
          'Apertura de la cuenta bancaria: de 2 a 5 días hábiles, una vez listos la LLC y el EIN.',
          'En total, aproximadamente de 9 a 24 días hábiles.',
        ],
      },
      {
        heading: '6. Recomendaciones para operar y proteger tu negocio (Módulo 3)',
        items: [
          'Separa por completo tus finanzas personales de las de la LLC para conservar el "velo corporativo".',
          'Guarda facturas, comprobantes y soportes de ventas para cualquier auditoría o trámite fiscal.',
          'Renueva el Registered Agent y presenta los reportes anuales del estado (Wyoming o Florida) para mantener la empresa activa.',
          'Opera desde una geolocalización y red estables para evitar bloqueos de seguridad en los bancos digitales.',
        ],
      },
      {
        heading: '7. Condiciones importantes',
        items: [
          'Los tiempos son estimados y dependen de la carga de trabajo del estado, del IRS y de cada plataforma financiera.',
          'La aprobación final de la cuenta bancaria la decide cada plataforma tras su propia revisión de cumplimiento.',
          'La renovación del Registered Agent y los reportes anuales son obligaciones continuas del titular de la LLC.',
          'La información y los documentos que aportes deben ser veraces y se usan únicamente para los trámites de este servicio.',
          'El pago se procesa de forma segura con PayPal, en dólares estadounidenses (USD).',
        ],
      },
    ],
    accept: 'He leído y acepto la carta de servicio y las condiciones de pago.',
    version: 'Versión',
  },
  order: {
    authTitle: 'Crea tu cuenta para continuar',
    authText: 'Necesitas una cuenta para contratar la formación de tu LLC y seguir el avance en tu portal.',
    letterTitle: 'Carta de servicio',
    letterText: 'Lee con calma cómo funciona el servicio antes de pagar.',
    continueToPayment: 'Continuar al pago',
    paymentTitle: 'Completa tu pago',
    service: 'Servicio',
    account: 'Cuenta',
    oneTimePayment: 'Pago único',
    total: 'Total hoy',
    back: 'Volver a la carta',
    processing: 'Procesando tu pago…',
    processingDesc: 'No cierres esta ventana. Estamos confirmando tu pago y creando tu expediente.',
    success: '¡Pago confirmado!',
    successDesc: 'Te llevamos a tu portal para que completes los datos de tu LLC.',
    failed: 'No pudimos completar el pago',
    failedDesc: 'Revisa tu método de pago e inténtalo de nuevo.',
    tryAgain: 'Intentar de nuevo',
    priceMissing: 'El precio del servicio aún no está configurado. Contacta con soporte.',
    acceptRequired: 'Debes aceptar la carta de servicio para continuar.',
    serviceName: 'Formación de LLC en EE. UU.',
  },
  portal: {
    tab: 'Mi LLC',
    title: 'Mi LLC',
    subtitle: 'Sigue el avance de tu empresa, completa tus datos y gestiona tus documentos.',
    emptyTitle: 'Aún no has contratado la formación de tu LLC',
    emptyText: 'Crea tu empresa en Estados Unidos, obtén tu EIN y abre tu cuenta bancaria, 100% remoto.',
    emptyCta: 'Conocer el servicio',
    orderedOn: 'Contratado el',
    progress: 'Avance del proceso',
    stages: { formation: 'Formación de la LLC', ein: 'Obtención del EIN', bank: 'Cuenta bancaria' },
    status: { pending: 'Pendiente', in_progress: 'En proceso', completed: 'Completado' },
    estimated: 'Estimado',
    approvedName: 'Nombre aprobado',
    bankProvider: 'Plataforma',
    intake: {
      title: 'Datos para la formación (Módulo 1)',
      subtitle: 'Con esta información iniciamos el trámite. Puedes editarla hasta que comience la formación.',
      state: 'Estado de constitución',
      contactEmail: 'Correo corporativo',
      contactPhone: 'Teléfono activo',
      names: 'Opciones de nombre de la LLC',
      namesHint: 'Indica 2 o 3 opciones, en orden de preferencia. Verificamos su disponibilidad en tiempo real.',
      namePlaceholder: 'Ej. Mi Empresa LLC',
      partners: 'Titular y socios',
      partnerName: 'Nombre completo (como en el pasaporte)',
      partnerPct: '% de propiedad',
      addPartner: 'Agregar socio',
      removePartner: 'Quitar',
      total: 'Total',
      submit: 'Enviar datos',
      saving: 'Guardando…',
      saved: 'Datos enviados',
      edit: 'Editar datos',
      errors: {
        invalid_email: 'Escribe un correo válido.',
        invalid_phone: 'Escribe un teléfono válido.',
        invalid_names: 'Indica 2 o 3 nombres distintos (mínimo 3 caracteres).',
        invalid_partners: 'Revisa los nombres de los socios.',
        ownership_must_total_100: 'Los porcentajes deben sumar exactamente 100 %.',
        invalid_state: 'Elige Wyoming o Florida.',
        intake_locked: 'La formación ya inició; escríbenos para cambiar los datos.',
        generic: 'No pudimos guardar los datos. Inténtalo de nuevo.',
      },
    },
    documents: {
      title: 'Tus documentos',
      subtitle: 'Sube los documentos que piden las plataformas financieras. PDF, JPG, PNG o WebP, máximo 10 MB.',
      passport: 'Pasaporte vigente',
      passportFor: 'Pasaporte de',
      proofOfAddress: 'Comprobante de domicilio',
      proofHint: 'Recibo de servicios o estado de cuenta reciente, a nombre del titular.',
      selfie: 'Selfie de verificación',
      selfieHint: 'La plataforma puede pedirla; puedes adelantarla aquí.',
      upload: 'Subir archivo',
      uploading: 'Subiendo…',
      remove: 'Eliminar',
      view: 'Ver',
      fileTooBig: 'El archivo supera los 10 MB.',
      fileType: 'Formato no permitido. Usa PDF, JPG, PNG o WebP.',
      uploadError: 'No pudimos subir el archivo.',
      required: 'Pendiente',
      done: 'Cargado',
    },
    profile: {
      title: 'Perfil del negocio',
      subtitle: 'Ayuda a agilizar el filtro de cumplimiento del banco.',
      description: 'Descripción de la actividad',
      descriptionPlaceholder: 'Describe brevemente a qué se dedicará tu empresa.',
      website: 'Sitio web o red social',
      websitePlaceholder: 'https://',
      save: 'Guardar perfil',
      saved: 'Perfil guardado',
    },
    team: {
      title: 'Documentos de tu empresa',
      subtitle: 'Los documentos corporativos aparecerán aquí a medida que avance el proceso.',
      empty: 'Aún no hay documentos disponibles.',
      types: {
        articles_of_organization: 'Certificado de formación (Articles of Organization)',
        operating_agreement: 'Operating Agreement',
        ein_letter: 'Carta de asignación del EIN',
        other: 'Documento',
      },
    },
    recommendations: {
      title: 'Cómo operar y proteger tu LLC',
      subtitle: 'Buenas prácticas para mantener tu empresa sana y activa.'
    },
    letterTitle: 'Ver la carta de servicio',
    loadError: 'No pudimos cargar tu información.',
    retry: 'Reintentar',
  },
};

const en: LlcStrings = {
  navLabel: 'Form an LLC',
  section: {
    label: 'US LLC formation',
    title: 'Create your US company, 100% remotely',
    subtitle:
      'We guide you from your company name to your EIN and your international bank account. No travel, and every stage tracked from your portal.',
    separateNote:
      'This service is independent from memberships: when you sign up you decide whether to activate a membership or form your LLC.',
    price: 'LLC formation service',
    priceOneTime: 'one-time payment',
    priceMissing: 'Price to be confirmed',
    cta: 'I want my LLC',
    readLetter: 'Read the service letter',
  },
  modules: [
    {
      tag: 'Module 1',
      title: 'Requirements for forming the LLC',
      intro: 'To start creating your company in the United States 100% remotely, you only need to provide this basic information:',
      items: [
        { title: 'Identity document', text: "Valid passport of the owner (or of each partner, for a multi-member structure)." },
        { title: 'Contact information', text: 'Corporate email and an active phone number.' },
        {
          title: 'Name options',
          text: 'A proposal of 2 or 3 options for the LLC name (the agency checks availability in real time with the selected state).',
        },
        { title: 'Ownership structure', text: 'Ownership percentages if you have partners.' },
      ],
    },
    {
      tag: 'Module 2',
      title: 'Requirements for opening an international bank account',
      intro:
        'Once the LLC is formed and the EIN is obtained, the application begins with financial platforms and allied neobanks (such as Relay Financial or Wise Business). The essentials are:',
      items: [
        { title: 'Official corporate documents', text: 'Certificate of Formation (Articles of Organization) and the Operating Agreement.' },
        { title: 'Tax document', text: 'Official EIN assignment letter issued by the IRS.' },
        { title: 'Identity verification', text: "Valid passport of the holder and a verification photo (the security selfie the platform requests)." },
        { title: 'Proof of address', text: "Recent utility bill or bank statement matching the holder's personal information." },
        {
          title: 'Business profile',
          text: "Brief description of the business activity, website, or active social media to speed up the compliance review.",
        },
      ],
    },
    {
      tag: 'Module 3',
      title: 'Key recommendations to operate and protect your business',
      intro: 'To protect the financial, legal, and operational health of your LLC after opening, we suggest these corporate best practices:',
      items: [
        {
          title: 'Absolute financial separation',
          text: 'Never use your personal account for LLC transactions or vice versa. All business income and expenses must go through the corporate account to keep the "corporate veil" and protect your personal assets.',
        },
        {
          title: 'Traceability and supporting documents',
          text: 'Keep invoices, expense receipts, and digital sales records; they make any future audit or tax process easier.',
        },
        {
          title: 'Mandatory annual compliance',
          text: 'Remember the Registered Agent renewal and the annual reports in the corresponding state (Wyoming or Florida) to keep the company active.',
        },
        {
          title: 'Safe use of gateways and Zelle',
          text: 'Always operate from the correct geolocation or under stable network setups recommended by the mentorship, avoiding sudden IP changes that trigger digital banks\u2019 security protocols.',
        },
      ],
    },
  ],
  timeline: {
    title: 'Estimated process times',
    subtitle: '100% remote, start to finish.',
    businessDays: 'business days',
    total: 'Estimated total',
    disclaimer: 'These are estimates; they may vary with the state\u2019s workload, IRS processing times, and each platform\u2019s review.',
    steps: [
      {
        title: 'LLC formation (Wyoming or Florida)',
        includes:
          'From the review and submission of the Articles of Organization through our allied agency (Northwest Registered Agent) to official approval and the company certificate in your corporate portal.',
      },
      {
        title: 'Obtaining the EIN (the US "tax ID")',
        includes: 'Additional business days once the LLC is approved, depending on IRS processing times.',
      },
      {
        title: 'Business bank account (Relay Financial / Wise Business)',
        includes:
          'Once the LLC and EIN are ready: registration on the digital platform, upload of corporate documents, and the compliance review, up to final approval without traveling.',
      },
    ],
  },
  chooser: {
    title: 'What would you like to do today?',
    subtitle: 'Choose an option to continue your registration.',
    membershipTitle: 'Activate a membership',
    membershipText: 'Mentorship, AI tools, and access to the Apex Evolution 4.0 community.',
    membershipCta: 'See memberships',
    llcTitle: 'Form my US LLC',
    llcText: 'Your company, your EIN, and your international bank account, 100% remote.',
    llcCta: 'Start my LLC',
  },
  letter: {
    title: 'Service letter and payment terms',
    intro:
      'Before you pay, here is a detailed explanation of the LLC formation service, what we need from you, and what to expect at each stage.',
    sections: [
      {
        heading: '1. What this service is',
        paragraphs: [
          'We form your company (LLC) in the United States 100% remotely and guide you through obtaining your EIN and applying for your international bank account. It is independent from Apex Evolution 4.0 memberships.',
        ],
      },
      {
        heading: '2. What is included',
        items: [
          'Review and submission of the Articles of Organization in Wyoming or Florida through our allied agency (Northwest Registered Agent).',
          'Real-time availability check of your LLC name with the selected state.',
          'Handling of the EIN application with the IRS.',
          'Guidance on your account application with allied platforms (Relay Financial or Wise Business): registration, document upload, and compliance review.',
          'A portal where you follow each stage, upload your documents, and receive your company\u2019s corporate documents.',
        ],
      },
      {
        heading: '3. What we need from you (Module 1)',
        items: [
          'Valid passport of the owner, or of each partner if there are several.',
          'Corporate email and an active phone number.',
          '2 or 3 options for your LLC name.',
          'Ownership percentages if you have partners (they must add up to 100%).',
        ],
      },
      {
        heading: '4. Bank account requirements (Module 2)',
        items: [
          'Certificate of Formation (Articles of Organization) and Operating Agreement.',
          'EIN assignment letter issued by the IRS.',
          "Valid passport of the holder and the verification selfie requested by the platform.",
          "Recent proof of address (utility bill or bank statement) matching the holder's information.",
          'Brief description of the business activity, website, or active social media.',
        ],
      },
      {
        heading: '5. Estimated times',
        items: [
          'LLC formation: 3 to 7 business days.',
          'EIN: 4 to 12 additional business days once the LLC is approved.',
          'Bank account opening: 2 to 5 business days once the LLC and EIN are ready.',
          'In total, roughly 9 to 24 business days.',
        ],
      },
      {
        heading: '6. Recommendations to operate and protect your business (Module 3)',
        items: [
          'Fully separate your personal finances from the LLC\u2019s to keep the "corporate veil".',
          'Keep invoices, receipts, and sales records for any audit or tax process.',
          'Renew the Registered Agent and file the state annual reports (Wyoming or Florida) to keep the company active.',
          'Operate from a stable geolocation and network to avoid security blocks at digital banks.',
        ],
      },
      {
        heading: '7. Important conditions',
        items: [
          'Times are estimates and depend on the state\u2019s workload, the IRS, and each financial platform.',
          'Final bank account approval is decided by each platform after its own compliance review.',
          'Registered Agent renewal and annual reports are ongoing obligations of the LLC owner.',
          'The information and documents you provide must be truthful and are used only for this service.',
          'Payment is processed securely through PayPal, in US dollars (USD).',
        ],
      },
    ],
    accept: 'I have read and accept the service letter and payment terms.',
    version: 'Version',
  },
  order: {
    authTitle: 'Create your account to continue',
    authText: 'You need an account to order your LLC formation and follow its progress in your portal.',
    letterTitle: 'Service letter',
    letterText: 'Read how the service works before you pay.',
    continueToPayment: 'Continue to payment',
    paymentTitle: 'Complete your payment',
    service: 'Service',
    account: 'Account',
    oneTimePayment: 'One-time payment',
    total: 'Total today',
    back: 'Back to the letter',
    processing: 'Processing your payment…',
    processingDesc: 'Do not close this window. We are confirming your payment and creating your file.',
    success: 'Payment confirmed!',
    successDesc: 'Taking you to your portal to complete your LLC details.',
    failed: 'We could not complete the payment',
    failedDesc: 'Check your payment method and try again.',
    tryAgain: 'Try again',
    priceMissing: 'The service price is not configured yet. Please contact support.',
    acceptRequired: 'You must accept the service letter to continue.',
    serviceName: 'US LLC formation',
  },
  portal: {
    tab: 'My LLC',
    title: 'My LLC',
    subtitle: 'Follow your company\u2019s progress, complete your details, and manage your documents.',
    emptyTitle: 'You have not ordered an LLC formation yet',
    emptyText: 'Create your US company, get your EIN, and open your bank account, 100% remote.',
    emptyCta: 'Learn about the service',
    orderedOn: 'Ordered on',
    progress: 'Process progress',
    stages: { formation: 'LLC formation', ein: 'EIN', bank: 'Bank account' },
    status: { pending: 'Pending', in_progress: 'In progress', completed: 'Completed' },
    estimated: 'Estimated',
    approvedName: 'Approved name',
    bankProvider: 'Platform',
    intake: {
      title: 'Formation details (Module 1)',
      subtitle: 'We start the process with this information. You can edit it until formation begins.',
      state: 'State of formation',
      contactEmail: 'Corporate email',
      contactPhone: 'Active phone number',
      names: 'LLC name options',
      namesHint: 'Provide 2 or 3 options in order of preference. We check availability in real time.',
      namePlaceholder: 'e.g. My Company LLC',
      partners: 'Owner and partners',
      partnerName: 'Full name (as on passport)',
      partnerPct: 'Ownership %',
      addPartner: 'Add partner',
      removePartner: 'Remove',
      total: 'Total',
      submit: 'Submit details',
      saving: 'Saving…',
      saved: 'Details submitted',
      edit: 'Edit details',
      errors: {
        invalid_email: 'Enter a valid email.',
        invalid_phone: 'Enter a valid phone number.',
        invalid_names: 'Provide 2 or 3 different names (at least 3 characters).',
        invalid_partners: 'Check the partners\u2019 names.',
        ownership_must_total_100: 'Percentages must add up to exactly 100%.',
        invalid_state: 'Choose Wyoming or Florida.',
        intake_locked: 'Formation has already started; contact us to change the details.',
        generic: 'We could not save your details. Please try again.',
      },
    },
    documents: {
      title: 'Your documents',
      subtitle: 'Upload the documents financial platforms ask for. PDF, JPG, PNG or WebP, 10 MB max.',
      passport: 'Valid passport',
      passportFor: 'Passport of',
      proofOfAddress: 'Proof of address',
      proofHint: 'Recent utility bill or bank statement in the holder\u2019s name.',
      selfie: 'Verification selfie',
      selfieHint: 'The platform may request it; you can upload it ahead of time.',
      upload: 'Upload file',
      uploading: 'Uploading…',
      remove: 'Remove',
      view: 'View',
      fileTooBig: 'The file exceeds 10 MB.',
      fileType: 'File type not allowed. Use PDF, JPG, PNG or WebP.',
      uploadError: 'We could not upload the file.',
      required: 'Pending',
      done: 'Uploaded',
    },
    profile: {
      title: 'Business profile',
      subtitle: 'Helps speed up the bank\u2019s compliance review.',
      description: 'Activity description',
      descriptionPlaceholder: 'Briefly describe what your company will do.',
      website: 'Website or social media',
      websitePlaceholder: 'https://',
      save: 'Save profile',
      saved: 'Profile saved',
    },
    team: {
      title: 'Your company documents',
      subtitle: 'Corporate documents will appear here as the process moves forward.',
      empty: 'No documents available yet.',
      types: {
        articles_of_organization: 'Certificate of Formation (Articles of Organization)',
        operating_agreement: 'Operating Agreement',
        ein_letter: 'EIN assignment letter',
        other: 'Document',
      },
    },
    recommendations: {
      title: 'How to operate and protect your LLC',
      subtitle: 'Best practices to keep your company healthy and active.'
    },
    letterTitle: 'View the service letter',
    loadError: 'We could not load your information.',
    retry: 'Retry',
  },
};

export function getLlcStrings(lang: LanguageCode): LlcStrings {
  return lang === 'es' ? es : en;
}
