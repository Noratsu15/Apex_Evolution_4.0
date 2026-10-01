import type { Translations } from '../types';

const it: Translations = {
  nav: {
    features: 'Funzioni',
    pricing: 'Prezzi',
    howItWorks: 'Come Funziona',
    faq: 'FAQ',
    dashboard: 'Dashboard',
    signOut: 'Esci',
    signIn: 'Accedi',
    getStarted: 'Inizia',
  },
  hero: {
    badge: 'Ora in beta pubblica — unisciti a oltre 12.000 utenti',
    headline1: 'Costruisci, lancia e scala',
    headline2: 'più veloce che mai',
    subtext:
      'La piattaforma tutto-in-uno che aiuta i team a progettare, distribuire e gestire i loro prodotti con sicurezza. Inizia il tuo viaggio oggi con una garanzia di 30 giorni senza rischi.',
    ctaPrimary: 'Inizia Gratis',
    ctaPrimaryUser: 'Vai alla Dashboard',
    ctaSecondary: 'Guarda la Demo',
    trust1: 'Nessuna carta di credito richiesta',
    trust2: 'Garanzia di rimborso di 30 giorni',
    trust3: 'Cancella in qualsiasi momento',
  },
  features: {
    label: 'Funzioni',
    title: 'Tutto ciò di cui hai bisogno per avere successo',
    subtitle:
      'Funzionalità potenti progettate per semplificare il tuo flusso di lavoro e accelerare la crescita.',
    items: [
      {
        title: 'Velocità Fulminea',
        description:
          'Infrastruttura ottimizzata con tempi di risposta inferiori a 100ms a livello globale. I tuoi utenti non aspettano mai.',
      },
      {
        title: 'Sicurezza Enterprise',
        description:
          'Conforme a SOC 2 Type II con crittografia end-to-end, SSO e controlli di accesso granulari integrati.',
      },
      {
        title: 'Analisi in Tempo Reale',
        description:
          'Monitora ogni metrica importante con dashboard eleganti e report di insight automatizzati.',
      },
      {
        title: 'CDN Globale',
        description:
          'Distribuito edge in oltre 200 località in tutto il mondo. I tuoi contenuti sono sempre vicini ai tuoi utenti.',
      },
      {
        title: 'CI/CD Senza Sforzo',
        description:
          'Collega il tuo repo Git e distribuisci automaticamente ad ogni push. Anteprime dei branch e rollback inclusi.',
      },
      {
        title: 'Monitoraggio 24/7',
        description:
          'Monitoraggio proattivo del tempo di attività con avvisi istantanei. Il nostro team risolve i problemi prima che tu li noti.',
      },
    ],
  },
  howItWorks: {
    label: 'Come Funziona',
    title: 'Inizia in 3 semplici passaggi',
    subtitle:
      'Dalla registrazione al lancio in meno di 5 minuti. Nessuna competenza tecnica richiesta.',
    steps: [
      {
        title: 'Scegli il Tuo Piano',
        description:
          'Scegli il piano che si adatta alle tue esigenze. Confronta funzionalità e prezzi fianco a fianco e seleziona con un clic.',
      },
      {
        title: 'Registrati e Paga',
        description:
          'Crea il tuo account in secondi e completa il pagamento in modo sicuro tramite PayPal. Il tuo posto è riservato istantaneamente.',
      },
      {
        title: 'Lancia e Cresci',
        description:
          'Accedi alla tua dashboard, collega i tuoi strumenti e inizia a costruire. Il nostro team è qui per supportarti ad ogni passo.',
      },
    ],
  },
  pricing: {
    label: 'Prezzi',
    title: 'Prezzi semplici e trasparenti',
    subtitle:
      'Scegli il piano giusto per te. Tutti i piani includono una garanzia di rimborso di 30 giorni.',
    perMonth: '/mese',
    mostPopular: 'Più Popolare',
    getStarted: 'Inizia',
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Tutto ciò di cui hai bisogno per lanciare il tuo primo progetto.',
        features: [
          'Fino a 3 progetti',
          '5 GB di archiviazione',
          'Supporto community',
          'Dashboard di analisi di base',
          'Notifiche email',
        ],
      },
      pro: {
        name: 'Pro',
        tagline: 'Per team in crescita che necessitano di maggiore potenza e flessibilità.',
        features: [
          'Fino a 25 progetti',
          '50 GB di archiviazione',
          'Supporto prioritario (24h)',
          'Analisi avanzate e report',
          'Supporto dominio personalizzato',
          'Collaborazione di team (5 posti)',
          'Accesso API',
        ],
      },
      business: {
        name: 'Business',
        tagline: 'Infrastruttura di livello enterprise con supporto dedicato.',
        features: [
          'Progetti illimitati',
          '500 GB di archiviazione',
          'Account manager dedicato',
          'Analisi in tempo reale e SLA',
          'Branding white-label',
          'Collaborazione di team (illimitata)',
          'Accesso API completo e webhook',
          'SSO e sicurezza avanzata',
        ],
      },
    },
  },
  testimonials: {
    label: 'Testimonianze',
    title: 'Amato dai team di tutto il mondo',
    items: [
      {
        name: 'Sarah Chen',
        role: 'CTO, TechFlow',
        content:
          'Nexus ha trasformato la nostra pipeline di distribuzione. Quello che prima richiedeva settimane ora richiede minuti. Solo la dashboard di analisi ha ripagato l\'abbonamento dieci volte.',
      },
      {
        name: 'Marcus Rodriguez',
        role: 'Fondatore, DevHub',
        content:
          'La facilità d\'uso è impareggiabile. Il nostro team era operativo in un solo pomeriggio. Anche il checkout PayPal è stato fluido per i nostri clienti.',
      },
      {
        name: 'Aisha Patel',
        role: 'Ingegnere Capo, CloudNine',
        content:
          'Ho provato ogni piattaforma disponibile. Nexus è l\'unica che combina potenza e semplicità. La CDN globale è incredibilmente veloce.',
      },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Domande frequenti',
    items: [
      {
        question: 'Come funziona la garanzia di rimborso di 30 giorni?',
        answer:
          'Se non sei soddisfatto entro 30 giorni dall\'acquisto, contatta il nostro team di supporto e ti emetteremo un rimborso completo, senza fare domande. La tua soddisfazione è la nostra priorità.',
      },
      {
        question: 'Posso cambiare piano in un secondo momento?',
        answer:
          'Assolutamente. Puoi cambiare il tuo piano in qualsiasi momento dalla tua dashboard. Gli upgrade hanno effetto immediato, mentre i downgrade si applicano all\'inizio del tuo prossimo ciclo di fatturazione.',
      },
      {
        question: 'I miei dati di pagamento sono sicuri?',
        answer:
          'Sì. Tutti i pagamenti sono elaborati tramite PayPal, che utilizza crittografia e protezione antifrode leader del settore. Non memorizziamo mai i dettagli della tua carta di credito sui nostri server.',
      },
      {
        question: 'Offrite sconti per team o enterprise?',
        answer:
          'Sì. Per team con più di 10 persone o clienti enterprise, contatta il nostro team vendite per prezzi personalizzati e pacchetti di supporto dedicato.',
      },
      {
        question: 'Quali metodi di pagamento accettate?',
        answer:
          'Accettiamo PayPal e tutte le principali carte di credito tramite il checkout PayPal. Include Visa, Mastercard, American Express e Discover.',
      },
    ],
  },
  cta: {
    title: 'Pronto a costruire qualcosa di grande?',
    subtitle:
      'Unisciti a migliaia di team che già usano Nexus per lanciare più velocemente. Inizia la tua prova gratuita oggi — nessuna carta di credito richiesta.',
    button: 'Inizia la Prova Gratuita',
  },
  footer: {
    description:
      'La piattaforma tutto-in-uno per costruire, lanciare e scalare i tuoi prodotti con sicurezza.',
    product: 'Prodotto',
    company: 'Azienda',
    resources: 'Risorse',
    legal: 'Legale',
    productLinks: ['Funzioni', 'Prezzi', 'Changelog', 'Roadmap', 'Stato'],
    companyLinks: ['Chi siamo', 'Blog', 'Carriere', 'Press', 'Contatti'],
    resourcesLinks: ['Documentazione', 'Riferimento API', 'Guide', 'Community', 'Supporto'],
    legalLinks: ['Privacy', 'Termini di Servizio', 'Cookie Policy', 'GDPR', 'Sicurezza'],
    rights: 'Tutti i diritti riservati.',
    operational: 'Tutti i sistemi operativi',
  },
  auth: {
    createAccount: 'Crea il tuo account',
    welcomeBack: 'Bentornato',
    signUpSubtitle: 'Registrati per iniziare con Nexus',
    signInSubtitle: 'Accedi per visualizzare la tua dashboard',
    fullName: 'Nome Completo',
    fullNamePlaceholder: 'Mario Rossi',
    email: 'Email',
    emailPlaceholder: 'tu@esempio.com',
    password: 'Password',
    creatingAccount: 'Creazione account...',
    signingIn: 'Accesso in corso...',
    createAccountBtn: 'Crea Account',
    signInBtn: 'Accedi',
    alreadyHaveAccount: 'Hai già un account?',
    dontHaveAccount: 'Non hai un account?',
    signInLink: 'Accedi',
    signUpLink: 'Registrati',
    nameRequired: 'Inserisci il tuo nome completo.',
    passwordTooShort: 'La password deve essere di almeno 6 caratteri.',
    unexpectedError: 'Si è verificato un errore imprevisto. Riprova.',
  },
  registration: {
    createAccount: 'Crea il tuo account',
    authPrompt: 'Registrati o accedi per completare la registrazione per il piano',
    selectedPlan: 'Piano Selezionato',
    completePurchase: 'Completa il tuo acquisto',
    signingUpFor: 'Ti stai iscrivendo al piano',
    plan: '',
    billingCycle: 'Ciclo di fatturazione',
    monthly: 'Mensile',
    accountEmail: 'Email dell\'account',
    totalToday: 'Totale da pagare oggi',
    securedByPaypal:
      'Protetto da PayPal — le tue informazioni di pagamento sono crittografate e protette.',
    loadingCheckout: 'Caricamento del checkout sicuro...',
    termsNotice:
      'Completando questo acquisto, accetti i nostri Termini di Servizio e la Privacy Policy. Cancella in qualsiasi momento. Garanzia di rimborso di 30 giorni.',
    processing: 'Elaborazione del pagamento...',
    processingDesc:
      'Attendi mentre elaboriamo in modo sicuro il tuo pagamento PayPal e configuriamo il tuo account. Non chiudere questa finestra.',
    success: 'Benvenuto in Nexus!',
    successDesc:
      'La tua registrazione è completa. Il tuo piano è ora attivo. Reindirizzamento alla dashboard...',
    loadingDashboard: 'Caricamento della dashboard...',
    paymentFailed: 'Pagamento fallito',
    paymentFailedDesc:
      'Si è verificato un errore durante l\'elaborazione del pagamento. Riprova.',
    tryAgain: 'Riprova',
    paypalNotConfigured:
      'PayPal non è configurato. Imposta VITE_PAYPAL_CLIENT_ID nelle variabili d\'ambiente per abilitare i pagamenti.',
    paypalLoadError: 'Impossibile caricare il sistema di pagamento PayPal.',
    paypalError: 'Si è verificato un errore PayPal. Riprova.',
    paymentCancelled: 'Il pagamento è stato annullato. Puoi riprovare quando sei pronto.',
    paymentProcessingFailed: 'Elaborazione del pagamento fallita.',
    renderError: 'Impossibile renderizzare i pulsanti PayPal. Aggiorna e riprova.',
    initError: 'Impossibile inizializzare il pagamento PayPal.',
  },
  dashboard: {
    backToSite: 'Torna al sito',
    welcome: 'Bentornato',
    manageSubs: 'Gestisci i tuoi abbonamenti e i dettagli dell\'account.',
    activePlans: 'Piani Attivi',
    completedPayments: 'Pagamenti Completati',
    totalSpent: 'Totale Speso',
    yourRegistrations: 'Le tue Registrazioni',
    noRegistrations: 'Non hai ancora nessuna registrazione.',
    browsePlans: 'Vedi i Piani',
    planSuffix: 'Piano',
    registeredOn: 'Registrato il',
    completed: 'Completato',
    pending: 'In attesa',
    failed: 'Fallito',
    signOut: 'Esci',
    locale: 'it-IT',
  },
};

export default it;
