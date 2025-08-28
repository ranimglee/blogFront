
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
    'nav.projects': 'Initiatives',
    'nav.resources': 'Resources',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
   'nav.site1': 'Gulf Cooperation Council',
'nav.site2': 'Union of Consumer Cooperative Societies of Kuwait',
'nav.site3': 'Gulf Cooperation Council',
'nav.site4': 'International Labour Organization',
'nav.site5': 'United Nations Department of Economic and Social Affairs',

    'nav.login':'Login',
    'nav.logout':'Logout',

    'nav.site6': 'Home',
    'nav.site7': 'About',
    'nav.site8': 'Articles',
    'nav.site9': 'Initiatives',
    'nav.site10': 'Resources',
'register.close':'Close',

    
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
    'blog.title': 'Articles',
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
    'footer.usefullLinks': 'Usefull Links ',

    'footer.gulfRegion': 'Gulf Region',
    'footer.newsletter': 'Stay Connected',
    'footer.newsletterDescription': 'Get the latest updates on cooperative developments in the Gulf region.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': '© 2025 Afaq - Gulf Cooperatives Platform. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookies',
    'footer.address': 'Address',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.workingHours': 'Working Hours',
    "footer.invalidEmail": "Please enter a valid email.",
"footer.subscribeSuccess": "Confirmation email sent!",
    "footer.subscribeError": "Subscription failed.",
    'footer.sitemap': 'Sitemap',
    'sitemap.title': 'Sitemap',
    'sitemap.mainPages': 'Main Website Pages',
    'sitemap.externalResources': 'External Resources',
    'sitemap.additionalInfo': 'Additional Information',
    'sitemap.description': 'This sitemap lists all important pages and resources available on our platform. Use it to easily navigate and discover all available content.',

    // About Page - English
    'about.title': 'About AFAQ',
    'about.subtitle': 'Gulf Cooperatives Platform',
    'about.vision.title': 'Vision',
    'about.vision.text': 'To be a leading reference and an effective platform for the sustainability and development of cooperative movement in the Gulf countries.',
    'about.mission.title': 'Mission',
    'about.mission.text': 'Our mission is to strengthen the cooperative movement through:',
    'about.mission.point1': 'Disseminate knowledge, promote cooperative culture, and share best practices',
    'about.mission.point2': 'Encourage networking and provide spaces for interaction and exchange of experiences',
    'about.mission.point3': 'Support cooperative identity to promote integration within the global movement',
    'about.mission.point4': 'Monitor key aspects and advocate for supportive policies and initiatives',
    'about.mission.point5': 'Contribute to sustainable social entrepreneurship development',
    'about.offer.title': 'What We Offer',
    'about.offer.texts': 'Explanatory Texts & Articles',
    'about.offer.textsDesc': 'Analytical articles on cooperative work',
    'about.offer.studies': 'Studies & Research',
    'about.offer.studiesDesc': 'Research papers on cooperative development',
    'about.offer.interviews': 'Interviews & Showcases',
    'about.offer.interviewsDesc': 'Expert interviews and inspiring experiences',
    'about.offer.legal': 'Legal Texts & Guides',
    'about.offer.legalDesc': 'Practical operational guides',
    'about.offer.news': 'News Coverage',
    'about.offer.newsDesc': 'Cooperative sector news updates',
    'about.scope.title': 'Scope',
    'about.scope.text': 'Our content covers the six member states of the Gulf Cooperation Council (GCC), while also reaching out to other Arab countries and international contexts.',
    'about.scope.sources': 'Based on official and reliable sources, following an objective editorial line aligned with cooperative work institutions.',
    'about.team.title': 'Our Team',
    'about.team.text': 'Driven by a passionate team committed to cooperative values and principles, aware of its deeply human dimension.',
    'about.team.experience': 'Professional experience since 2016 in Kuwait',
    'about.team.languages': 'Fluent in Arabic, French, and English',
    'about.team.diversity': 'Diverse cultural backgrounds and expertise',
    'about.team.mission': 'Our team closely follows developments in the cooperative sector across the Gulf countries and beyond, collecting, organizing, and analyzing resources to make them accessible while establishing partnerships with various stakeholders to advance our vision and mission.',
    'about.contact.title': 'Contact Us',
    'about.contact.email': 'Contact-gulfcoop-horizons@......ae',
    'about.contact.suggest': 'Suggest topics',
    'about.contact.share': 'Share articles & testimonials',
    'about.contact.questions': 'Send questions or requests',
    'about.contact.feedback': 'Provide feedback',
    'about.contact.btn': 'Contact Us',
    'about.contact.legal': 'Legal Notice',
    
    // Projects Page
    'projects.title': 'Initiatives',
    'projects.subtitle': 'Transforming Communities Through Cooperative Innovation',
    'projects.viewAll': 'View All Initiatives',
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
    "register.accept": "I accept the",
