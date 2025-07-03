
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.article': 'Articles',
    'nav.projects': 'Projects',
    'nav.resources': 'Resources',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.site1': 'مجلس التعاون لدول الخليج العربية',
    'nav.site2': 'اتحاد الجمعيات التعاونية الاستهلاكية بدولة الكويت',
    'nav.site3': 'مجلس التعاون لدول الخليج العربية',
    'nav.site4': 'منظمة العمل الدولية',
    'nav.site5': 'قسم الشؤون الاقتصادية والاجتماعية بالأمم المتحدة',




    
    // Hero Section
    'hero.title': 'Building',
    'hero.titleHighlight': 'Stronger',
    'hero.titleEnd': 'Cooperatives',
    'hero.subtitle': 'Empowering Gulf communities through collaborative innovation, sustainable development, and shared prosperity',
    'hero.description': 'Join the movement that\'s transforming the Gulf region through cooperative enterprises. Discover resources, connect with experts, and build the future of collaborative business.',
    'hero.exploreBtn': 'Explore Cooperatives',
    'hero.learnBtn': 'Learn More',
    'hero.stats.cooperatives': 'Active Cooperatives',
    'hero.stats.countries': 'Gulf Countries',
    'hero.stats.members': 'Community Members',
    
    // Blog Section
    'blog.title': 'Latest Insights & Stories',
    'blog.subtitle': 'Stay updated with the latest trends, success stories, and expert insights from the Gulf cooperative movement.',
    'blog.readMore': 'Read More',
    'blog.viewAll': 'View All Articles',
    'blog.author': 'By',
    'blog.readTime': 'min read',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive support services designed to empower cooperative growth and success throughout the Gulf region.',
    'services.training.title': 'Training & Education',
    'services.training.description': 'Comprehensive training programs for cooperative leaders, board members, and staff on governance, management, and best practices.',
    'services.training.feature1': 'Leadership Development',
    'services.training.feature2': 'Governance Training',
    'services.training.feature3': 'Financial Management',
    'services.training.feature4': 'Member Engagement',
    'services.consulting.title': 'Consulting Services',
    'services.consulting.description': 'Expert consulting to help establish new cooperatives and optimize existing operations for sustainable growth.',
    'services.consulting.feature1': 'Startup Consultation',
    'services.consulting.feature2': 'Strategic Planning',
    'services.consulting.feature3': 'Operational Efficiency',
    'services.consulting.feature4': 'Digital Transformation',
    'services.research.title': 'Research & Analytics',
    'services.research.description': 'Data-driven insights and market research to inform cooperative development strategies across the Gulf region.',
    'services.research.feature1': 'Market Analysis',
    'services.research.feature2': 'Impact Assessment',
    'services.research.feature3': 'Trend Reporting',
    'services.research.feature4': 'Performance Metrics',
    'services.legal.title': 'Legal & Compliance',
    'services.legal.description': 'Navigate regulatory requirements and ensure compliance with local and regional cooperative laws and regulations.',
    'services.legal.feature1': 'Legal Framework',
    'services.legal.feature2': 'Compliance Audits',
    'services.legal.feature3': 'Documentation',
    'services.legal.feature4': 'Regulatory Updates',
    'services.cta.title': 'Ready to Get Started?',
    'services.cta.description': 'Contact our team of experts to discuss how we can support your cooperative\'s growth and development goals.',
    'services.cta.consultation': 'Schedule Consultation',
    'services.cta.brochure': 'Download Brochure',
    
    // Footer
    'footer.description': 'Empowering Gulf communities through collaborative innovation, sustainable development, and shared prosperity.',
    'footer.quickLinks': 'Quick Links',
    'footer.gulfRegion': 'Gulf Region',
    'footer.newsletter': 'Stay Connected',
    'footer.newsletterDescription': 'Get the latest updates on cooperative developments in the Gulf region.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': '© 2024 Sawa - Gulf Cooperatives Platform. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookies',
    'footer.address': 'Address',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.workingHours': 'Working Hours',
    
    // About Page
    'about.title': 'About Sawa',
    'about.subtitle': 'Empowering Cooperative Excellence in the Gulf Region',
    'about.mission.title': 'Projects',
    'about.mission.text': 'To promote and strengthen cooperative enterprises across the Gulf region through education, collaboration, and innovative solutions that drive sustainable economic development.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'A thriving Gulf region where cooperatives serve as pillars of economic growth, social cohesion, and sustainable development for all communities.',
    'about.values.title': 'Our Values',
    'about.values.collaboration': 'Collaboration',
    'about.values.sustainability': 'Sustainability',
    'about.values.innovation': 'Innovation',
    'about.values.integrity': 'Integrity',
    'about.values.collaboration.desc': 'Working together to achieve common goals and shared prosperity.',
    'about.values.sustainability.desc': 'Building long-term solutions that benefit both people and planet.',
    'about.values.innovation.desc': 'Embracing new ideas and technologies to drive cooperative growth.',
    'about.values.integrity.desc': 'Maintaining the highest standards of ethics and transparency.',
    
    // Projects Page
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Transforming Communities Through Cooperative Innovation',
    'projects.viewAll': 'View All Projects',
    'projects.learnMore': 'Learn More',
    'projects.participants': 'participants',
    'projects.status.active': 'Active',
    'projects.status.completed': 'Completed',
    'projects.status.inProgress': 'In Progress',
    
    // Resources Page
    'resources.title': 'Resources & Downloads',
    'resources.subtitle': 'Essential Tools and Guides for Cooperative Success',
    'resources.download': 'Download',
    'resources.viewAll': 'View All Resources',
    'resources.filter.all': 'All',
    'resources.filter.legal': 'Legal',
    'resources.filter.finance': 'Finance',
    'resources.filter.governance': 'Governance',
    'resources.filter.caseStudies': 'Case Studies',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in Touch with Our Team',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Gulf Cooperation Council Region',
    'contact.info.email': 'info@sawa-gulf.org',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'Sunday - Thursday: 9:00 AM - 6:00 PM\nFriday - Saturday: Closed',
  },
  ar: {
    // Navigation
    'nav.home': 'الصفحة الرئيسية',
    'nav.about': 'من نحن',
    'nav.article': 'المقالات',
    'nav.projects': 'المبادرات',
    'nav.resources': 'الموارد',
    'nav.services': 'خدماتنا',
    'nav.contact': 'اتصل بنا',

     'nav.site1': 'مجلس التعاون لدول الخليج العربية',
    'nav.site2': 'اتحاد الجمعيات التعاونية الاستهلاكية بدولة الكويت',
    'nav.site3': 'مجلس التعاون لدول الخليج العربية',
    'nav.site4': 'منظمة العمل الدولية',
    'nav.site5': 'قسم الشؤون الاقتصادية والاجتماعية بالأمم المتحدة',
    // Hero Section
    'hero.title': 'بناء',
    'hero.titleHighlight': 'أقوى',
    'hero.titleEnd': 'التعاونيات',
    'hero.subtitle': 'تمكين مجتمعات الخليج من خلال الابتكار التعاوني والتنمية المستدامة والازدهار المشترك',
    'hero.description': 'انضم إلى الحركة التي تحول منطقة الخليج من خلال المؤسسات التعاونية. اكتشف الموارد، وتواصل مع الخبراء، وابن مستقبل الأعمال التعاونية.',
    'hero.exploreBtn': 'استكشف التعاونيات',
    'hero.learnBtn': 'اعرف المزيد',
    'hero.stats.cooperatives': 'التعاونيات النشطة',
    'hero.stats.countries': 'دول الخليج',
    'hero.stats.members': 'أعضاء المجتمع',
    
    // Blog Section
    'blog.title': 'أحدث الرؤى والقصص',
    'blog.subtitle': 'ابق مطلعاً على أحدث الاتجاهات وقصص النجاح والرؤى المتخصصة من حركة التعاونيات الخليجية.',
    'blog.readMore': 'اقرأ المزيد',
    'blog.viewAll': 'عرض جميع المقالات',
    'blog.author': 'بواسطة',
    'blog.readTime': 'دقيقة قراءة',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'خدمات دعم شاملة مصممة لتمكين نمو ونجاح التعاونيات في جميع أنحاء منطقة الخليج.',
    'services.training.title': 'التدريب والتعليم',
    'services.training.description': 'برامج تدريبية شاملة لقادة التعاونيات وأعضاء مجلس الإدارة والموظفين حول الحوكمة والإدارة وأفضل الممارسات.',
    'services.training.feature1': 'تطوير القيادة',
    'services.training.feature2': 'تدريب الحوكمة',
    'services.training.feature3': 'إدارة مالية',
    'services.training.feature4': 'إشراك الأعضاء',
    'services.consulting.title': 'خدمات استشارية',
    'services.consulting.description': 'استشارات متخصصة للمساعدة في إنشاء تعاونيات جديدة وتحسين العمليات الحالية للنمو المستدام.',
    'services.consulting.feature1': 'استشارات البدء',
    'services.consulting.feature2': 'التخطيط الاستراتيجي',
    'services.consulting.feature3': 'الكفاءة التشغيلية',
    'services.consulting.feature4': 'التحول الرقمي',
    'services.research.title': 'البحث والتحليل',
    'services.research.description': 'رؤى مبنية على البيانات وأبحاث السوق لإطلاع استراتيجيات تطوير التعاونيات عبر منطقة الخليج.',
    'services.research.feature1': 'تحليل السوق',
    'services.research.feature2': 'تقييم الأثر',
    'services.research.feature3': 'تقارير الاتجاهات',
    'services.research.feature4': 'مقاييس الأداء',
    'services.legal.title': 'القانونية والامتثال',
    'services.legal.description': 'التنقل في المتطلبات التنظيمية وضمان الامتثال للقوانين واللوائح التعاونية المحلية والإقليمية.',
    'services.legal.feature1': 'الإطار القانوني',
    'services.legal.feature2': 'مراجعات الامتثال',
    'services.legal.feature3': 'التوثيق',
    'services.legal.feature4': 'التحديثات التنظيمية',
    'services.cta.title': 'مستعد للبدء؟',
    'services.cta.description': 'اتصل بفريق خبرائنا لمناقشة كيف يمكننا دعم أهداف نمو وتطوير التعاونية الخاصة بك.',
    'services.cta.consultation': 'جدولة استشارة',
    'services.cta.brochure': 'تحميل الكتيب',
    
    // Footer
    'footer.description': 'تمكين مجتمعات الخليج من خلال الابتكار التعاوني والتنمية المستدامة والازدهار المشترك.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.gulfRegion': 'منطقة الخليج',
    'footer.newsletter': 'ابق على اتصال',
    'footer.newsletterDescription': 'احصل على أحدث التطورات حول تطوير التعاونيات في منطقة الخليج.',
    'footer.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.copyright': '© 2024 سوا - منصة التعاونيات الخليجية. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'ملفات تعريف الارتباط',
    'footer.address': 'العنوان',
    'footer.email': 'البريد الإلكتروني',
    'footer.phone': 'الهاتف',
    'footer.workingHours': 'ساعات العمل',
    
    // About Page
    'about.title': 'عن سوا',
    'about.subtitle': 'تمكين التميز التعاوني في منطقة الخليج',
    'about.mission.title': 'المبادرات',
    'about.mission.text': 'تعزيز وتقوية المؤسسات التعاونية في منطقة الخليج من خلال التعليم والتعاون والحلول المبتكرة التي تدفع التنمية الاقتصادية المستدامة.',
    'about.vision.title': 'رؤيتنا',
    'about.vision.text': 'منطقة خليج مزدهرة حيث تعمل التعاونيات كأعمدة للنمو الاقتصادي والتماسك الاجتماعي والتنمية المستدامة لجميع المجتمعات.',
    'about.values.title': 'قيمنا',
    'about.values.collaboration': 'التعاون',
    'about.values.sustainability': 'الاستدامة',
    'about.values.innovation': 'الابتكار',
    'about.values.integrity': 'النزاهة',
    'about.values.collaboration.desc': 'العمل معاً لتحقيق الأهداف المشتركة والازدهار المشترك.',
    'about.values.sustainability.desc': 'بناء حلول طويلة الأمد تفيد الناس والكوكب.',
    'about.values.innovation.desc': 'اعتماد أفكار وتقنيات جديدة لدفع نمو التعاونيات.',
    'about.values.integrity.desc': 'الحفاظ على أعلى معايير الأخلاق والشفافية.',
    
    // Projects Page
    'projects.title': 'مشاريعنا',
    'projects.subtitle': 'تحويل المجتمعات من خلال الابتكار التعاوني',
    'projects.viewAll': 'عرض جميع المبادرات',
    'projects.learnMore': 'اعرف المزيد',
    'projects.participants': 'مشارك',
    'projects.status.active': 'نشط',
    'projects.status.completed': 'مكتمل',
    'projects.status.inProgress': 'قيد التنفيذ',
    
    // Resources Page
    'resources.title': 'الموارد والتحميلات',
    'resources.subtitle': 'الأدوات والأدلة الأساسية لنجاح التعاونيات',
    'resources.download': 'تحميل',
    'resources.viewAll': 'عرض جميع الموارد',
    'resources.filter.all': 'الكل',
    'resources.filter.legal': 'قانونية',
    'resources.filter.finance': 'مالية',
    'resources.filter.governance': 'حوكمة',
    'resources.filter.caseStudies': 'دراسات حالة',
    
    // Contact Page
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'عنوان البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.info.title': 'معلومات الاتصال',
    'contact.info.address': 'منطقة مجلس التعاون الخليجي',
    'contact.info.email': 'info@sawa-gulf.org',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً\nالجمعة - السبت: مغلق',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.article': 'Articles',
    'nav.projects': 'Projets',
    'nav.resources': 'Ressources',
    'nav.services': 'Nos services',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Construire des',
    'hero.titleHighlight': 'Coopératives',
    'hero.titleEnd': 'Plus Fortes',
    'hero.subtitle': 'Autonomiser les communautés du Golfe grâce à l\'innovation collaborative, au développement durable et à la prospérité partagée',
    'hero.description': 'Rejoignez le mouvement qui transforme la région du Golfe grâce aux entreprises coopératives. Découvrez des ressources, connectez-vous avec des experts et construisez l\'avenir des affaires collaboratives.',
    'hero.exploreBtn': 'Explorer les Coopératives',
    'hero.learnBtn': 'En savoir plus',
    'hero.stats.cooperatives': 'Coopératives Actives',
    'hero.stats.countries': 'Pays du Golfe',
    'hero.stats.members': 'Membres de la Communauté',
    
     'nav.site1': 'مجلس التعاون لدول الخليج العربية',
    'nav.site2': 'اتحاد الجمعيات التعاونية الاستهلاكية بدولة الكويت',
    'nav.site3': 'مجلس التعاون لدول الخليج العربية',
    'nav.site4': 'منظمة العمل الدولية',
    'nav.site5': 'قسم الشؤون الاقتصادية والاجتماعية بالأمم المتحدة',
    // Blog Section
    'blog.title': 'Dernières Informations et Histoires',
    'blog.subtitle': 'Restez informé des dernières tendances, histoires de succès et perspectives d\'experts du mouvement coopératif du Golfe.',
    'blog.readMore': 'Lire Plus',
    'blog.viewAll': 'Voir Tous les Articles',
    'blog.author': 'Par',
    'blog.readTime': 'min de lecture',
    
    // Services Section
    'services.title': 'Nos Services',
    'services.subtitle': 'Services de soutien complets conçus pour autonomiser la croissance et le succès des coopératives dans toute la région du Golfe.',
    'services.training.title': 'Formation et Éducation',
    'services.training.description': 'Programmes de formation complets pour les dirigeants de coopératives, les membres du conseil d\'administration et le personnel sur la gouvernance, la gestion et les meilleures pratiques.',
    'services.training.feature1': 'Développement du Leadership',
    'services.training.feature2': 'Formation en Gouvernance',
    'services.training.feature3': 'Gestion Financière',
    'services.training.feature4': 'Engagement des Membres',
    'services.consulting.title': 'Services de Conseil',
    'services.consulting.description': 'Conseil d\'expert pour aider à établir de nouvelles coopératives et optimiser les opérations existantes pour une croissance durable.',
    'services.consulting.feature1': 'Consultation de Démarrage',
    'services.consulting.feature2': 'Planification Stratégique',
    'services.consulting.feature3': 'Efficacité Opérationnelle',
    'services.consulting.feature4': 'Transformation Numérique',
    'services.research.title': 'Recherche et Analyse',
    'services.research.description': 'Informations basées sur les données et recherche de marché pour informer les stratégies de développement coopératif dans la région du Golfe.',
    'services.research.feature1': 'Analyse de Marché',
    'services.research.feature2': 'Évaluation d\'Impact',
    'services.research.feature3': 'Rapports de Tendances',
    'services.research.feature4': 'Métriques de Performance',
    'services.legal.title': 'Juridique et Conformité',
    'services.legal.description': 'Naviguer dans les exigences réglementaires et assurer la conformité avec les lois et réglementations coopératives locales et régionales.',
    'services.legal.feature1': 'Cadre Juridique',
    'services.legal.feature2': 'Audits de Conformité',
    'services.legal.feature3': 'Documentation',
    'services.legal.feature4': 'Mises à Jour Réglementaires',
    'services.cta.title': 'Prêt à Commencer?',
    'services.cta.description': 'Contactez notre équipe d\'experts pour discuter de la façon dont nous pouvons soutenir les objectifs de croissance et de développement de votre coopérative.',
    'services.cta.consultation': 'Planifier une Consultation',
    'services.cta.brochure': 'Télécharger la Brochure',
    
    // Footer
    'footer.description': 'Autonomiser les communautés du Golfe grâce à l\'innovation collaborative, au développement durable et à la prospérité partagée.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.gulfRegion': 'Région du Golfe',
    'footer.newsletter': 'Rester Connecté',
    'footer.newsletterDescription': 'Recevez les dernières mises à jour sur les développements coopératifs dans la région du Golfe.',
    'footer.emailPlaceholder': 'Entrez votre email',
    'footer.subscribe': 'S\'abonner',
    'footer.copyright': '© 2024 Sawa - Plateforme des Coopératives du Golfe. Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions de Service',
    'footer.cookies': 'Cookies',
    'footer.address': 'Adresse',
    'footer.email': 'Email',
    'footer.phone': 'Téléphone',
    'footer.workingHours': 'Heures de Travail',
    
    // About Page
    'about.title': 'À propos de Sawa',
    'about.subtitle': 'Autonomiser l\'Excellence Coopérative dans la Région du Golfe',
    'about.mission.title': 'Initiatives',
    'about.mission.text': 'Promouvoir et renforcer les entreprises coopératives dans la région du Golfe grâce à l\'éducation, à la collaboration et aux solutions innovantes qui favorisent le développement économique durable.',
    'about.vision.title': 'Notre Vision',
    'about.vision.text': 'Une région du Golfe prospère où les coopératives servent de piliers de croissance économique, de cohésion sociale et de développement durable pour toutes les communautés.',
    'about.values.title': 'Nos Valeurs',
    'about.values.collaboration': 'Collaboration',
    'about.values.sustainability': 'Durabilité',
    'about.values.innovation': 'Innovation',
    'about.values.integrity': 'Intégrité',
    'about.values.collaboration.desc': 'Travailler ensemble pour atteindre des objectifs communs et une prospérité partagée.',
    'about.values.sustainability.desc': 'Construire des solutions à long terme qui profitent aux personnes et à la planète.',
    'about.values.innovation.desc': 'Adopter de nouvelles idées et technologies pour stimuler la croissance coopérative.',
    'about.values.integrity.desc': 'Maintenir les plus hauts standards d\'éthique et de transparence.',
    
    // Projects Page
    'projects.title': 'Nos Projets',
    'projects.subtitle': 'Transformer les Communautés grâce à l\'Innovation Coopérative',
    'projects.viewAll': 'Voir Tous les Projets',
    'projects.learnMore': 'En Savoir Plus',
    'projects.participants': 'participants',
    'projects.status.active': 'Actif',
    'projects.status.completed': 'Terminé',
    'projects.status.inProgress': 'En Cours',
    
    // Resources Page
    'resources.title': 'Ressources et Téléchargements',
    'resources.subtitle': 'Outils et Guides Essentiels pour le Succès Coopératif',
    'resources.download': 'Télécharger',
    'resources.viewAll': 'Voir Toutes les Ressources',
    'resources.filter.all': 'Tous',
    'resources.filter.legal': 'Juridique',
    'resources.filter.finance': 'Finance',
    'resources.filter.governance': 'Gouvernance',
    'resources.filter.caseStudies': 'Études de Cas',
    
    // Contact Page
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Contactez Notre Équipe',
    'contact.name': 'Nom Complet',
    'contact.email': 'Adresse E-mail',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.info.title': 'Informations de Contact',
    'contact.info.address': 'Région du Conseil de Coopération du Golfe',
    'contact.info.email': 'info@sawa-gulf.org',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'Dimanche - Jeudi: 9h00 - 18h00\nVendredi - Samedi: Fermé',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Set document direction based on language
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};