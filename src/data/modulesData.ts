import ecommerceImage from 'figma:asset/ef1de2d394b8cd8dc9cb9cf5276c1f07a6bf014c.png';
import adsImage from 'figma:asset/933eaa9cda2c28e15aeb5e2d30a0f55930b237e8.png';
import seoImage from 'figma:asset/25601bea57de09978e36384f75be3733c9a3a805.png';
import iaImage from 'figma:asset/57e98f4ab891889527270818600f25c01460be01.png';
import brandingImage from 'figma:asset/1da7e84aa520c154edbe511fb00866cd1c7d508a.png';

export const detailedModules = [
  {
    id: 'ecommerce',
    title: 'E-commerce Mastery',
    subtitle: 'Créez et optimisez votre boutique en ligne',
    category: 'ecom',
    level: 'Confirmé' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 15,
    duration: '8h 30min',
    thumbnail: ecommerceImage,
    description: 'Apprenez à créer, gérer et optimiser une boutique e-commerce performante. De la conception à la vente, maîtrisez tous les aspects du commerce électronique.',
    keyPoints: [
      'Configuration complète Shopify/WooCommerce',
      'Stratégies de conversion avancées',
      'Automatisation des ventes',
      'Analyse des performances',
      'Scaling et croissance'
    ],
    lessons: [
      { id: '1', title: 'Introduction au E-commerce', duration: '25min', isCompleted: false },
      { id: '2', title: 'Choisir sa plateforme', duration: '35min', isCompleted: false },
      { id: '3', title: 'Design et UX de boutique', duration: '45min', isCompleted: false },
      { id: '4', title: 'Catalogue produits optimisé', duration: '40min', isCompleted: false },
      { id: '5', title: 'Stratégies de prix', duration: '30min', isCompleted: false },
      { id: '6', title: 'Tunnel de conversion', duration: '50min', isCompleted: false },
      { id: '7', title: 'Paiement et sécurité', duration: '35min', isCompleted: false },
      { id: '8', title: 'Logistique et expédition', duration: '40min', isCompleted: false },
      { id: '9', title: 'Marketing digital e-commerce', duration: '55min', isCompleted: false },
      { id: '10', title: 'Retention clients', duration: '45min', isCompleted: false },
      { id: '11', title: 'Analytics et KPIs', duration: '40min', isCompleted: false },
      { id: '12', title: 'Automatisation avancée', duration: '50min', isCompleted: false },
      { id: '13', title: 'Scaling international', duration: '45min', isCompleted: false },
      { id: '14', title: 'Marketplace et multicanal', duration: '40min', isCompleted: false },
      { id: '15', title: 'Projet final et certification', duration: '60min', isCompleted: false }
    ],
    instructor: {
      name: 'Marie Dubois',
      title: 'E-commerce Strategist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      experience: '8 ans d\'expérience'
    }
  },
  {
    id: 'ads',
    title: 'Publicité Digitale Avancée',
    subtitle: 'Facebook, Google & TikTok Ads Mastery',
    category: 'ads',
    level: 'Expert' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 12,
    duration: '7h 15min',
    thumbnail: adsImage,
    description: 'Maîtrisez les publicités sur toutes les plateformes principales. Apprenez à créer des campagnes performantes qui génèrent un ROI exceptionnel.',
    keyPoints: [
      'Facebook & Instagram Ads avancées',
      'Google Ads et Search Marketing',
      'TikTok Ads et tendances',
      'Optimisation des conversions',
      'Attribution et tracking'
    ],
    lessons: [
      { id: '1', title: 'Écosystème publicitaire digital', duration: '35min', isCompleted: false },
      { id: '2', title: 'Facebook Ads : Setup avancé', duration: '45min', isCompleted: false },
      { id: '3', title: 'Targeting et audiences', duration: '50min', isCompleted: false },
      { id: '4', title: 'Créatifs qui convertissent', duration: '40min', isCompleted: false },
      { id: '5', title: 'Google Ads : Search & Display', duration: '55min', isCompleted: false },
      { id: '6', title: 'Shopping Ads et Performance Max', duration: '45min', isCompleted: false },
      { id: '7', title: 'TikTok Ads et Social Commerce', duration: '40min', isCompleted: false },
      { id: '8', title: 'Attribution et tracking pixels', duration: '35min', isCompleted: false },
      { id: '9', title: 'Optimisation des campagnes', duration: '45min', isCompleted: false },
      { id: '10', title: 'Scaling et budget management', duration: '40min', isCompleted: false },
      { id: '11', title: 'Analytics et reporting', duration: '35min', isCompleted: false },
      { id: '12', title: 'Certification et projets', duration: '50min', isCompleted: false }
    ],
    instructor: {
      name: 'Thomas Bernard',
      title: 'Performance Marketing Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      experience: '10 ans d\'expérience'
    }
  },
  {
    id: 'seo',
    title: 'SEO Technique 2025',
    subtitle: 'Dominez Google avec les dernières techniques',
    category: 'seo',
    level: 'Expert' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 14,
    duration: '9h 45min',
    thumbnail: seoImage,
    description: 'Formation SEO complète et technique pour dominer les résultats de recherche. Techniques white-hat avancées et stratégies de contenu.',
    keyPoints: [
      'SEO technique et Core Web Vitals',
      'Recherche de mots-clés avancée',
      'Link building stratégique',
      'SEO local et international',
      'IA et SEO du futur'
    ],
    lessons: [
      { id: '1', title: 'Fondamentaux SEO 2025', duration: '40min', isCompleted: false },
      { id: '2', title: 'Recherche de mots-clés avancée', duration: '50min', isCompleted: false },
      { id: '3', title: 'SEO technique et crawling', duration: '55min', isCompleted: false },
      { id: '4', title: 'Core Web Vitals et UX', duration: '45min', isCompleted: false },
      { id: '5', title: 'Structure et architecture', duration: '40min', isCompleted: false },
      { id: '6', title: 'Contenu et sémantique', duration: '50min', isCompleted: false },
      { id: '7', title: 'Link building white-hat', duration: '55min', isCompleted: false },
      { id: '8', title: 'SEO local et Google My Business', duration: '40min', isCompleted: false },
      { id: '9', title: 'SEO international', duration: '45min', isCompleted: false },
      { id: '10', title: 'E-commerce SEO spécialisé', duration: '50min', isCompleted: false },
      { id: '11', title: 'Analytics et monitoring', duration: '40min', isCompleted: false },
      { id: '12', title: 'IA et SEO du futur', duration: '45min', isCompleted: false },
      { id: '13', title: 'Audit SEO complet', duration: '50min', isCompleted: false },
      { id: '14', title: 'Certification et projets', duration: '60min', isCompleted: false }
    ],
    instructor: {
      name: 'Sophie Laurent',
      title: 'SEO Technical Expert',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      experience: '12 ans d\'expérience'
    }
  },
  {
    id: 'ia',
    title: 'IA Marketing Avancé',
    subtitle: 'Maîtrisez l\'Intelligence Artificielle pour le Marketing',
    category: 'ia',
    level: 'Confirmé' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 16,
    duration: '10h 20min',
    thumbnail: iaImage,
    description: 'Découvrez comment révolutionner votre marketing avec l\'IA. De ChatGPT aux outils de génération d\'images, maîtrisez toutes les technologies qui transforment le marketing digital.',
    keyPoints: [
      'Automatisation marketing avec l\'IA',
      'ChatGPT et prompting avancé',
      'Génération de contenu automatique',
      'Analyse prédictive et personnalisation',
      'Outils IA pour le visual et vidéo'
    ],
    lessons: [
      { id: '1', title: 'Introduction à l\'IA Marketing', duration: '30min', isCompleted: false },
      { id: '2', title: 'ChatGPT pour le marketing', duration: '45min', isCompleted: false },
      { id: '3', title: 'Prompting et ingénierie de prompts', duration: '50min', isCompleted: false },
      { id: '4', title: 'Génération de contenu automatique', duration: '40min', isCompleted: false },
      { id: '5', title: 'IA pour le copywriting', duration: '45min', isCompleted: false },
      { id: '6', title: 'Génération d\'images avec MidJourney', duration: '55min', isCompleted: false },
      { id: '7', title: 'Création vidéo avec l\'IA', duration: '50min', isCompleted: false },
      { id: '8', title: 'Automatisation des réseaux sociaux', duration: '40min', isCompleted: false },
      { id: '9', title: 'Email marketing automatisé', duration: '45min', isCompleted: false },
      { id: '10', title: 'Chatbots et service client IA', duration: '40min', isCompleted: false },
      { id: '11', title: 'Analyse prédictive des données', duration: '50min', isCompleted: false },
      { id: '12', title: 'Personnalisation à grande échelle', duration: '45min', isCompleted: false },
      { id: '13', title: 'SEO et IA : optimisation future', duration: '40min', isCompleted: false },
      { id: '14', title: 'Éthique et limites de l\'IA', duration: '35min', isCompleted: false },
      { id: '15', title: 'Outils IA avancés du marché', duration: '50min', isCompleted: false },
      { id: '16', title: 'Projet final : Stratégie IA complète', duration: '60min', isCompleted: false }
    ],
    instructor: {
      name: 'Alexandre Martin',
      title: 'AI Marketing Strategist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      experience: '6 ans d\'expérience en IA'
    }
  },
  {
    id: 'branding',
    title: 'Branding Personnel Mastery',
    subtitle: 'Construisez une marque personnelle irrésistible',
    category: 'branding',
    level: 'Débutant' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 13,
    duration: '8h 45min',
    thumbnail: brandingImage,
    description: 'Apprenez à créer et développer une marque personnelle forte qui vous démarque dans votre secteur. De la stratégie aux visuels, maîtrisez tous les aspects du personal branding.',
    keyPoints: [
      'Stratégie de marque personnelle',
      'Identité visuelle et design',
      'Storytelling et narrative',
      'Présence digitale optimisée',
      'Monétisation de votre expertise'
    ],
    lessons: [
      { id: '1', title: 'Fondements du branding personnel', duration: '40min', isCompleted: false },
      { id: '2', title: 'Audit de votre marque actuelle', duration: '35min', isCompleted: false },
      { id: '3', title: 'Définir votre proposition de valeur', duration: '45min', isCompleted: false },
      { id: '4', title: 'Création de votre persona et audience', duration: '50min', isCompleted: false },
      { id: '5', title: 'Storytelling et narrative personnelle', duration: '55min', isCompleted: false },
      { id: '6', title: 'Identité visuelle : logo et couleurs', duration: '45min', isCompleted: false },
      { id: '7', title: 'Photography et image de marque', duration: '40min', isCompleted: false },
      { id: '8', title: 'Optimisation LinkedIn pour le branding', duration: '45min', isCompleted: false },
      { id: '9', title: 'Stratégie content sur les réseaux', duration: '50min', isCompleted: false },
      { id: '10', title: 'Personal website et portfolio', duration: '45min', isCompleted: false },
      { id: '11', title: 'Networking et relations publiques', duration: '40min', isCompleted: false },
      { id: '12', title: 'Monétisation et business model', duration: '50min', isCompleted: false },
      { id: '13', title: 'Projet final : Lancement de marque', duration: '65min', isCompleted: false }
    ],
    instructor: {
      name: 'Emma Rodriguez',
      title: 'Personal Branding Expert',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      experience: '9 ans en marketing personnel'
    }
  },
  {
    id: 'copywriting',
    title: 'Copywriting Émotionnel Mastery',
    subtitle: 'Vendez avec les mots qui touchent',
    category: 'copywriting',
    level: 'Confirmé' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 11,
    duration: '7h 30min',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop',
    description: 'Maîtrisez l\'art du copywriting persuasif qui génère des ventes. Apprenez les techniques psychologiques et émotionnelles qui transforment les mots en résultats.',
    keyPoints: [
      'Psychologie de la persuasion',
      'Copywriting pour les ventes',
      'Email marketing avancé',
      'Landing pages qui convertissent',
      'Storytelling commercial'
    ],
    lessons: [
      { id: '1', title: 'Principes de persuasion appliqués', duration: '45min', isCompleted: false },
      { id: '2', title: 'Psychologie du consommateur', duration: '50min', isCompleted: false },
      { id: '3', title: 'Headlines qui accrochent', duration: '40min', isCompleted: false },
      { id: '4', title: 'Storytelling pour vendre', duration: '55min', isCompleted: false },
      { id: '5', title: 'Pages de vente haute conversion', duration: '60min', isCompleted: false },
      { id: '6', title: 'Email sequences automatisées', duration: '45min', isCompleted: false },
      { id: '7', title: 'Copywriting pour les réseaux sociaux', duration: '40min', isCompleted: false },
      { id: '8', title: 'Scripts de vente en face à face', duration: '35min', isCompleted: false },
      { id: '9', title: 'Objections et réponses types', duration: '40min', isCompleted: false },
      { id: '10', title: 'Tests A/B de copy', duration: '35min', isCompleted: false },
      { id: '11', title: 'Portfolio et tarification copy', duration: '45min', isCompleted: false }
    ],
    instructor: {
      name: 'Julien Moreau',
      title: 'Copywriter Expert',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experience: '7 ans en copywriting'
    }
  },
  {
    id: 'analytics',
    title: 'Analytics Avancées Mastery',
    subtitle: 'Google Analytics 4 & Data-Driven Marketing',
    category: 'analytics',
    level: 'Expert' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 12,
    duration: '8h 15min',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    description: 'Maîtrisez Google Analytics 4 et les outils d\'analyse avancés pour prendre des décisions marketing basées sur les données et optimiser vos performances.',
    keyPoints: [
      'Google Analytics 4 complet',
      'Google Tag Manager avancé',
      'Tableaux de bord et reporting',
      'Attribution et conversion tracking',
      'Data Studio et visualisation'
    ],
    lessons: [
      { id: '1', title: 'Migration vers GA4', duration: '45min', isCompleted: false },
      { id: '2', title: 'Configuration avancée GA4', duration: '55min', isCompleted: false },
      { id: '3', title: 'Events et conversions personnalisés', duration: '50min', isCompleted: false },
      { id: '4', title: 'Google Tag Manager mastery', duration: '60min', isCompleted: false },
      { id: '5', title: 'Audiences et segments avancés', duration: '45min', isCompleted: false },
      { id: '6', title: 'Attribution modeling', duration: '40min', isCompleted: false },
      { id: '7', title: 'E-commerce tracking complet', duration: '50min', isCompleted: false },
      { id: '8', title: 'Rapports personnalisés et explorations', duration: '45min', isCompleted: false },
      { id: '9', title: 'Google Data Studio avancé', duration: '55min', isCompleted: false },
      { id: '10', title: 'Intégrations et APIs', duration: '40min', isCompleted: false },
      { id: '11', title: 'GDPR et privacy compliance', duration: '35min', isCompleted: false },
      { id: '12', title: 'Certification et audit analytics', duration: '50min', isCompleted: false }
    ],
    instructor: {
      name: 'Laura Chen',
      title: 'Data Analytics Expert',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      experience: '11 ans en analytics'
    }
  }
];