"register.privacyPolicy": "Privacy Policy",
"register.error.acceptPrivacy": "You must accept the Privacy Policy",

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
    'contact.info.email': 'info@afaq-gulf.org',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'Sunday - Thursday: 9:00 AM - 6:00 PM\nFriday - Saturday: Closed',
           // Login Page
    'login.title': 'Login',
    'login.subtitle': 'Please log in to download resources and access premium content.',
    'login.email': 'Email',
    'login.emailPlaceholder': 'Enter your email',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.submit': 'Login',
    'login.switchToRegister': 'D’ont have an account? Sign up',
    'login.forgotPassword': 'Forgot your password?',
        'backToProjects': 'Back to Initiatives',
    'backToArticles': 'Back to Articles',

  'aboutAuthor':'About the Author',
    'authorDescription':' is an expert in cooperative development and sustainable business practices in the Gulf region',
    'register.title': 'Register',
'register.subtitle': 'Please sign up to create an account.',
'register.fullName': 'Full Name',
'register.fullNamePlaceholder': 'Enter your full name',
'register.confirmPassword': 'Confirm Password',
'register.confirmPasswordPlaceholder': 'Re-enter your password',
'register.submit': 'Sign up',
'register.switchToLogin': 'Already have an account? Log in',
"contact.sending": "Sending...",
"contact.successMessage": "Message sent successfully!",
"contact.errorMessage": "Something went wrong. Please try again.",
'resources.no_content': 'No content available',
'loading.pleaseWait':'Please wait',
 'privacy.title': 'Privacy Policy',
  'privacy.lastUpdated': 'Last updated: June 2025',
  'privacy.intro': 'The AFAQ Gulf Cooperatives Blog is committed to protecting the privacy of its visitors. This page explains how we collect, use, share, and safeguard your information.',
  'privacy.info.title': '1. Information We Collect',
  'privacy.info.content': `We may collect two types of information:
a) Non-personal data
- IP address
- Browser and device type
- Pages visited
- Date and time of your visit
- Referring source
b) Personal data (when applicable)
- Contact form
- Comment section
It may include: name, email address, country, or any other information you voluntarily provide.`,
  'privacy.usage.title': '2. Use of Information',
  'privacy.usage.content': `The collected information is used for legitimate purposes, such as:
- Improving browsing experience and website content
- Analyzing performance and most-read content
- Responding to your inquiries or feedback
- Sending updates or news (only with your consent)`,
  'privacy.cookies.title': '3. Cookies',
  'privacy.cookies.content': 'The site uses cookies to personalize your experience and analyze performance. You can always change your preferences through your browser settings or disable cookies entirely.',
  'privacy.protection.title': '4. Data Protection',
  'privacy.protection.content': 'We implement reasonable technical and organizational measures to protect your data, in accordance with local laws. We do not sell or share your personal data with third parties for marketing purposes.',
  'privacy.links.title': '5. External Links',
  'privacy.links.content': 'Our website may contain links to external websites. We are not responsible for the privacy practices of those third-party sites.',
  'privacy.rights.title': '6. User Rights',
  'privacy.rights.content': 'You have the right, at any time, to request access, correction, or deletion of your data, or withdraw consent for communications. Contact us at: Contact-gulfcoop-horizons@......ae',
  'privacy.law.title': '7. Applicable Law',
  'privacy.law.content': 'This policy is governed by the laws of the United Arab Emirates, specifically Federal Decree-Law No. 34 of 2021 on Combating Rumors and Cybercrime, and Federal Decree-Law No. 55 of 2023 on Media Regulation.',
  'privacy.changes.title': '8. Changes to the Privacy Policy',
  'privacy.changes.content': 'This policy may be updated from time to time. Any changes will be posted on this page along with the update date. We recommend reviewing it regularly.',
  'privacy.contact': 'For any privacy-related inquiries, please contact us at: Contact-gulfcoop-horizons@......ae',



  },
  ar: {
    // Navigation
    'nav.home': 'الصفحة الرئيسية',
    'nav.about': 'من نحن',
    'nav.article': 'مقالات',
    'nav.projects': 'مبادرات',
    'nav.resources': 'موارد',
    'nav.services': 'خدماتنا',
    'nav.contact': 'اتصل بنا',
    'nav.login':'تسجيل الدخول',
    'nav.logout':'تسجيل الخروج',
    'loading.pleaseWait':'يرجى الانتظار',



    'nav.site1': 'مجلس التعاون لدول الخليج العربية',
    'nav.site2': 'اتحاد الجمعيات التعاونية الاستهلاكية بدولة الكويت',
    'nav.site3': 'مجلس التعاون لدول الخليج العربية',
    'nav.site4': 'منظمة العمل الدولية',
    'nav.site5': 'قسم الشؤون الاقتصادية والاجتماعية بالأمم المتحدة',
'nav.site6': 'الرئيسية',
'nav.site7': 'من نحن',
'nav.site8': 'مقالات',
'nav.site9': 'مبادرات',
'nav.site10': 'موارد',

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
    'blog.title': 'مقالات',
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
    'footer.usefullLinks': 'روابط مفيدة',

    'footer.gulfRegion': 'منطقة الخليج',
    'footer.newsletter': 'ابق على اتصال',
    'footer.newsletterDescription': 'احصل على أحدث التطورات حول تطوير التعاونيات في منطقة الخليج.',
    'footer.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.copyright': '© 2025 آفاق - منصة التعاونيات الخليجية. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'ملفات تعريف الارتباط',
    'footer.address': 'العنوان',
    'footer.email': 'البريد الإلكتروني',
    'footer.phone': 'الهاتف',
    'footer.workingHours': 'ساعات العمل',
    
    // About Page - Arabic
    'about.title': 'عن آفاق',
    'about.subtitle': 'منصة تعاونيات الخليج',
    'about.vision.title': 'الرؤية',
    'about.vision.text': 'أن نكون مرجعًا رائدًا ومنصة فاعلة لاستدامة وتطوير العمل التعاوني بدول الخليج العربية.',
    'about.mission.title': 'الرسالة',
    'about.mission.text': 'تتمثل رسالتنا في:',
    'about.mission.point1': 'نشر المعرفة وتعزيز الثقافة التعاونية ومشاركة الممارسات الفضلى',
    'about.mission.point2': 'تشجيع التشبيك وتوفير مجالات لتبادل التجارب والرؤى والتفاعل حول آفاق العمل التعاوني في دول الخليج العربية',
    'about.mission.point3': 'دعم الهوية التعاونية لمزيد الاندماج المحلي والإقليمي في الحركة التعاونية العالمية',
    'about.mission.point4': 'متابعة بيئة العمل التعاوني ومناصرة السياسات والمبادرات الداعمة',
    'about.mission.point5': 'المساهمة في تطوير ريادة الأعمال الاجتماعية المستدامة وتبني الآليات الكفيلة بتنمية الأفراد وبناء المجتمعات المتماسكة والعادلة',
    'about.offer.title': ' المحتوى',
    'about.offer.texts': 'مقالات تحليلية وتفسيرية',
    'about.offer.textsDesc': 'مقالات تحليلية حول العمل التعاوني',
    'about.offer.studies': 'بحوث ودراسات',
    'about.offer.studiesDesc': 'أوراق بحثية حول تطوير التعاونيات',
    'about.offer.interviews': 'مقابلات وتجارب ملهمة',
    'about.offer.interviewsDesc': 'مقابلات مع الخبراء وتجارب ملهمة',
    'about.offer.legal': 'نصوص قانونية وأدلة عملية',
    'about.offer.legalDesc': 'أدلة عملية وتطبيقية',
    'about.offer.news': 'تغطيات للمستجدات التعاونية',
    'about.offer.newsDesc': 'تحديثات أخبار القطاع التعاوني',
    'about.scope.title': 'النطاق',
    'about.scope.text': 'يشمل المحتوى الدول الست لمجلس التعاون لدول الخليج العربية، كما ينفتح على دول أخرى من المنطقة العربية ومن العالم.',
    'about.scope.sources': 'يعتمد المصادر الرسمية والموثوقة، كما يضمن الصبغة الموضوعية والمتلائمة مع الرؤى الأساسية للجهات المتخصصة في العمل التعاوني.',
    'about.team.title': 'فريق العمل',
    'about.team.text': 'تقوم مدونة آفاق تعاونيات الخليج على فريق عمل شغوف بالعمل التعاوني، متشبع بقيم ومبادئ الهوية التعاونية، ملمّ ببعدها الإنساني الراسخ.',
    'about.team.experience': 'خبرة مهنية منذ سنة 2016 في دولة الكويت',
    'about.team.languages': 'يتقن اللغات العربية والفرنسية والإنجليزية',
    'about.team.diversity': 'يتميّز بأبعاد ثقافية متعدّدة',
    'about.team.mission': 'يهتم الفريق بالتجارب والمصادر المعرفية المختلفة وبمتابعة المستجدات التعاونية في محيط دول الخليج العربية وعلى المستوى العربي والدولي. يتم الاطلاع وتجميع الموارد والإسهامات المتنوعة وإتاحتها وتقديم قراءة لها والسعي لإنشاء شراكات مع مختلف الفاعلين خدمة للرؤية والرسالة.',
    'about.contact.title': 'للتواصل معنا',
    'about.contact.email': 'Contact-gulfcoop-horizons@......ae',
    'about.contact.suggest': 'اقتراح موضوعات',
    'about.contact.share': 'مشاركة مقالات أو تجارب أو مواد علمية',
    'about.contact.questions': 'إرسال استفسار أو طلب خدمة',
    'about.contact.feedback': 'تقديم رأي أو طلب تصحيح خطأ',
    'about.contact.btn': 'اتصل بنا',
    'about.contact.legal': 'الإشعارات القانونية',
    
    // Projects Page
    'projects.title': 'مبادرات',
    'projects.subtitle': 'تحويل المجتمعات من خلال الابتكار التعاوني',
    'projects.viewAll': 'عرض جميع المبادرات',
    'projects.learnMore': 'اعرف المزيد',
    'projects.participants': 'مشارك',
    'projects.status.active': 'نشط',
    'projects.status.completed': 'مكتمل',
    'projects.status.inProgress': 'قيد التنفيذ',
    'backToProjects': 'العودة إلى المبادرات',
    'backToArticles': 'العودة إلى المقالات',

"register.accept": "أوافق على",
"register.privacyPolicy": "سياسة الخصوصية",
"register.error.acceptPrivacy": "يجب عليك الموافقة على سياسة الخصوصية",
    
    // Resources Page
    'resources.title': 'موارد',
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
    'contact.info.email': 'info@afaq-gulf.org',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً\nالجمعة - السبت: مغلق',
    
    'login.title': 'تسجيل الدخول',
    'login.subtitle': 'يرجى تسجيل الدخول لتحميل الموارد والوصول إلى المحتوى المميز.',
    'login.email': 'البريد الإلكتروني',
    'login.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.passwordPlaceholder': 'أدخل كلمة المرور الخاصة بك',
    'login.submit': 'تسجيل الدخول',
    'login.switchToRegister': 'ليس لديك حساب؟ سجل الآن',
    'login.forgotPassword': 'هل نسيت كلمة المرور؟',
'aboutAuthor': 'عن المؤلف',
'authorDescription': ' هو خبير في تطوير التعاونيات والممارسات التجارية المستدامة في منطقة الخليج',
'register.title': 'التسجيل',
'register.subtitle': 'يرجى إنشاء حساب للمتابعة.',
'register.fullName': 'الاسم الكامل',
'register.fullNamePlaceholder': 'أدخل اسمك الكامل',
'register.confirmPassword': 'تأكيد كلمة المرور',
'register.confirmPasswordPlaceholder': 'أعد إدخال كلمة المرور',
'register.submit': 'إنشاء حساب',
'register.switchToLogin': 'هل لديك حساب بالفعل؟ تسجيل الدخول',

"contact.sending": "جارٍ الإرسال...",
"contact.successMessage": "تم إرسال الرسالة بنجاح!",
"contact.errorMessage": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
"footer.subscribeSuccess": "تم إرسال بريد التأكيد!",
    "footer.subscribeError": "فشل في الاشتراك.",
    "footer.invalidEmail": "يرجى إدخال بريد إلكتروني صالح.",
    'footer.sitemap': 'خريطة الموقع',

'register.close':'إغلاق',
'resources.no_content': 'لا يوجد محتوى متاح',
'sitemap.title': 'خريطة الموقع',
'sitemap.mainPages': 'الصفحات الرئيسية للموقع',
'sitemap.externalResources': 'الموارد الخارجية',
'sitemap.additionalInfo': 'معلومات إضافية',
'sitemap.description': 'تعرض هذه الخريطة جميع الصفحات والموارد الهامة المتاحة على منصتنا. استخدمها للتنقل بسهولة واكتشاف كل المحتويات المتاحة.',

 'privacy.title': 'سياسة الخصوصية',
  'privacy.lastUpdated': 'آخر تحديث: يونيو 2025',
  'privacy.intro': 'نلتزم في مدونة آفاق تعاونيات الخليج بحماية خصوصية زوّارنا. توضح هذه الصفحة كيف نقوم بجمع المعلومات واستخدامها ومشاركتها وتأمينها.',
  'privacy.info.title': '1. المعلومات التي نقوم بجمعها',
  'privacy.info.content': `قد نقوم بجمع نوعين من المعلومات:
أ) بيانات غير شخصية
- عنوان IP
- نوع المتصفح والجهاز
- الصفحات التي تزورها
- وقت وتاريخ زيارتك
- مصدر الإحالة
ب) بيانات شخصية (عند الاقتضاء)
- نموذج الاتصال
- كتابة تعليق
قد تتضمن: الاسم، البريد الإلكتروني، البلد، أو أي معلومات أخرى تقوم بإدخالها طوعًا.`,
  'privacy.usage.title': '2. كيفية استخدام المعلومات',
  'privacy.usage.content': `نستخدم المعلومات لأغراض مشروعة، مثل:
- تحسين تجربة التصفح والمحتوى
- تحليل الأداء والمحتوى الأكثر قراءة
- الرد على استفساراتك أو ملاحظاتك
- إرسال التحديثات أو المستجدات (بموافقتك فقط)`,
  'privacy.cookies.title': '3. ملفات تعريف الارتباط (Cookies)',
  'privacy.cookies.content': 'يستخدم الموقع ملفات تعريف الارتباط لتخصيص تجربتك وتحليل الأداء. يمكنك دائمًا تعديل تفضيلاتك من إعدادات المتصفح أو إلغاء تفعيل الكوكيز.',
  'privacy.protection.title': '4. حماية البيانات',
  'privacy.protection.content': 'نلتزم باتخاذ التدابير الفنية والتنظيمية المعقولة لحماية بياناتك، بما يتوافق مع القوانين المحلية. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية.',
  'privacy.links.title': '5. روابط خارجية',
  'privacy.links.content': 'قد يحتوي موقعنا على روابط لمواقع خارجية. لا نتحمل أي مسؤولية عن ممارسات الخصوصية لهذه المواقع.',
  'privacy.rights.title': '6. حقوق المستخدم',
  'privacy.rights.content': 'يحق لك في أي وقت طلب الوصول إلى بياناتك، تصحيحها، حذفها، أو سحب موافقتك على تلقي الرسائل. مراسلتنا على: Contact-gulfcoop-horizons@......ae',
  'privacy.law.title': '7. القانون الواجب التطبيق',
  'privacy.law.content': 'تخضع هذه السياسة لقوانين دولة الإمارات العربية المتحدة، خصوصًا المرسوم بقانون اتحادي رقم 34 لسنة 2021 بشأن مكافحة الشائعات والجرائم الإلكترونية، والمرسوم بقانون رقم 55 لسنة 2023 بشأن تنظيم الإعلام.',
  'privacy.changes.title': '8. التعديلات على سياسة الخصوصية',
  'privacy.changes.content': 'قد نقوم بتحديث هذه السياسة من وقت إلى آخر. سيتم نشر التحديثات على هذه الصفحة مع تاريخ التعديل. نوصيك بمراجعتها دوريًا.',
  'privacy.contact': '📬 للاتصال بنا: Contact-gulfcoop-horizons@......ae',

  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.article': 'Articles',
    'nav.projects': 'Initiatives',
    'nav.resources': 'Ressources',
    'nav.services': 'Nos services',
    'nav.contact': 'Contact',
    'nav.login':'se connecter',
    'nav.logout':'déconnecter',
'nav.site6': 'Accueil',
'nav.site7': 'À propos',
'nav.site8': 'Articles',
'nav.site9': 'Initiatives',
'nav.site10': 'Ressources',
'loading.pleaseWait':'Veuillez patienter',

    
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
    
    'nav.site1': 'Conseil de coopération du Golfe',
'nav.site2': 'Union des associations coopératives de consommation du Koweït',
'nav.site3': 'Conseil de coopération du Golfe',
'nav.site4': 'Organisation internationale du travail',
'nav.site5': 'Département des affaires économiques et sociales des Nations Unies',



    // Blog Section
    'blog.title': 'Dernières Informations et Histoires',
    'blog.subtitle': 'Restez informé des dernières tendances, histoires de succès et perspectives d\'experts du mouvement coopératif du Golfe.',
    'blog.readMore': 'Lire Plus',
    'blog.viewAll': 'Voir Tous les Articles',
    'blog.author': 'Par',
    'blog.readTime': 'min de lecture',
    'backToProjects': 'Retour aux articles',

    'register.close':'Fermer',

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
    'footer.usefullLinks': 'Liens utiles',

    'footer.gulfRegion': 'Région du Golfe',
    'footer.newsletter': 'Rester Connecté',
    'footer.newsletterDescription': 'Recevez les dernières mises à jour sur les développements coopératifs dans la région du Golfe.',
    'footer.emailPlaceholder': 'Entrez votre email',
    'footer.subscribe': 'S\'abonner',
    'footer.copyright': '© 2025 Afaq - Plateforme des Coopératives du Golfe. Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions de Service',
    'footer.cookies': 'Cookies',
    'footer.address': 'Adresse',
    'footer.email': 'Email',
    'footer.phone': 'Téléphone',
    'footer.workingHours': 'Heures de Travail',
    
    // About Page - French
    'about.title': 'À propos d\'AFAQ',
    'about.subtitle': 'Plateforme des Coopératives du Golfe',
    'about.vision.title': 'Vision',
    'about.vision.text': 'Être une référence de premier plan et une plateforme efficace pour la durabilité et le développement du travail coopératif dans les pays du Golfe.',
    'about.mission.title': 'Mission',
    'about.mission.text': 'Notre mission consiste à :',
    'about.mission.point1': 'Diffuser les connaissances, promouvoir la culture coopérative et partager les meilleures pratiques',
    'about.mission.point2': 'Encourager le réseautage et offrir des espaces pour l\'interaction, l\'échange d\'expériences et d\'idées autour des perspectives du travail coopératif dans les pays du Golfe',
    'about.mission.point3': 'Soutenir l\'identité coopérative en vue d\'une plus grande intégration du travail coopératif local et régional au sein du mouvement mondial',
    'about.mission.point4': 'Faire la veille des éléments essentiels de l\'environnement des coopératives et œuvrer pour la mise en place de politiques et initiatives de soutien',
    'about.mission.point5': 'Contribuer au développement de l\'entrepreneuriat social durable et adopter des mécanismes propices à l\'épanouissement des individus et à la construction de sociétés justes et solidaires',
    'about.offer.title': 'Ce que nous proposons',
    'about.offer.texts': 'Textes explicatifs et articles d\'analyse',
    'about.offer.textsDesc': 'Articles analytiques sur le travail coopératif',
    'about.offer.studies': 'Études et travaux de recherche',
    'about.offer.studiesDesc': 'Papiers de recherche sur le développement coopératif',
    'about.offer.interviews': 'Interviews et présentations d\'expériences',
    'about.offer.interviewsDesc': 'Interviews d\'experts et expériences inspirantes',
    'about.offer.legal': 'Textes juridiques et guides pratiques',
    'about.offer.legalDesc': 'Guides pratiques et opérationnels',
    'about.offer.news': 'Couvertures de l\'actualité coopérative',
    'about.offer.newsDesc': 'Mises à jour des nouvelles du secteur coopératif',
    'about.scope.title': 'Périmètre',
    'about.scope.text': 'Le contenu couvre les six pays membres du Conseil de coopération des États arabes du Golfe (CCEAG), tout en s\'ouvrant à d\'autres pays du monde arabe et au niveau international.',
    'about.scope.sources': 'Il s\'appuie sur des sources officielles et fiables, tout en respectant une ligne éditoriale objective et alignée avec les visions fondamentales des institutions spécialisées dans le domaine coopératif.',
    'about.team.title': 'Équipe',
    'about.team.text': 'Le blog AFAQ des Coopératives du Golfe repose sur une équipe passionnée par le travail coopératif, imprégnée des valeurs et principes de l\'identité coopérative, et consciente de sa dimension profondément humaine.',
    'about.team.experience': 'Expérience professionnelle depuis 2016 au Koweït',
    'about.team.languages': 'Maîtrise les langues arabe, française et anglaise',
    'about.team.diversity': 'Dotée d\'une richesse culturelle variée',
    'about.team.mission': 'L\'équipe s\'intéresse aux diverses expériences et sources de connaissance, en suivant de près l\'évolution du secteur coopératif dans les pays du Golfe et au-delà, au niveau arabe et international. Ils collectent, organisent et analysent les ressources et contributions diverses, en vue de les rendre accessibles, tout en cherchant à établir des partenariats avec différents acteurs pour servir la vision et la mission du blog.',
    'about.contact.title': 'Contact',
    'about.contact.email': 'Contact-gulfcoop-horizons@......ae',
    'about.contact.suggest': 'Proposer des sujets',
    'about.contact.share': 'Partager des articles, témoignages ou autres documents',
    'about.contact.questions': 'Envoyer une question ou une demande de service',
    'about.contact.feedback': 'Faire part d\'un avis ou demander une correction',
    'about.contact.btn': 'Contactez-nous',
    'about.contact.legal': 'Mentions légales',
    'resources.no_content':'Aucun contenu disponible',



    
    // Projects Page
    'projects.title': 'Initiatives',
    'projects.subtitle': 'Transformer les Communautés grâce à l\'Innovation Coopérative',
    'projects.viewAll': 'Voir Tous les Initiatives',
    'projects.learnMore': 'En Savoir Plus',
    'projects.participants': 'participants',
    'projects.status.active': 'Actif',
    'projects.status.completed': 'Terminé',
    'projects.status.inProgress': 'En Cours',
    'backToArticles': 'Retour aux initiatives',

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
    'contact.info.email': 'info@afaq-gulf.org',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'Dimanche - Jeudi: 9h00 - 18h00\nVendredi - Samedi: Fermé',
"contact.sending": "Envoi en cours...",
"contact.successMessage": "Message envoyé avec succès !",
"contact.errorMessage": "Une erreur est survenue. Veuillez réessayer.",

"footer.subscribeSuccess": "E-mail de confirmation envoyé !",
"footer.subscribeError": "Échec de l'inscription.",
"footer.invalidEmail": "Veuillez entrer une adresse e-mail valide.",
'footer.sitemap': 'Plan du site',
    'sitemap.title': 'Plan du site',
    'sitemap.mainPages': 'Pages principales du site',
    'sitemap.externalResources': 'Ressources externes',
    'sitemap.additionalInfo': 'Informations supplémentaires',
    'sitemap.description': 'Ce plan de site répertorie toutes les pages et ressources importantes disponibles sur notre plateforme. Utilisez-le pour naviguer facilement et découvrir tout le contenu disponible.',

    'login.title': 'Connexion',
    'login.subtitle': 'Veuillez vous connecter pour télécharger des ressources et accéder au contenu premium.',
    'login.email': 'Email',
    'login.emailPlaceholder': 'Entrez votre email',
    'login.password': 'Mot de passe',
    'login.passwordPlaceholder': 'Entrez votre mot de passe',
    'login.submit': 'Se connecter',
    'login.switchToRegister': 'Vous n’avez pas de compte ? Inscrivez-vous',
    'login.forgotPassword': 'Mot de passe oublié ?',
'register.title': 'Inscription',
'register.subtitle': 'Veuillez créer un compte pour continuer.',
'register.fullName': 'Nom complet',
'register.fullNamePlaceholder': 'Entrez votre nom complet',
'register.confirmPassword': 'Confirmer le mot de passe',
'register.confirmPasswordPlaceholder': 'Confirmez votre mot de passe',
'register.submit': 'S’inscrire',
'register.switchToLogin': 'Vous avez déjà un compte ? Connectez-vous',


'aboutAuthor': 'À propos de l’auteur',
'authorDescription': 'est un expert en développement coopératif et en pratiques commerciales durables dans la région du Golfe',



"register.accept": "J'accepte la",
"register.privacyPolicy": "Politique de confidentialité",
"register.error.acceptPrivacy": "Vous devez accepter la politique de confidentialité",

'privacy.title': 'Politique de confidentialité',
  'privacy.lastUpdated': 'Dernière mise à jour : Juin 2025',
  'privacy.intro': 'Le blog AFAQ Gulf Cooperatives s’engage à protéger la vie privée de ses visiteurs. Cette page explique comment nous collectons, utilisons, partageons et sécurisons vos informations.',
  'privacy.info.title': '1. Informations que nous collectons',
  'privacy.info.content': 'Nous pouvons collecter deux types d’informations :\na) Données non personnelles : collectées automatiquement lors de votre visite, incluant l’adresse IP, le type de navigateur et d’appareil, les pages visitées, la date et l’heure de visite, la source de référence.\nb) Données personnelles : collectées uniquement si vous les fournissez volontairement via des formulaires (contact, commentaires), pouvant inclure le nom, l’e-mail, le pays ou toute autre information volontairement fournie.',
  'privacy.usage.title': '2. Utilisation des informations',
  'privacy.usage.content': 'Les informations collectées sont utilisées à des fins légitimes, telles que l’amélioration de l’expérience de navigation, l’analyse des performances, la réponse à vos demandes et l’envoi de mises à jour (avec votre consentement).',
  'privacy.cookies.title': '3. Cookies & Suivi',
  'privacy.cookies.content': 'Le site utilise des cookies pour personnaliser votre expérience et analyser les performances. Vous pouvez accepter, personnaliser ou désactiver les cookies dans les paramètres de votre navigateur.',
  'privacy.protection.title': '4. Protection des données',
  'privacy.protection.content': 'Nous prenons des mesures techniques et organisationnelles raisonnables pour protéger vos données conformément aux lois locales. Nous ne vendons ni ne partageons vos données personnelles avec des tiers à des fins marketing.',
  'privacy.links.title': '5. Liens externes',
  'privacy.links.content': 'Notre site peut contenir des liens vers des sites externes. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites tiers.',
  'privacy.rights.title': '6. Droits des utilisateurs',
  'privacy.rights.content': 'Vous avez le droit d’accéder à vos données, de les corriger, de demander leur suppression et de retirer votre consentement pour recevoir des communications. Contact : Contact-gulfcoop-horizons@......ae',
  'privacy.law.title': '7. Droit applicable',
  'privacy.law.content': 'Cette politique est régie par les lois des Émirats arabes unis, y compris le décret-loi fédéral n°34/2021 sur la cybercriminalité et le décret n°55/2023 sur la régulation des médias.',
  'privacy.changes.title': '8. Modifications de la politique de confidentialité',
  'privacy.changes.content': 'Cette politique peut être mise à jour périodiquement. Les mises à jour seront publiées sur cette page avec la date de révision. Nous recommandons de la consulter régulièrement.',
  'privacy.contact': 'Pour toute question relative à la confidentialité, veuillez nous contacter à : Contact-gulfcoop-horizons@......ae'




  },
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

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