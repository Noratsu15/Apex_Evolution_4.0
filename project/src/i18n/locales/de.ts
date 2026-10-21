import type { Translations } from '../types';

const de: Translations = {
  nav: {
    features: 'Funktionen',
    pricing: 'Preise',
    howItWorks: 'So funktioniert\'s',
    faq: 'FAQ',
    dashboard: 'Dashboard',
    signOut: 'Abmelden',
    signIn: 'Anmelden',
    getStarted: 'Loslegen',
  },
  hero: {
    badge: 'Jetzt in öffentlicher Beta — schließen Sie sich 12.000+ frühen Nutzern an',
    headline1: 'Bauen, ausliefern und skalieren',
    headline2: 'schneller als je zuvor',
    subtext:
      'Die All-in-One-Plattform, die Teams hilft, ihre Produkte selbstbewusst zu entwerfen, bereitzustellen und zu verwalten. Starten Sie heute mit einer 30-tägigen risikofreien Garantie.',
    ctaPrimary: 'Kostenlos starten',
    ctaPrimaryUser: 'Zum Dashboard',
    ctaSecondary: 'Demo ansehen',
    trust1: 'Keine Kreditkarte erforderlich',
    trust2: '30-Tage-Geld-zurück-Garantie',
    trust3: 'Jederzeit kündbar',
  },
  features: {
    label: 'Funktionen',
    title: 'Alles, was Sie für Erfolg benötigen',
    subtitle:
      'Leistungsstarke Funktionen, die Ihren Arbeitsfluss rationalisieren und Ihr Wachstum beschleunigen.',
    items: [
      {
        title: 'Blitzschnell',
        description:
          'Optimierte Infrastruktur liefert weltweit Antwortzeiten unter 100 ms. Ihre Nutzer warten nie.',
      },
      {
        title: 'Enterprise-Sicherheit',
        description:
          'SOC 2 Type II-konform mit Ende-zu-Ende-Verschlüsselung, SSO und granularen Zugriffssteuerungen.',
      },
      {
        title: 'Echtzeit-Analytics',
        description:
          'Verfolgen Sie jede wichtige Metrik mit schönen Dashboards und automatisierten Insight-Berichten.',
      },
      {
        title: 'Globales CDN',
        description:
          'Edge-bereitgestellt in über 200 Standorten weltweit. Ihre Inhalte sind immer nah an Ihren Nutzern.',
      },
      {
        title: 'Nahtlose CI/CD',
        description:
          'Verbinden Sie Ihr Git-Repo und deployen Sie automatisch bei jedem Push. Preview-Branches und Rollbacks inklusive.',
      },
      {
        title: '24/7-Überwachung',
        description:
          'Proaktive Uptime-Überwachung mit sofortigen Warnungen. Unser Team löst Probleme, bevor Sie sie bemerken.',
      },
    ],
  },
  howItWorks: {
    label: 'So funktioniert\'s',
    title: 'Starten Sie in 3 einfachen Schritten',
    subtitle:
      'Von der Anmeldung bis zum Launch in unter 5 Minuten. Keine technischen Kenntnisse erforderlich.',
    steps: [
      {
        title: 'Wählen Sie Ihren Plan',
        description:
          'Wählen Sie den Plan, der zu Ihren Bedürfnissen passt. Vergleichen Sie Funktionen und Preise Seite an Seite und wählen Sie mit einem Klick.',
      },
      {
        title: 'Registrieren & Zahlen',
        description:
          'Erstellen Sie Ihr Konto in Sekunden und schließen Sie die Zahlung sicher über PayPal ab. Ihr Platz wird sofort reserviert.',
      },
      {
        title: 'Starten & Wachsen',
        description:
          'Greifen Sie auf Ihr Dashboard zu, verbinden Sie Ihre Tools und beginnen Sie zu bauen. Unser Team unterstützt Sie bei jedem Schritt.',
      },
    ],
  },
  pricing: {
    label: 'Preise',
    title: 'Einfache, transparente Preise',
    subtitle:
      'Wählen Sie den richtigen Plan für sich. Alle Pläne enthalten eine 30-Tage-Geld-zurück-Garantie.',
    perMonth: '/Monat',
    mostPopular: 'Beliebteste',
    getStarted: 'Loslegen',
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Alles, was Sie brauchen, um Ihr erstes Projekt zu starten.',
        features: [
          'Bis zu 3 Projekte',
          '5 GB Speicher',
          'Community-Support',
          'Basis-Analytics-Dashboard',
          'E-Mail-Benachrichtigungen',
        ],
      },
      pro: {
        name: 'Pro',
        tagline: 'Für wachsende Teams, die mehr Leistung und Flexibilität benötigen.',
        features: [
          'Bis zu 25 Projekte',
          '50 GB Speicher',
          'Priority-Support (24h)',
          'Erweiterte Analytics & Berichte',
          'Custom-Domain-Unterstützung',
          'Team-Kollaboration (5 Sitze)',
          'API-Zugriff',
        ],
      },
      business: {
        name: 'Business',
        tagline: 'Enterprise-Infrastruktur mit dediziertem Support.',
        features: [
          'Unbegrenzte Projekte',
          '500 GB Speicher',
          'Dedizierter Account-Manager',
          'Echtzeit-Analytics & SLA',
          'White-Label-Branding',
          'Team-Kollaboration (unbegrenzt)',
          'Voller API-Zugriff & Webhooks',
          'SSO & erweiterte Sicherheit',
        ],
      },
    },
  },
  testimonials: {
    label: 'Referenzen',
    title: 'Von Teams weltweit geliebt',
    items: [
      {
        name: 'Sarah Chen',
        role: 'CTO, TechFlow',
        content:
          'Nexus hat unsere Deployment-Pipeline transformiert. Was früher Wochen dauerte, dauert jetzt Minuten. Das Analytics-Dashboard allein hat das Zehnfache des Abonnements eingebracht.',
      },
      {
        name: 'Marcus Rodriguez',
        role: 'Gründer, DevHub',
        content:
          'Die Benutzerfreundlichkeit ist unübertroffen. Unser Team war an einem einzigen Nachmittag einsatzbereit. Der PayPal-Checkout war auch für unsere Kunden nahtlos.',
      },
      {
        name: 'Aisha Patel',
        role: 'Lead Engineer, CloudNine',
        content:
          'Ich habe jede Plattform ausprobiert. Nexus ist die einzige, die Leistung mit Einfachheit kombiniert. Das globale CDN ist unglaublich schnell.',
      },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Häufig gestellte Fragen',
    items: [
      {
        question: 'Wie funktioniert die 30-Tage-Geld-zurück-Garantie?',
        answer:
          'Wenn Sie innerhalb von 30 Tagen nach Ihrem Kauf nicht zufrieden sind, kontaktieren Sie unser Support-Team und wir erstatten Ihnen den vollen Betrag — ohne Rückfragen. Ihre Zufriedenheit ist unsere Priorität.',
      },
      {
        question: 'Kann ich meinen Plan später ändern?',
        answer:
          'Absolut. Sie können Ihren Plan jederzeit über Ihr Dashboard ändern. Upgrades werden sofort wirksam, Downgrades gelten zu Beginn Ihres nächsten Abrechnungszyklus.',
      },
      {
        question: 'Sind meine Zahlungsinformationen sicher?',
        answer:
          'Ja. Alle Zahlungen werden über PayPal abgewickelt, das branchenführende Verschlüsselung und Betrugsschutz einsetzt. Wir speichern nie Ihre Kreditkartendetails auf unseren Servern.',
      },
      {
        question: 'Bieten Sie Team- oder Enterprise-Rabatte an?',
        answer:
          'Ja. Für Teams mit mehr als 10 Personen oder Enterprise-Kunden wenden Sie sich an unser Vertriebsteam für individuelle Preise und dedizierte Support-Pakete.',
      },
      {
        question: 'Welche Zahlungsmethoden akzeptieren Sie?',
        answer:
          'Wir akzeptieren PayPal und alle gängigen Kreditkarten über den PayPal-Checkout. Dazu gehören Visa, Mastercard, American Express und Discover.',
      },
    ],
  },
  cta: {
    title: 'Bereit, etwas Großartiges zu bauen?',
    subtitle:
      'Schließen Sie sich Tausenden von Teams an, die bereits Nexus nutzen, um schneller auszuliefern. Starten Sie noch heute Ihre kostenlose Testversion — keine Kreditkarte erforderlich.',
    button: 'Kostenlose Testversion starten',
  },
  footer: {
    description:
      'Die All-in-One-Plattform zum Bauen, Ausliefern und Skalieren Ihrer Produkte mit Vertrauen.',
    product: 'Produkt',
    company: 'Unternehmen',
    resources: 'Ressourcen',
    legal: 'Rechtliches',
    productLinks: ['Funktionen', 'Preise', 'Changelog', 'Roadmap', 'Status'],
    companyLinks: ['Über uns', 'Blog', 'Karriere', 'Presse', 'Kontakt'],
    resourcesLinks: ['Dokumentation', 'API-Referenz', 'Leitfäden', 'Community', 'Support'],
    legalLinks: ['Datenschutz', 'Nutzungsbedingungen', 'Cookie-Richtlinie', 'DSGVO', 'Sicherheit'],
    rights: 'Alle Rechte vorbehalten.',
    operational: 'Alle Systeme betriebsbereit',
  },
  auth: {
    createAccount: 'Konto erstellen',
    welcomeBack: 'Willkommen zurück',
    signUpSubtitle: 'Registrieren Sie sich, um mit Nexus zu starten',
    signInSubtitle: 'Melden Sie sich an, um auf Ihr Dashboard zuzugreifen',
    fullName: 'Vollständiger Name',
    fullNamePlaceholder: 'Max Mustermann',
    email: 'E-Mail',
    emailPlaceholder: 'sie@beispiel.com',
    password: 'Passwort',
    creatingAccount: 'Konto wird erstellt...',
    signingIn: 'Anmeldung...',
    createAccountBtn: 'Konto erstellen',
    signInBtn: 'Anmelden',
    alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
    dontHaveAccount: 'Kein Konto vorhanden?',
    signInLink: 'Anmelden',
    signUpLink: 'Registrieren',
    nameRequired: 'Bitte geben Sie Ihren vollständigen Namen ein.',
    passwordTooShort: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
    unexpectedError: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  },
  registration: {
    createAccount: 'Konto erstellen',
    authPrompt: 'Registrieren oder melden Sie sich an, um Ihre Registrierung für den Plan abzuschließen',
    selectedPlan: 'Gewählter Plan',
    completePurchase: 'Schließen Sie Ihren Kauf ab',
    signingUpFor: 'Sie melden sich für den Plan an',
    plan: '',
    billingCycle: 'Abrechnungszyklus',
    monthly: 'Monatlich',
    accountEmail: 'Konto-E-Mail',
    totalToday: 'Heute fällig',
    securedByPaypal:
      'Gesichert durch PayPal — Ihre Zahlungsinformationen sind verschlüsselt und geschützt.',
    loadingCheckout: 'Sicherer Checkout wird geladen...',
    termsNotice:
      'Mit Abschluss dieses Kaufs stimmen Sie unseren Nutzungsbedingungen und der Datenschutzrichtlinie zu. Jederzeit kündbar. 30-Tage-Geld-zurück-Garantie.',
    processing: 'Zahlung wird verarbeitet...',
    processingDesc:
      'Bitte warten Sie, während wir Ihre PayPal-Zahlung sicher verarbeiten und Ihr Konto einrichten. Schließen Sie dieses Fenster nicht.',
    success: 'Willkommen bei Nexus!',
    successDesc:
      'Ihre Registrierung ist abgeschlossen. Ihr Plan ist jetzt aktiv. Weiterleitung zu Ihrem Dashboard...',
    loadingDashboard: 'Dashboard wird geladen...',
    paymentFailed: 'Zahlung fehlgeschlagen',
    paymentFailedDesc:
      'Bei der Verarbeitung Ihrer Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    tryAgain: 'Erneut versuchen',
    paypalNotConfigured:
      'PayPal ist nicht konfiguriert. Setzen Sie VITE_PAYPAL_CLIENT_ID in Ihren Umgebungsvariablen, um Zahlungen zu aktivieren.',
    paypalLoadError: 'Laden des PayPal-Zahlsystems fehlgeschlagen.',
    paypalError: 'Ein PayPal-Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    paymentCancelled: 'Die Zahlung wurde abgebrochen. Sie können es erneut versuchen, wenn Sie bereit sind.',
    paymentProcessingFailed: 'Zahlungsverarbeitung fehlgeschlagen.',
    renderError: 'PayPal-Schaltflächen konnten nicht gerendert werden. Aktualisieren Sie und versuchen Sie es erneut.',
    initError: 'PayPal-Zahlung konnte nicht initialisiert werden.',
  },
  dashboard: {
    backToSite: 'Zurück zur Seite',
    welcome: 'Willkommen zurück',
    manageSubs: 'Verwalten Sie Ihre Abonnements und Kontodetails.',
    activePlans: 'Aktive Pläne',
    completedPayments: 'Abgeschlossene Zahlungen',
    totalSpent: 'Gesamtausgaben',
    yourRegistrations: 'Ihre Registrierungen',
    noRegistrations: 'Sie haben noch keine Registrierungen.',
    browsePlans: 'Pläne ansehen',
    planSuffix: 'Plan',
    registeredOn: 'Registriert am',
    completed: 'Abgeschlossen',
    pending: 'Ausstehend',
    failed: 'Fehlgeschlagen',
    signOut: 'Abmelden',
    locale: 'de-DE',
  },
  referrals: {
    tabActivations: 'Meine Aktivierungen',
    tabReferrals: 'Empfehlungen',
    title: 'Empfehlungen',
    subtitleAll: 'Verfolge die Empfehlungen jedes Leaders der Mutterlinie.',
    subtitleOwn: 'Verfolge die Personen, die über deinen Link beigetreten sind.',
    motherLine: 'Mutterlinie',
    yourLink: 'Dein Empfehlungslink',
    copyLink: 'Link kopieren',
    copied: 'Kopiert',
    totalReferrals: 'Empfehlungen gesamt',
    activated: 'Aktiviert',
    notActivated: 'Noch nicht aktiviert',
    revenue: 'Erzielter Umsatz',
    searchPlaceholder: 'Nach Name oder E-Mail suchen',
    allLeaders: 'Alle Leader',
    allStatuses: 'Alle Status',
    colReferral: 'Empfohlen',
    colLeader: 'Leader',
    colPlan: 'Tarif',
    colStatus: 'Status',
    colDate: 'Beigetreten',
    statusNone: 'Registriert',
    noReferrals: 'Noch keine Empfehlungen.',
    noReferralsHint: 'Teile deinen Link, um dein Team aufzubauen.',
    noResults: 'Keine Empfehlungen entsprechen den Filtern.',
    loadError: 'Empfehlungen konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    roleFounder: 'Gründerin & Mentorin',
    roleMentor: 'Mentorin',
    roleLeader: 'Leader',
    invitedBy: 'Eingeladen von',
    dismiss: 'Schließen',
  },
};

export default de;