// Mise à jour des modules existants avec les nouvelles images
export const updatedMockModules = [
  {
    id: '1',
    title: 'IA Marketing Avancé',
    subtitle: 'Étape 1 – InstaMachine',
    category: 'ia',
    level: 'Confirmé' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 8,
    duration: '4h 30min',
    thumbnail: iaImage,
    isPromoted: true,
    promotedBy: 'Alex Digital'
  },
  {
    id: '2',
    title: 'SEO Technique 2025',
    subtitle: 'Dominez Google en 30 jours',
    category: 'seo',
    level: 'Expert' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 12,
    duration: '6h 15min',
    thumbnail: seoImage
  },
  {
    id: '3',
    title: 'E-commerce Automation',
    subtitle: 'Shopify & Dropshipping Pro',
    category: 'ecom',
    level: 'Débutant' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 10,
    duration: '5h 45min',
    thumbnail: ecommerceImage
  },
  {
    id: '4',
    title: 'Copywriting Émotionnel',
    subtitle: 'Vendez avec les mots qui touchent',
    category: 'copywriting',
    level: 'Confirmé' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 7,
    duration: '3h 20min',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop'
  },
  {
    id: '5',
    title: 'Branding Personnel',
    subtitle: 'Créez votre marque personnelle',
    category: 'branding',
    level: 'Débutant' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 6,
    duration: '4h 10min',
    thumbnail: brandingImage
  },
  {
    id: '6',
    title: 'Analytics Avancées',
    subtitle: 'Google Analytics 4 Mastery',
    category: 'analytics',
    level: 'Expert' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 9,
    duration: '5h 30min',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop'
  },
  {
    id: '7',
    title: 'Publicité Digitale Avancée',
    subtitle: 'Facebook, Google & TikTok Ads',
    category: 'ads',
    level: 'Expert' as const,
    status: 'unlocked' as const,
    price: 250,
    lessonsCount: 12,
    duration: '7h 15min',
    thumbnail: adsImage
  }
];