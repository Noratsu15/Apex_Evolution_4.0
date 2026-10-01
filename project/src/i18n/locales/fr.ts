import type { Translations } from '../types';

const fr: Translations = {
  nav: {
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    howItWorks: 'Comment ça marche',
    faq: 'FAQ',
    dashboard: 'Tableau de bord',
    signOut: 'Déconnexion',
    signIn: 'Connexion',
    getStarted: 'Commencer',
  },
  hero: {
    badge: 'Maintenant en bêta publique — rejoignez plus de 12 000 utilisateurs',
    headline1: 'Construisez, lancez et évoluez',
    headline2: 'plus vite que jamais',
    subtext:
      "La plateforme tout-en-un qui aide les équipes à concevoir, déployer et gérer leurs produits en toute confiance. Commencez votre parcours aujourd'hui avec une garantie sans risque de 30 jours.",
    ctaPrimary: 'Commencer Gratuitement',
    ctaPrimaryUser: 'Aller au Tableau de bord',
    ctaSecondary: 'Voir la Démo',
    trust1: 'Aucune carte de crédit requise',
    trust2: 'Garantie de remboursement de 30 jours',
    trust3: 'Annulez à tout moment',
  },
  features: {
    label: 'Fonctionnalités',
    title: 'Tout ce dont vous avez besoin pour réussir',
    subtitle:
      'Des fonctionnalités puissantes conçues pour rationaliser votre flux de travail et accélérer votre croissance.',
    items: [
      {
        title: 'Vitesse Éclair',
        description:
          "Infrastructure optimisée offrant des temps de réponse inférieurs à 100 ms dans le monde entier. Vos utilisateurs n'attendent jamais.",
      },
      {
        title: 'Sécurité Entreprise',
        description:
          "Conforme SOC 2 Type II avec chiffrement de bout en bout, SSO et contrôles d'accès granulaires intégrés.",
      },
      {
        title: 'Analyse en Temps Réel',
        description:
          'Suivez chaque métrique importante avec de beaux tableaux de bord et des rapports d\'analyse automatisés.',
      },
      {
        title: 'CDN Global',
        description:
          'Déployé en périphérie dans plus de 200 emplacements dans le monde. Votre contenu est toujours proche de vos utilisateurs.',
      },
      {
        title: 'CI/CD Sans Effort',
        description:
          'Connectez votre dépôt Git et déployez automatiquement à chaque push. Aperçu des branches et rollbacks inclus.',
      },
      {
        title: 'Surveillance 24/7',
        description:
          "Surveillance proactive du temps de fonctionnement avec alertes instantanées. Notre équipe résout les problèmes avant que vous ne les remarquiez.",
      },
    ],
  },
  howItWorks: {
    label: 'Comment ça marche',
    title: 'Commencez en 3 étapes simples',
    subtitle:
      "De l'inscription au lancement en moins de 5 minutes. Aucune expertise technique requise.",
    steps: [
      {
        title: 'Choisissez Votre Plan',
        description:
          'Choisissez le plan qui correspond à vos besoins. Comparez les fonctionnalités et les prix côte à côte, et sélectionnez en un clic.',
      },
      {
        title: 'Inscrivez-vous et Payez',
        description:
          'Créez votre compte en quelques secondes et complétez le paiement en toute sécurité via PayPal. Votre place est réservée instantanément.',
      },
      {
        title: 'Lancez et Développez',
        description:
          'Accédez à votre tableau de bord, connectez vos outils et commencez à construire. Notre équipe est là pour vous accompagner à chaque étape.',
      },
    ],
  },
  pricing: {
    label: 'Tarifs',
    title: 'Des prix simples et transparents',
    subtitle:
      'Choisissez le plan qui vous convient. Tous les plans incluent une garantie de remboursement de 30 jours.',
    perMonth: '/mois',
    mostPopular: 'Le Plus Populaire',
    getStarted: 'Commencer',
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Tout ce dont vous avez besoin pour lancer votre premier projet.',
        features: [
          'Jusqu\'à 3 projets',
          '5 Go de stockage',
          'Support communautaire',
          'Tableau de bord d\'analyse de base',
          'Notifications par email',
        ],
      },
      pro: {
        name: 'Pro',
        tagline: 'Pour les équipes en croissance qui ont besoin de plus de puissance et de flexibilité.',
        features: [
          'Jusqu\'à 25 projets',
          '50 Go de stockage',
          'Support prioritaire (24h)',
          'Analyses et rapports avancés',
          'Support de domaine personnalisé',
          'Collaboration d\'équipe (5 sièges)',
          'Accès API',
        ],
      },
      business: {
        name: 'Business',
        tagline: 'Infrastructure de niveau entreprise avec support dédié.',
        features: [
          'Projets illimités',
          '500 Go de stockage',
          'Gestionnaire de compte dédié',
          'Analyses en temps réel et SLA',
          'Marque blanche',
          'Collaboration d\'équipe (illimitée)',
          'Accès API complet et webhooks',
          'SSO et sécurité avancée',
        ],
      },
    },
  },
  testimonials: {
    label: 'Témoignages',
    title: 'Adoré par les équipes du monde entier',
    items: [
      {
        name: 'Sarah Chen',
        role: 'CTO, TechFlow',
        content:
          "Nexus a transformé notre pipeline de déploiement. Ce qui prenait des semaines prend maintenant des minutes. Le tableau de bord d'analyse à lui seul a rapporté dix fois le prix de l'abonnement.",
      },
      {
        name: 'Marcus Rodriguez',
        role: 'Fondateur, DevHub',
        content:
          "La facilité d'utilisation est inégalée. Notre équipe était opérationnelle en un seul après-midi. Le paiement PayPal a également été fluide pour nos clients.",
      },
      {
        name: 'Aisha Patel',
        role: 'Ingénieure Principale, CloudNine',
        content:
          "J'ai essayé toutes les plateformes existantes. Nexus est la seule qui combine puissance et simplicité. Le CDN global est incroyablement rapide.",
      },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Questions fréquemment posées',
    items: [
      {
        question: 'Comment fonctionne la garantie de remboursement de 30 jours ?',
        answer:
          "Si vous n'êtes pas satisfait dans les 30 jours suivant votre achat, contactez notre équipe de support et nous vous rembourserons intégralement, sans poser de questions. Votre satisfaction est notre priorité.",
      },
      {
        question: 'Puis-je changer de plan plus tard ?',
        answer:
          'Absolument. Vous pouvez changer de plan à tout moment depuis votre tableau de bord. Les mises à niveau prennent effet immédiatement, et les rétrogradations s\'appliquent au début de votre prochain cycle de facturation.',
      },
      {
        question: 'Mes informations de paiement sont-elles sécurisées ?',
        answer:
          "Oui. Tous les paiements sont traités via PayPal, qui utilise un chiffrement et une protection contre la fraude de pointe. Nous ne stockons jamais les détails de votre carte de crédit sur nos serveurs.",
      },
      {
        question: 'Proposez-vous des remises pour les équipes ou les entreprises ?',
        answer:
          'Oui. Pour les équipes de plus de 10 personnes ou les clients entreprise, contactez notre équipe commerciale pour des tarifs personnalisés et des offres de support dédié.',
      },
      {
        question: 'Quels modes de paiement acceptez-vous ?',
        answer:
          'Nous acceptons PayPal et toutes les principales cartes de crédit via le paiement PayPal. Cela inclut Visa, Mastercard, American Express et Discover.',
      },
    ],
  },
  cta: {
    title: 'Prêt à construire quelque chose de grand ?',
    subtitle:
      "Rejoignez des milliers d'équipes qui utilisent déjà Nexus pour lancer plus vite. Commencez votre essai gratuit aujourd'hui — aucune carte de crédit requise.",
    button: 'Commencer l\'Essai Gratuit',
  },
  footer: {
    description:
      'La plateforme tout-en-un pour construire, lancer et faire évoluer vos produits en toute confiance.',
    product: 'Produit',
    company: 'Entreprise',
    resources: 'Ressources',
    legal: 'Mentions légales',
    productLinks: ['Fonctionnalités', 'Tarifs', 'Changelog', 'Feuille de route', 'Statut'],
    companyLinks: ['À propos', 'Blog', 'Carrières', 'Presse', 'Contact'],
    resourcesLinks: ['Documentation', 'Référence API', 'Guides', 'Communauté', 'Support'],
    legalLinks: ['Politique de confidentialité', 'Conditions d\'utilisation', 'Politique de cookies', 'RGPD', 'Sécurité'],
    rights: 'Tous droits réservés.',
    operational: 'Tous les systèmes sont opérationnels',
  },
  auth: {
    createAccount: 'Créez votre compte',
    welcomeBack: 'Bon retour',
    signUpSubtitle: 'Inscrivez-vous pour commencer avec Nexus',
    signInSubtitle: 'Connectez-vous pour accéder à votre tableau de bord',
    fullName: 'Nom complet',
    fullNamePlaceholder: 'Jean Dupont',
    email: 'Email',
    emailPlaceholder: 'vous@exemple.com',
    password: 'Mot de passe',
    creatingAccount: 'Création du compte...',
    signingIn: 'Connexion...',
    createAccountBtn: 'Créer un compte',
    signInBtn: 'Se connecter',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    dontHaveAccount: "Vous n'avez pas de compte ?",
    signInLink: 'Se connecter',
    signUpLink: 'S\'inscrire',
    nameRequired: 'Veuillez saisir votre nom complet.',
    passwordTooShort: 'Le mot de passe doit comporter au moins 6 caractères.',
    unexpectedError: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
  },
  registration: {
    createAccount: 'Créez votre compte',
    authPrompt: 'Inscrivez-vous ou connectez-vous pour finaliser votre inscription au plan',
    selectedPlan: 'Plan sélectionné',
    completePurchase: 'Finalisez votre achat',
    signingUpFor: 'Vous vous inscrivez au plan',
    plan: '',
    billingCycle: 'Cycle de facturation',
    monthly: 'Mensuel',
    accountEmail: 'Email du compte',
    totalToday: 'Total à payer aujourd\'hui',
    securedByPaypal:
      'Sécurisé par PayPal — vos informations de paiement sont chiffrées et protégées.',
    loadingCheckout: 'Chargement du paiement sécurisé...',
    termsNotice:
      'En finalisant cet achat, vous acceptez nos Conditions d\'utilisation et notre Politique de confidentialité. Annulez à tout moment. Garantie de remboursement de 30 jours.',
    processing: 'Traitement de votre paiement...',
    processingDesc:
      'Veuillez patienter pendant que nous traitons sécuritairement votre paiement PayPal et configurons votre compte. Ne fermez pas cette fenêtre.',
    success: 'Bienvenue sur Nexus !',
    successDesc:
      'Votre inscription est terminée. Votre plan est maintenant actif. Redirection vers votre tableau de bord...',
    loadingDashboard: 'Chargement du tableau de bord...',
    paymentFailed: 'Paiement échoué',
    paymentFailedDesc:
      'Une erreur s\'est produite lors du traitement de votre paiement. Veuillez réessayer.',
    tryAgain: 'Réessayer',
    paypalNotConfigured:
      'PayPal n\'est pas configuré. Définissez VITE_PAYPAL_CLIENT_ID dans vos variables d\'environnement pour activer les paiements.',
    paypalLoadError: 'Échec du chargement du système de paiement PayPal.',
    paypalError: 'Une erreur PayPal s\'est produite. Veuillez réessayer.',
    paymentCancelled: 'Le paiement a été annulé. Vous pouvez réessayer quand vous êtes prêt.',
    paymentProcessingFailed: 'Le traitement du paiement a échoué.',
    renderError: 'Échec de l\'affichage des boutons PayPal. Rafraîchissez et réessayez.',
    initError: 'Échec de l\'initialisation du paiement PayPal.',
  },
  dashboard: {
    backToSite: 'Retour au site',
    welcome: 'Bon retour',
    manageSubs: 'Gérez vos abonnements et les détails de votre compte.',
    activePlans: 'Plans Actifs',
    completedPayments: 'Paiements Terminés',
    totalSpent: 'Total Dépensé',
    yourRegistrations: 'Vos Inscriptions',
    noRegistrations: 'Vous n\'avez pas encore d\'inscription.',
    browsePlans: 'Voir les Plans',
    planSuffix: 'Plan',
    registeredOn: 'Inscrit le',
    completed: 'Terminé',
    pending: 'En attente',
    failed: 'Échoué',
    signOut: 'Déconnexion',
    locale: 'fr-FR',
  },
};

export default fr;
