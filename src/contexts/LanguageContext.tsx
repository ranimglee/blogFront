
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
    "auth.loginRequiredDownload": "You must log in to download this file.",
  
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
'nav.site3': 'International Cooperative Alliance',
'nav.site4': 'International Labour Organization - cooperatives portal',
'nav.site5': 'United Nations Department of Economic and Social Affairs',
"register.country": "Country",
  "register.phoneNumber": "Phone Number",
  "register.countryPlaceholder": "Select your country",
    'nav.login':'Login',
    'nav.logout':'Logout',
'resources.searchPlaceholder':'type to search',
    'nav.site6': 'Home',
    'nav.site7': 'About',
    'nav.site8': 'Articles',
    'nav.site9': 'Initiatives',
    'nav.site10': 'Resources',
'register.close':'Close',
"forgotPassword.title": "Forgot Password",
  "forgotPassword.email": "Email address",
  "forgotPassword.emailPlaceholder": "Enter your email address",
  "forgotPassword.requestCode": "Send reset code",
  "forgotPassword.code": "Verification code",
  "forgotPassword.codePlaceholder": "Enter the code received by email",
  "forgotPassword.newPassword": "New password",
  "forgotPassword.newPasswordPlaceholder": "Enter your new password",
  "forgotPassword.confirmPassword": "Confirm password",
  "forgotPassword.confirmPasswordPlaceholder": "Confirm your new password",
  "forgotPassword.resetPassword": "Reset password",
  "forgotPassword.codeSent": "A reset code has been sent to your email address.",
  "forgotPassword.successReset": "Your password has been successfully reset.",
  "forgotPassword.errorRequest": "An error occurred while sending the code. Please try again.",
  "forgotPassword.errorReset": "An error occurred while resetting the password.",
  "forgotPassword.passwordMismatch": "Passwords do not match.",
  "forgotPassword.switchToLogin": "Remember your password? Sign in",
    "minRead": "min read",

    // Hero Section
    'hero.title': 'Afaq',
    'hero.titleHighlight': 'Gulf',
    'hero.titleEnd': '-cooperatives',
    'hero.subtitle': 'For Sustainable Development and Just Societies: Explore, Connect, and transform',
    'hero.description': 'Explore the cooperative movement in the Arab Gulf countries, discover innovations and experiences on a global scale, connect stakeholders, experts, and all those interested in cooperatives, look to the future, and promote positive change.',
    'hero.exploreBtn': 'Explore Cooperatives',
    'hero.learnBtn': 'Learn More',
    'hero.stats.cooperatives': 'Cooperatives',
    'hero.stats.countries': 'Gulf Countries',
    'hero.stats.members': 'Cooperative Members',
    // Comments
'comments.title': 'Comments',
'comments.leaveComment': 'Leave a Comment',
'comments.comment': 'Comment',
'comments.submit': 'Submit',
'comments.noComments': 'No approved comments yet.',
'comments.success': 'Comment submitted! It will appear after approval.',
'comments.error': 'Please write a comment.',
'comments.loginRequired': 'You must login to comment',
'blog.searchPlaceholder':'Search',
    // Blog Section
    'blog.title': 'Articles',
    'blog.title.latest': 'Latest Publications',
    'blog.subtitle': 'Stay updated with the latest trends, success stories, and expert insights from the Gulf cooperative movement.',
    'blog.readMore': 'Read More',
    'blog.viewAll': 'View All Articles',
    'blog.author': 'By',
    'blog.readTime': 'min read',
   'projects.noDescription':'No description available',
  "resources.category.legal": "Legal",
  "resources.category.data": "Data",
  "resources.category.diverse": "Diverse",
  "resources.category.studies": "Studies",
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
    "login.loading": "Signing in..." ,
    "register.loading": "Signing up...",
    // Footer
    'footer.description': 'For Sustainable Development and Just Societies: Explore, Connect, and transform.',
    'footer.quickLinks': 'Quick Access',
    'footer.usefullLinks': 'Usefull Links ',

    'footer.gulfRegion': 'Gulf Region',
    'footer.newsletter': 'Stay Connected',
    'footer.newsletterDescription': 'Get the latest updates on cooperative developments in the Gulf region.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': '© 2025 Afaq - Afaq-Gulf cooperatives blog. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.cookies': 'Cookies',
    'footer.address': 'Address',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.workingHours': 'Working Hours',
    "footer.invalidEmail": "Please enter a valid email.",
"footer.subscribeSuccess": "Confirmation email sent!",
    "footer.subscribeError": "Subscription failed.",
    "footer.loading": "Subscribing...",

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
    'about.vision.text': 'To be a trusted reference and an influential platform for the sustainability and development of cooperatives in the Arab Gulf countries.',
    'about.mission.title': 'Mission',
    'about.mission.text': 'Our mission is to strengthen the cooperative movement through:',
    'about.mission.point1': 'Disseminate knowledge, promote cooperative culture, and share best practices',
    'about.mission.point2': 'Encourage networking and provide spaces for interaction and exchange of experiences',
    'about.mission.point3': 'Continuously promoting the elements of cooperative identity to support better integration into the global cooperative movement.',
    'about.mission.point4': 'Conduct active monitoring and expert analysis of changes in cooperatives\' working environments.',
    'about.mission.point5': 'Actively support social and sustainable entrepreneurship initiatives to promote personal growth and the well-being of fair and inclusive communities.',
    'about.offer.title': 'Content',
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
    'about.scope.text': 'Our content covers the six member states of the Gulf Cooperation Council, while also reaching out to other Arab countries and international contexts.',
    'about.scope.sources': 'Based on official and reliable sources, following an objective editorial line aligned with cooperative work institutions.',
    'about.team.title': 'Our Team',
    'about.team.text': 'Our team is passionate about cooperative work, deeply committed to the values and principles of the cooperative identity, and fully aware of its strong human dimension. We understand the unique needs and cultural nuances of local communities and recognize the important economic impact that cooperatives have in empowering local economies. Fluent in Arabic, English, and French, we are committed to precision and professionalism to deliver meaningful, impactful work. ',
    'about.team.experience': 'Professional experience since 2016 in Kuwait',
    'about.team.diversity': '',
    'about.team.mission': 'The blog content helps make resources and knowledge easily accessible, share updates, initiatives, and contributions from the Gulf countries as well as from the regional and international levels, and develop partnerships with various stakeholders to support the vision and mission.',
    'about.contact.title': 'Contact Us',
    'about.contact.email': 'gulfcoopafaq@gmail.com',
    'about.contact.suggest': 'Suggest topics',
    'about.contact.share': 'Share articles & testimonials',
    'about.contact.questions': 'Send questions or requests',
    'about.contact.feedback': 'Provide feedback',
    'about.contact.btn': 'Contact Us',
    'about.contact.legal': 'Legal Notice',
    'about.contact.leg': 'Legal Notice',
   'preview.contactTooltip':"Pour signaler un problème ou discuter de ce document, veuillez nous contacter.",


  
    
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
    'resources.title': 'Resources ',
    'resources.subtitle': 'Essential Tools and Guides for Cooperative Success',
    'resources.download': 'Download',
    'resources.viewAll': 'View All Resources',
    'resources.filter.all': 'All',
    'resources.filter.legal': 'Legal',
    'resources.filter.data': 'Finance',
    'resources.filter.diverse': 'Governance',
    'resources.filter.studies': 'Case Studies',
 "resources.download_success": "Download completed successfully.",
  "resources.download_error": "Download failed. Please try again.",
  "resources.downloading": "Downloading...",
  "resources.no_content": "No content available.",
  "resources.login_required": "You must login to download this file.",

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
    'contact.info.email': 'gulfcoopafaq@gmail.com',
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

"login.error.invalidEmail": "Please enter a valid email address.",
  "login.error.invalidPassword": "Password must be at least 6 characters long.",
  "login.error.invalid": "Invalid email or password.",
  "login.error.banned": "Your account has been banned.",
  "login.error.tooManyAttempts": "Too many failed attempts. Try again later.",
    "login.error.notActive": "Your account is not active yet.",

  "login.error.generic": "An error occurred during login. Please try again.",
  "login.success": "Login successful!",

  "register.error.invalidFullName": "Please enter your full name.",
  "register.error.invalidEmail": "Please enter a valid email address.",
  "register.error.invalidPassword": "Password must be at least 6 characters long.",
  "register.error.passwordMismatch": "Passwords do not match.",
  "register.error.invalidCountry": "Please select your country.",
  "register.error.invalidPhone": "Please enter your phone number.",
  "register.error.generic": "An error occurred during registration. Please try again.",
  "register.success": "Registration successful!",

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
  'privacy.rights.content': 'You have the right, at any time, to request access, correction, or deletion of your data, or withdraw consent for communications. Contact us at: gulfcoopafaq@gmail.com',
  'privacy.law.title': '7. Applicable Law',
  'privacy.law.content': 'This policy is governed by the laws of the United Arab Emirates, specifically Federal Decree-Law No. 34 of 2021 on Combating Rumors and Cybercrime, and Federal Decree-Law No. 55 of 2023 on Media Regulation.',
  'privacy.changes.title': '7. Changes to the Privacy Policy',
  'privacy.changes.content': 'This policy may be updated from time to time. Any changes will be posted on this page along with the update date. We recommend reviewing it regularly.',
  'privacy.contact': 'For any privacy-related inquiries, please contact us at: gulfcoopafaq@gmail.com',
'privacy.contactTitle':'Contact details',
"register.error.emailExists": "This email is already in use",
"register.error.phoneExists": "This phone number is already in use",
    'projects.searchPlaceholder':'Search intiatives',
    'projects.allCountries':'All',
    'projects.activeSearch':'Search',

  "footer.successMessage": "You have successfully subscribed!",
  "footer.errorMessage": "Subscription failed. Please try again.",
// EN
"footer.alreadySubscribed": "This email is already subscribed",
  "terms.title": "Terms of Use",

    "title": "Terms of Use",
    "terms.lastUpdated": "Last updated: January 2026",
    "terms.intro": "These terms govern the use of the Afaq Gulf Cooperatives website.",

      "terms.status.title": "1. Site Status",
      "terms.status.content": "The Afaq Gulf Cooperatives website is registered as a published work under intellectual property laws in Kuwait, owned by Ali Abassi...\n\nThe owner manages and edits the site with the assistance of a qualified editorial team.\n\nContributions from third-party authors are published under their full responsibility and are clearly identified.",
    
      "terms.content.title": "2. Nature of Published Content",
      "terms.content.content": "The website may include:\n• Official legal texts...\n• Documents from international organizations...\n• Original articles and analyses...\n\nContent does not constitute legal or professional advice.",
    

   
      "terms.sources.title": "3. Sources and Reproduction Rights",
      "terms.sources.content": "Documents are sourced from official public institutions...\n\nUnless stated otherwise, content may be shared provided that the source Afaq – Gulf Cooperatives is mentioned and the meaning is not altered."
    ,

    
      "terms.translations.title": "4. Translations",
      "terms.translations.content": "Translations provided are personal and unofficial...\n\nOnly the original version is authoritative."
    ,

   
      "terms.methodology.title": "5. Editorial Methodology",
      "terms.methodology.content": "Clear distinction between documents and editorial content...\nNeutral and informative presentation."
    ,

    "resources.preview": "Preview",

      "terms.responsibility.title": "6. Responsibility",
      "terms.responsibility.content": "The site does not guarantee completeness...\nUse of content is at the reader’s own responsibility."
    ,

   
      "terms.law.title": "7. Applicable Law",
      "terms.law.content": "The site is subject to Kuwaiti intellectual property law...\nInternational law may also apply."
    ,


      "terms.updates.title": "8. Updates",
      "terms.updates.content": "These terms may evolve to accommodate site development and legal changes.",

 "preview.loading": "Loading preview…",

   'resources.subCategory.all':'All',
  'resources.subCategory.national':'National',
     'resources.subCategory.international':'International',
     'resources.subCategory.kuwait':'Kuwait',
     'resources.subCategory.oman':'Oman',
     'resources.subCategory.emirates':'Emirates',

     'resources.subCategory.saudi_arabia':'Saudi Arabia',

     'resources.subCategory.bahrain':'Bahrain',

     'resources.subCategory.qatar':'Qatar',
      'resources.subCategory.opinions':'Opinions',
      'resources.subCategory.other':'Other',
       'resources.subCategory.case_law':'Case Law',
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
    'projects.searchPlaceholder':'ابحث ',
"comments.loginRequired": "يجب تسجيل الدخول لإضافة تعليق.",
"register.error.emailExists": "هذا البريد الإلكتروني مستخدم بالفعل",
"register.error.phoneExists": "رقم الهاتف هذا مستخدم بالفعل",


// AR
"footer.alreadySubscribed": "هذا البريد الإلكتروني مشترك بالفعل",

    'nav.site1': 'مجلس التعاون لدول الخليج العربية',
    'nav.site2': 'اتحاد الجمعيات التعاونية الاستهلاكية بدولة الكويت',
    'nav.site3': 'التحالف التعاوني الدولي',
    'nav.site4': 'منظمة العمل الدولية بوابة التعاونيات',
    'nav.site5': 'قسم الشؤون الاقتصادية والاجتماعية بالأمم المتحدة',
'nav.site6': 'الرئيسية',
'nav.site7': 'من نحن',
'nav.site8': 'مقالات',
'nav.site9': 'مبادرات',
'nav.site10': 'موارد',
    'projects.allCountries':'الكل',
    'projects.activeSearch':'بحث',
    'blog.searchPlaceholder':'بحث',


"login.loading": "جارٍ تسجيل الدخول...",
"register.loading": "جارٍ إنشاء الحساب...",
    // Hero Section
    'hero.title': 'آفاق',
    'hero.titleHighlight': 'تعاونيات',
    'hero.titleEnd': ' الخليج',
    'hero.subtitle': 'من أجل تنمية مستدامة ومجتمعات عادلة: نستكشف، نتواصل، نطوّر',
    'hero.description': 'استكشاف الحركة التعاونية في دول الخليج العربية، التعرّف على المستجدات والتجارب على المستوى العالمي، ربط العلاقة مع الفاعلين والخبراء وجميع المهتمين بالعمل التعاوني، التطلع إلى التغيير الإيجابي من أجل مستقبل أفضل.',
    'hero.exploreBtn': 'استكشف التعاونيات',
    'hero.learnBtn': 'اعرف المزيد',
    'hero.stats.cooperatives': 'تعاونيات ',
    'hero.stats.countries': 'مجلس التعاون لدول الخليج العربية',
    'hero.stats.members': 'أعضاء مساهمين',
    
    // Blog Section
    'blog.title':' المقالات ',
    'blog.title.latest': 'أحدث المنشورات',
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
    'footer.description': 'من أجل تنمية مستدامة ومجتمعات عادلة: نستكشف، نتواصل، نطوّر',
    'footer.quickLinks': 'تصفح سريع',
    'footer.usefullLinks': 'روابط مفيدة',

    'footer.gulfRegion': 'منطقة الخليج',
    'footer.newsletter': 'ابق على اتصال',
    'footer.newsletterDescription': 'احصل على أحدث التطورات حول تطوير التعاونيات في منطقة الخليج.',
    'footer.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.copyright': '© 2025 آفاق - مدونة التعاونيات لدول الخليج العربية. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    'footer.cookies': 'ملفات تعريف الارتباط',
    'footer.address': 'العنوان',
    'footer.email': 'البريد الإلكتروني',
    'footer.phone': 'الهاتف',
    'footer.workingHours': 'ساعات العمل',
    
    // About Page - Arabic
    'about.title': 'عن آفاق',
    'about.subtitle': 'منصة تعاونيات الخليج',
    'about.vision.title': 'الرؤية',
    'about.vision.text': 'أن نكون مرجعا موثوقا ومنصة مؤثرة لاستدامة وتطوير عمل التعاونيات في دول الخليج العربية.',
    'about.mission.title': 'الرسالة',
    'about.mission.text': 'تتمثل رسالتنا في:',
    'about.mission.point1': 'نشر المعرفة وتعزيز الثقافة التعاونية ومشاركة الممارسات الفضلى',
    'about.mission.point2': 'تشجيع التشبيك وتوفير مجالات لتبادل التجارب والرؤى والتفاعل حول آفاق العمل التعاوني في دول الخليج العربية',
    'about.mission.point3': ' التعريف المتواصل بعناصر الهوية التعاونية من أجل اندماج أفضل في الحركة التعاونية العالمية',
    'about.mission.point4': 'توفير المتابعة اليقظة والدراسة المتخصصة للمستجدات في بيئة العمل التعاوني ',
    'about.mission.point5': 'التفاعل البنّاء مع التطلعات نحو ريادة الأعمال الاجتماعية والمستدامة من أجل تنمية الأفراد وازدهار المجتمعات المتماسكة والعادلة.',
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
    'about.team.text':'فريقنا شغوف بالعمل التعاوني متشبع بقيم ومبادئ الهوية التعاونية ملمّ ببعدها الإنساني الراسخ. نحن نعي الخصوصيات الثقافية للمجتمعات المحلية كما ندرك الأثر الاقتصادي المهم للتعاونيات في تمكين اقتصاداتها. فريقنا يتقن العربية والإنجليزية والفرنسية، ويعتمد الدقة والاحترافية لتقديم عمل هادف وذي أثر ملموس ويتميّز بأبعاد ثقافية متعدّدة.',
    'about.team.experience': 'خبرة مهنية منذ سنة 2016 في دولة الكويت',
    'about.team.mission': 'يُتيح محتوى المدونة الموارد والمصادر المعرفية بطريقة مبسطة، ويقدّم المستجدات والإسهامات والمبادرات المتنوعة في دول الخليج العربية وعلى المستويين الإقليمي والدولي، ويسعى إلى إنشاء شراكات مع مختلف الفاعلين خدمةً للرؤية والرسالة.',
    'about.contact.title': 'للتواصل معنا',
    'about.contact.email': 'gulfcoopafaq@gmail.com',
    'about.contact.suggest': 'اقتراح موضوعات',
    'about.contact.share': 'مشاركة مقالات أو تجارب أو مواد علمية',
    'about.contact.questions': 'إرسال استفسار أو طلب خدمة',
    'about.contact.feedback': 'تقديم رأي أو طلب تصحيح خطأ',
    'about.contact.btn': 'اتصل بنا',
    'about.contact.legal': 'الإشعارات القانونية',
     "resources.category.legal": "قانونية",
      "resources.category.data": "أرقام وبيانات",
      "resources.category.diverse": "موارد مختلفة",
      "resources.category.studies": "دراسات",

 
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
// التعليقات
'comments.title': 'التعليقات',
'comments.leaveComment': 'أضف تعليقًا',
'comments.comment': 'التعليق',
'comments.submit': 'إرسال',
'comments.noComments': 'لا توجد تعليقات معتمدة بعد.',
'comments.success': 'تم إرسال التعليق! سيظهر بعد الموافقة.',
'comments.error': 'يرجى كتابة تعليق.',
    "auth.loginRequiredDownload": "يجب تسجيل الدخول لتحميل هذا الملف.",

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
    'resources.filter.data': 'أرقام وبيانات',
    'resources.filter.diverse': 'موارد مختلفة',
    'resources.filter.studies': 'دراسات',
      "resources.preview": "معاينة",
 "preview.loading": "جاري تحميل المعاينة…",
  
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
    'contact.info.email': 'gulfcoopafaq@gmail.com',
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
"login.error.invalidEmail": "يرجى إدخال بريد إلكتروني صالح.",
  "login.error.invalidPassword": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
  "login.error.invalid": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
  "login.error.banned": "تم حظر حسابك.",
  "login.error.tooManyAttempts": "عدد كبير جدًا من المحاولات الفاشلة. حاول لاحقًا.",
  "login.error.generic": "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.",
  "login.success": "تم تسجيل الدخول بنجاح!",
    "login.error.notActive": "حسابك غير مُفعل بعد.",

  "register.error.invalidFullName": "يرجى إدخال الاسم الكامل.",
  "register.error.invalidEmail": "يرجى إدخال بريد إلكتروني صالح.",
  "register.error.invalidPassword": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
  "register.error.passwordMismatch": "كلمتا المرور غير متطابقتين.",
  "register.error.invalidCountry": "يرجى اختيار بلدك.",
  "register.error.invalidPhone": "يرجى إدخال رقم الهاتف.",
  "register.error.generic": "حدث خطأ أثناء التسجيل. حاول مرة أخرى.",
  "register.success": "تم التسجيل بنجاح!",
"contact.sending": "جارٍ الإرسال...",
"contact.successMessage": "تم إرسال الرسالة بنجاح!",
"contact.errorMessage": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
"footer.subscribeSuccess": "تم إرسال بريد التأكيد!",
    "footer.subscribeError": "فشل في الاشتراك.",
    "footer.invalidEmail": "يرجى إدخال بريد إلكتروني صالح.",
    'footer.sitemap': 'خريطة الموقع',
"minRead": "دقائق قراءة",

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
  'privacy.rights.content': 'يحق لك في أي وقت طلب الوصول إلى بياناتك، تصحيحها، حذفها، أو سحب موافقتك على تلقي الرسائل. مراسلتنا على: gulfcoopafaq@gmail.com',
  'privacy.law.title': '7. القانون الواجب التطبيق',
  'privacy.law.content': 'تخضع هذه السياسة لقوانين دولة الإمارات العربية المتحدة، خصوصًا المرسوم بقانون اتحادي رقم 34 لسنة 2021 بشأن مكافحة الشائعات والجرائم الإلكترونية، والمرسوم بقانون رقم 55 لسنة 2023 بشأن تنظيم الإعلام.',
  'privacy.changes.title': '7. التعديلات على سياسة الخصوصية',
  'privacy.changes.content': 'قد نقوم بتحديث هذه السياسة من وقت إلى آخر. سيتم نشر التحديثات على هذه الصفحة مع تاريخ التعديل. نوصيك بمراجعتها دوريًا.',
  'privacy.contact': '📬 للاتصال بنا: gulfcoopafaq@gmail.com',
'privacy.contactTitle':'للاتصال',

  "forgotPassword.title": "نسيت كلمة المرور",
  "forgotPassword.email": "البريد الإلكتروني",
  "forgotPassword.emailPlaceholder": "أدخل بريدك الإلكتروني",
  "forgotPassword.requestCode": "إرسال رمز إعادة التعيين",
  "forgotPassword.code": "رمز التحقق",
  "forgotPassword.codePlaceholder": "أدخل الرمز الذي تم إرساله إلى بريدك الإلكتروني",
  "forgotPassword.newPassword": "كلمة المرور الجديدة",
  "forgotPassword.newPasswordPlaceholder": "أدخل كلمة المرور الجديدة",
  "forgotPassword.confirmPassword": "تأكيد كلمة المرور",
  "forgotPassword.confirmPasswordPlaceholder": "أعد إدخال كلمة المرور الجديدة",
  "forgotPassword.resetPassword": "إعادة تعيين كلمة المرور",
  "forgotPassword.codeSent": "تم إرسال رمز إعادة التعيين إلى بريدك الإلكتروني.",
  "forgotPassword.successReset": "تمت إعادة تعيين كلمة المرور بنجاح.",
  "forgotPassword.errorRequest": "حدث خطأ أثناء إرسال الرمز. يرجى المحاولة مرة أخرى.",
  "forgotPassword.errorReset": "حدث خطأ أثناء إعادة تعيين كلمة المرور.",
  "forgotPassword.passwordMismatch": "كلمتا المرور غير متطابقتين.",
  "forgotPassword.switchToLogin": "هل تتذكر كلمة المرور؟ سجّل الدخول",

"footer.successMessage": "تم الاشتراك بنجاح!",
"footer.errorMessage": "فشل الاشتراك. الرجاء المحاولة مرة أخرى.",
"footer.loading": "جارٍ الاشتراك...",
"register.country": "البلد",
  "register.phoneNumber": "رقم الهاتف",
  "register.countryPlaceholder": "اختر بلدك",
   "resources.download_success": "اكتمل التحميل بنجاح.",
  "resources.download_error": "فشل التحميل. يرجى المحاولة مرة أخرى.",
  "resources.downloading": "جارٍ التحميل...",
  "resources.login_required": "يجب تسجيل الدخول لتحميل هذا الملف.",
    'projects.noDescription':'لا يوجد وصف متاح',

  "terms.title": "شروط الاستخدام",
  "title": "شروط الاستخدام",
"terms.lastUpdated": "آخر تحديث: يناير 2026",
  "terms.intro": "تنظم هذه الشروط استخدام موقع آفاق تعاونيات الخليج.",
  "terms.status.title": "1. حالة الموقع",
  "terms.status.content": "يُعتبر موقع آفاق تعاونيات الخليج عملًا منشورًا ومسجلًا وفقًا لقوانين الملكية الفكرية في الكويت، باسم المالك علي عباسي، ووفقًا للتشريعات الكويتية السارية المتعلقة بحقوق النشر والملكية الفكرية.\n\nيقوم المالك بتحرير وإدارة الموقع بمساعدة فريق تحرير مؤهل.\n\nالمساهمات التي يقدمها مؤلفون آخرون تُنشر تحت مسؤوليتهم الكاملة وتتم الإشارة إليها بوضوح.",

  "terms.content.title": "2. طبيعة المحتوى المنشور",
  "terms.content.content": "قد يحتوي الموقع على:\n\nنصوص قانونية رسمية (القوانين، اللوائح، القرارات، التصريحات) من مصادر عامة؛\nمستندات صادرة عن منظمات دولية حكومية؛\nمستندات عامة من منظمات دولية غير حكومية، عند سماح شروط النشر بذلك؛\nترجمات للوثائق الرسمية؛\nمقالات وتحليلات ومساهمات أصلية من إعداد إدارة الموقع أو مؤلفين آخرين؛\nتقارير وعروض لمبادرات مرتبطة بالحركة التعاونية.\n\nلا يشكل محتوى الموقع استشارة أو نصيحة قانونية أو مهنية.",

  "terms.sources.title": "3. المصادر وحقوق النسخ",
  "terms.sources.content": "3.1 المصادر\n\nيتم الحصول على المستندات المنشورة أو المشار إليها في الموقع، قدر الإمكان، من مصادر رسمية وعامة ومعروفة (الجريدة الرسمية، المواقع المؤسسية، المنظمات الدولية).\n\nيتم ذكر لكل مستند:\n\nمصدره؛\nالمؤلف أو المؤسسة الناشرة؛\nتاريخ النشر، ورقم المرجع الرسمي عند وجوده.\n\n3.2 حقوق النشر وإعادة الاستخدام\n\nالنصوص القانونية الرسمية والمستندات العامة تُستخدم لأغراض إعلامية وتعليمية؛\n\nبعض المستندات قد تكون محمية بحقوق خاصة؛ في هذه الحالة، يتم تقييد النسخ أو تتم الإشارة إلى المصدر الرسمي؛\n\nالمقالات والتحليلات والتقارير المنشورة ملك الموقع ومحمية بموجب حقوق النشر وفقا لشروط الاستخدام.\n\nما لم يُذكر خلاف ذلك صراحة، يمكن مشاركة محتويات الموقع بشرط:\n\nالإشارة بوضوح إلى المصدر آفاق تعاونيات الخليج\nعدم تغيير معنى المحتوى؛\nاحترام سياق وأهداف الموقع الإعلامية وغير التجارية.",

  "terms.translations.title": "4. الترجمات",
  "terms.translations.content": "4.1 الترجمات الشخصية\n\nعندما يقدم الموقع ترجمة:\n\nفهي شخصية وغير رسمية؛\nتُقدَّم لأغراض إعلامية وتعليمية؛\nالنسخة الأصلية فقط هي المعتمدة.\n\n4.2 الترجمات الرسمية\n\nإذا كانت هناك ترجمة رسمية متاحة ويُسمح بنشرها، فستكون موضحة كمصدر رسمي مع الإشارة إلى المصدر.",

  "terms.methodology.title": "5. المنهجية التحريرية",
  "terms.methodology.content": "يطبق الموقع المبادئ التالية:\n\nالتمييز بين المستندات الرسمية والترجمات والمحتوى التحريري؛\nالفصل بين النص الأصلي والتعليقات أو التحليلات؛\nالالتزام بمصداقية المصادر وعدم تغيير المعنى؛\nالشفافية حول أصل وطبيعة ووضع المحتوى؛\nالحيادية المعلوماتية في عرض النصوص والبيانات.",

  "terms.responsibility.title": "6. المسؤولية",
  "terms.responsibility.content": "على الرغم من العناية في اختيار وترجمة وتحديث المحتوى:\n\nلا يضمن الموقع اكتمال أو تحديث المعلومات بشكل دائم؛\nاستخدام المحتوى يتم على مسؤولية القارئ وحده.\n\nالموقع لا يتحمل أي مسؤولية عن استخدام المعلومات المنشورة.",

  "terms.law.title": "7. القانون الواجب التطبيق والإطار القانوني",
  "terms.law.content": "يخضع موقع آفاق تعاونيات الخليج لقوانين الملكية الفكرية وحقوق النشر الكويتية.\n\nونظرًا للطبيعة الدولية للموقع واستضافته في السحابة، قد تخضع بعض الاستخدامات أيضًا:\n\nلقواعد القانون الدولي المتعلقة بالملكية الفكرية، بما في ذلك الاتفاقيات الدولية المصدق عليها؛\nوإذا لزم الأمر، لتشريعات الدول الأصلية للوثائق الرسمية المنشورة.\n\nفي حال حدوث نزاع، يُنصح باللجوء للتواصل وحل النزاعات وديًا مع مراعاة الطابع الإعلامي وغير التجاري للموقع.",
"resources.searchPlaceholder": "اكتب للبحث",

  "terms.updates.title": "8. تحديث الشروط",
  "terms.updates.content": "قد تتغير هذه الشروط ومنهجية التحرير لتتناسب مع:\n\nتطوير الموقع؛\nإضافة أنواع محتوى جديدة؛\nمواكبة التطورات القانونية والمؤسسية.",
   'preview.contactTooltip':"للإبلاغ عن مشكلة أو مناقشة هذا المستند، يرجى التواصل معنا.",

'resources.subCategory.all': 'الكل',
'resources.subCategory.national': 'وطنية',
'resources.subCategory.international': 'دولية',
'resources.subCategory.emirates': 'الإمارات العربية المتحدة',
'resources.subCategory.bahrain': 'البحرين',
'resources.subCategory.saudi_arabia': 'المملكة العربية السعودية',
'resources.subCategory.oman': 'عُمان',
'resources.subCategory.qatar': 'قطر',
'resources.subCategory.kuwait': 'الكويت',

'resources.subCategory.case_law': 'أحكام قضائية',
'resources.subCategory.opinions': 'آراء وفتاوى',
'resources.subCategory.other': 'أخرى',



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
  "register.error.emailExists": "Cet email est déjà utilisé",
    "register.error.phoneExists": "Ce numéro de téléphone est déjà utilisé",
      "register.country": "Pays",
  "register.phoneNumber": "Numéro de téléphone",
  "register.countryPlaceholder": "Sélectionnez votre pays",
    // Hero Section
    'hero.title': 'Afaq',
    'hero.titleHighlight': 'Gulf-',
    'hero.titleEnd': 'cooperatives',
    'hero.subtitle': 'Pour un développement durable et des sociétés justes : Explorer, Connecter, transformer',
    'hero.description': 'Explorer le mouvement coopératif dans les pays arabes du Golfe, découvrir les innovations et les expériences à l\'échelle mondiale, mettre en relation les acteurs, les experts et toutes les personnes intéressées par le travail coopératif, s\'orienter vers l\'avenir et promouvoir un changement positif.',
    'hero.exploreBtn': 'Explorer les Coopératives',
    'hero.learnBtn': 'En savoir plus',
    'hero.stats.cooperatives': 'Coopératives',
    'hero.stats.countries': 'Pays du Golfe',
    'hero.stats.members': 'Membres coopérateurs',
    
    'nav.site1': 'Conseil de coopération du Golfe',
'nav.site2': 'Union des associations coopératives de consommation du Koweït',
'nav.site3': 'Alliance coopérative internationale',
'nav.site4': 'Organisation internationale du travail – Portail des cooperatives',
'nav.site5': 'Département des affaires économiques et sociales des Nations Unies',

    'projects.allCountries':'Tous',

 
    // Blog Section
    'blog.title': 'Articles',
    'blog.title.latest': 'Dernières Publications',

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
    // French
"login.loading": "Connexion en cours...",
"register.loading": "Inscription en cours...",
    // Footer
    'footer.description': 'Pour un développement durable et des sociétés justes : Explorer, Connecter, transformer.',
    'footer.quickLinks': 'Accès rapide',
    'footer.usefullLinks': 'Liens utiles',

    'footer.gulfRegion': 'Région du Golfe',
    'footer.newsletter': 'Rester Connecté',
    'footer.newsletterDescription': 'Recevez les dernières mises à jour sur les développements coopératifs dans la région du Golfe.',
    'footer.emailPlaceholder': 'Entrez votre email',
    'footer.subscribe': 'S\'abonner',
    'footer.copyright': '© 2025 Afaq - Afaq- blog des cooperatives du Golfe. Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d’utilisation',
    'footer.cookies': 'Cookies',
    'footer.address': 'Adresse',
    'footer.email': 'Email',
    'footer.phone': 'Téléphone',
    'footer.workingHours': 'Heures de Travail',
    
    // About Page - French
    'about.title': 'À propos d\'AFAQ',
    'about.subtitle': 'Plateforme des Coopératives du Golfe',
    'about.vision.title': 'Vision',
    'about.vision.text': 'Être une référence fiable et une plateforme influente pour la durabilité et le développement des coopératives dans les pays arabes du Golfe.',
    'about.mission.title': 'Mission',
    'about.mission.text': 'Notre mission consiste à :',
    'about.mission.point1': 'Diffuser les connaissances, promouvoir la culture coopérative et partager les meilleures pratiques',
    'about.mission.point2': 'Encourager le réseautage et offrir des espaces pour l\'interaction, l\'échange d\'expériences et d\'idées autour des perspectives du travail coopératif dans les pays du Golfe',
    'about.mission.point3': 'Divulguer de façon continue les éléments de l\'identité coopérative afin de favoriser une meilleure intégration au sein du mouvement coopératif mondial.',
    'about.mission.point4': 'Assurer une veille active et une analyse spécialisée des évolutions de l’environnement de travail des coopératives.',
    'about.mission.point5': 'Interagir positivement avec les initiatives d’entrepreneuriat social et durable pour promouvoir l’épanouissement des individus et la cohésion de communautés équitables. ',
    'about.offer.title': 'Contenu',
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
    'about.scope.text': 'Le contenu couvre les six pays membres du Conseil de coopération des États arabes du Golfe, tout en s\'ouvrant à d\'autres pays du monde arabe et au niveau international.',
    'about.scope.sources': 'Il s\'appuie sur des sources officielles et fiables, tout en respectant une ligne éditoriale objective et alignée avec les visions fondamentales des institutions spécialisées dans le domaine coopératif.',
    'about.team.title': 'Équipe',
    'about.team.text': 'Notre équipe est passionnée par le travail coopératif, profondément engagée dans les valeurs et les principes de l’identité coopérative, et pleinement consciente de sa forte dimension humaine. Nous comprenons les besoins spécifiques et les nuances culturelles des communautés locales et reconnaissons l’importance de l’impact économique des coopératives dans le renforcement des économies locales. Maîtrisant l’arabe, l’anglais et le français, nous nous engageons à faire preuve de rigueur et professionnalisme pour réaliser un travail significatif et impactant.',
    'about.team.experience': 'Expérience professionnelle depuis 2016 au Koweït',
    'about.team.diversity': 'Dotée d\'une richesse culturelle variée',
    'about.team.mission': 'Le contenu du blog permet de rendre les ressources et les connaissances faciles d’accès, de partager les nouveautés, les initiatives et les contributions dans les pays du Golfe, ainsi qu’au niveau régional et international, et de développer des partenariats avec différents acteurs pour soutenir la vision et la mission.',
    'about.contact.title': 'Contact',
    'about.contact.email': 'gulfcoopafaq@gmail.com',
    'about.contact.suggest': 'Proposer des sujets',
    'about.contact.share': 'Partager des articles, témoignages ou autres documents',
    'about.contact.questions': 'Envoyer une question ou une demande de service',
    'about.contact.feedback': 'Faire part d\'un avis ou demander une correction',
    'about.contact.btn': 'Contactez-nous',
    'about.contact.legal': 'Mentions légales',
    'resources.no_content':'Aucun contenu disponible',

    'projects.searchPlaceholder':'Rechercher des initiatives',

    'projects.noDescription':'Aucune description disponible',

    
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
    'resources.title': 'Ressources ',
    'resources.subtitle': 'Outils et Guides Essentiels pour le Succès Coopératif',
    'resources.download': 'Télécharger',
    'resources.viewAll': 'Voir Toutes les Ressources',
    'resources.filter.all': 'Tous',
    'resources.filter.legal': 'Juridique',
    'resources.filter.finance': 'Finance',
    'resources.filter.governance': 'Gouvernance',
    'resources.filter.caseStudies': 'Études de Cas',
      "resources.download_success": "Téléchargement terminé avec succès.",
  "resources.download_error": "Échec du téléchargement. Veuillez réessayer.",
  "resources.downloading": "Téléchargement en cours...",
  "resources.login_required": "Vous devez vous connecter pour télécharger ce fichier.",
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
    'contact.info.email': 'gulfcoopafaq@gmail.com',
    'contact.info.phone': '+971 XX XXX XXXX',
    'contact.info.workingHours': 'Dimanche - Jeudi: 9h00 - 18h00\nVendredi - Samedi: Fermé',
"contact.sending": "Envoi en cours...",
"contact.successMessage": "Message envoyé avec succès !",
"contact.errorMessage": "Une erreur est survenue. Veuillez réessayer.",

"footer.subscribeSuccess": "E-mail de confirmation envoyé !",
"footer.subscribeError": "Échec de l'inscription.",
"footer.invalidEmail": "Veuillez entrer une adresse e-mail valide.",
'footer.sitemap': 'Plan du site',
"footer.loading": "Abonnement en cours...",

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

    "login.error.invalidEmail": "Veuillez saisir une adresse e-mail valide.",
  "login.error.invalidPassword": "Le mot de passe doit contenir au moins 6 caractères.",
  "login.error.invalid": "E-mail ou mot de passe invalide.",
  "login.error.banned": "Votre compte a été banni.",
  "login.error.tooManyAttempts": "Trop de tentatives échouées. Réessayez plus tard.",
  "login.error.generic": "Une erreur s’est produite lors de la connexion. Veuillez réessayer.",
  "login.success": "Connexion réussie !",
    "login.error.notActive": "Votre compte n’est pas encore activé.",

  "register.error.invalidFullName": "Veuillez saisir votre nom complet.",
  "register.error.invalidEmail": "Veuillez saisir une adresse e-mail valide.",
  "register.error.invalidPassword": "Le mot de passe doit contenir au moins 6 caractères.",
  "register.error.passwordMismatch": "Les mots de passe ne correspondent pas.",
  "register.error.acceptPrivacy": "Vous devez accepter la politique de confidentialité.",
  "register.error.invalidCountry": "Veuillez sélectionner votre pays.",
  "register.error.invalidPhone": "Veuillez saisir votre numéro de téléphone.",
  "register.error.generic": "Une erreur s’est produite lors de l’inscription. Veuillez réessayer.",
  "register.success": "Inscription réussie !",
'register.title': 'Inscription',
'register.subtitle': 'Veuillez créer un compte pour continuer.',
'register.fullName': 'Nom complet',
'register.fullNamePlaceholder': 'Entrez votre nom complet',
'register.confirmPassword': 'Confirmer le mot de passe',
'register.confirmPasswordPlaceholder': 'Confirmez votre mot de passe',
'register.submit': 'S’inscrire',
'register.switchToLogin': 'Vous avez déjà un compte ? Connectez-vous',
"forgotPassword.title": "Mot de passe oublié",
  "forgotPassword.email": "Adresse e-mail",
  "forgotPassword.emailPlaceholder": "Entrez votre adresse e-mail",
  "forgotPassword.requestCode": "Envoyer le code de réinitialisation",
  "forgotPassword.code": "Code de vérification",
  "forgotPassword.codePlaceholder": "Entrez le code reçu par e-mail",
  "forgotPassword.newPassword": "Nouveau mot de passe",
  "forgotPassword.newPasswordPlaceholder": "Entrez votre nouveau mot de passe",
  "forgotPassword.confirmPassword": "Confirmez le mot de passe",
  "forgotPassword.confirmPasswordPlaceholder": "Confirmez votre nouveau mot de passe",
  "forgotPassword.resetPassword": "Réinitialiser le mot de passe",
  "forgotPassword.codeSent": "Le code de réinitialisation a été envoyé à votre adresse e-mail.",
  "forgotPassword.successReset": "Votre mot de passe a été réinitialisé avec succès.",
  "forgotPassword.errorRequest": "Une erreur est survenue lors de l’envoi du code. Veuillez réessayer.",
  "forgotPassword.errorReset": "Une erreur est survenue lors de la réinitialisation du mot de passe.",
  "forgotPassword.passwordMismatch": "Les mots de passe ne correspondent pas.",
  "forgotPassword.switchToLogin": "Vous vous souvenez de votre mot de passe ? Connectez-vous",
    'projects.activeSearch':'Recherche',
'blog.searchPlaceholder':'Recherche',
  "resources.preview": "Aperçu",


// Commentaires
'comments.title': 'Commentaires',
'comments.leaveComment': 'Laisser un commentaire',
'comments.comment': 'Commentaire',
'comments.submit': 'Envoyer',
'comments.noComments': 'Aucun commentaire approuvé pour le moment.',
'comments.success': 'Commentaire envoyé ! Il apparaîtra après validation.',
'comments.error': 'Veuillez écrire un commentaire.',
'comments.loginRequired': 'Vous devez vous connecter pour commenter',

'aboutAuthor': 'À propos de l’auteur',
'authorDescription': 'est un expert en développement coopératif et en pratiques commerciales durables dans la région du Golfe',

"minRead": "min de lecture",


"register.accept": "J'accepte la",
"register.privacyPolicy": "Politique de confidentialité",

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
  'privacy.rights.content': 'Vous avez le droit d’accéder à vos données, de les corriger, de demander leur suppression et de retirer votre consentement pour recevoir des communications. Contact : gulfcoopafaq@gmail.com',
  'privacy.law.title': '7. Droit applicable',
  'privacy.law.content': 'Cette politique est régie par les lois des Émirats arabes unis, y compris le décret-loi fédéral n°34/2021 sur la cybercriminalité et le décret n°55/2023 sur la régulation des médias.',
  'privacy.changes.title': '7. Modifications de la politique de confidentialité',
  'privacy.changes.content': 'Cette politique peut être mise à jour périodiquement. Les mises à jour seront publiées sur cette page avec la date de révision. Nous recommandons de la consulter régulièrement.',
  'privacy.contact': 'Pour toute question relative à la confidentialité, veuillez nous contacter à : gulfcoopafaq@gmail.com'
,'privacy.contactTitle':'Contact',

"footer.successMessage": "Vous vous êtes abonné avec succès !",
"footer.errorMessage": "Échec de l'abonnement. Veuillez réessayer.",

// FR
"footer.alreadySubscribed": "Cet email est déjà inscrit",

  "terms.lastUpdated": "Dernière mise à jour : Janvier 2026",
  "terms.intro": "Les présentes conditions régissent l’utilisation du site Afaq Coopératives du Golfe.",

  "terms.title": "Règles et conditions d’utilisation",
  "title": "Règles et conditions d’utilisation",

  "terms.status.title": "1. Statut du site",
  "terms.status.content": "Afaq est un site enregistré en tant qu’œuvre et structure de publication au titre de la propriété intellectuelle au Koweït, au nom de son propriétaire Ali Abassi, conformément à la législation koweïtienne en vigueur relative au droit d’auteur et à la propriété intellectuelle.\n\nLe propriétaire assure l’édition et l’administration du blog avec l’appui d’une équipe éditoriale qualifiée.\n\nLes contributions d’auteurs tiers sont publiées sous leur entière responsabilité et font l’objet d’une identification explicite.",

  "terms.content.title": "2. Nature des contenus publiés",
  "terms.content.content": "Le site peut notamment contenir :\n\ndes textes juridiques officiels (lois, règlements, décisions, déclarations) issus de sources publiques ;\ndes documents émanant d’organisations internationales gouvernementales ;\ndes documents publics d’organisations internationales non gouvernementales, lorsque les conditions de diffusion le permettent ;\ndes traductions de documents officiels ;\ndes articles, analyses et contributions originales rédigés par l’administrateur du site ou par d’autres auteurs ;\ndes reportages et présentations d’initiatives liées au mouvement coopératif.\n\nLes contenus publiés sur le site ne constituent en aucun cas un conseil juridique, institutionnel ou professionnel.",

  "terms.sources.title": "3. Sources et droits de reproduction",
  "terms.sources.content": "3.1 Sources\n\nLes documents reproduits ou cités sur le site proviennent, dans la mesure du possible, de sources officielles, publiques et identifiées (journaux officiels, sites institutionnels, organisations internationales, etc.).\n\nChaque document mentionne, lorsque cela est possible :\n\nsa source ;\nson auteur ou l’institution émettrice ;\nsa date de publication et, le cas échéant, sa référence officielle.\n\n3.2 Droit d’auteur et réutilisation\n\nLes textes juridiques officiels et documents publics sont reproduits à des fins d’information et d’éducation.\n\nCertains documents peuvent rester soumis à des droits institutionnels spécifiques ; dans ce cas, leur reproduction est limitée ou remplacée par un lien vers la source officielle.\n\nLes articles, analyses et reportages originaux publiés sur le site sont protégés par le droit d’auteur.\n\nSauf indication contraire explicite, les contenus du site peuvent être partagés à condition de :\n\nmentionner clairement la source Afaq – Gulf cooperatives ;\nne pas altérer le sens du contenu ;\nrespecter le contexte et l’objectif informatif et non commercial du site.",

  "terms.translations.title": "4. Traductions",
  "terms.translations.content": "4.1 Traductions personnelles\n\nLorsque le site propose une traduction :\n\ncelle-ci est personnelle et non officielle ;\nelle est fournie à titre informatif et pédagogique ;\nseule la version originale fait foi.\n\nChaque traduction est accompagnée d’une mention explicite indiquant son caractère non officiel.\n\n4.2 Traductions officielles\n\nLorsqu’une traduction officielle existe et que sa reproduction est autorisée, elle est clairement signalée comme telle et accompagnée de sa source.",

  "terms.methodology.title": "5. Méthodologie éditoriale",
  "terms.methodology.content": "Le site applique les principes suivants :\n\ndistinction claire entre documents officiels, traductions et contenus éditoriaux ;\nséparation entre le texte original et les commentaires ou analyses ;\nfidélité aux sources, sans modification du sens des documents ;\ntransparence quant à l’origine, la nature et le statut des contenus ;\nneutralité informative dans la présentation des textes et des données.",

  "terms.responsibility.title": "6. Responsabilité",
  "terms.responsibility.content": "Malgré le soin apporté à la sélection, à la traduction et à la mise à jour des contenus :\n\nle site ne garantit pas l’exhaustivité ni l’actualisation permanente des informations ;\nl’utilisation des contenus se fait sous la responsabilité exclusive du lecteur.\n\nLe site décline toute responsabilité quant à l’usage qui pourrait être fait des informations publiées.",

  "terms.law.title": "7. Loi applicable et cadre juridique",
  "terms.law.content": "Le site Afaq Gulf Coop est enregistré au Koweït et relève, en tant que structure de publication, de la législation koweïtienne relative à la propriété intellectuelle, au droit d’auteur et aux publications.\n\nEn raison de la nature internationale du site, de son hébergement dans le cloud et de la diversité de l’origine des contenus publiés, certaines utilisations peuvent également être soumises :\n\naux règles du droit international applicables en matière de propriété intellectuelle, notamment les conventions internationales ratifiées ;\net, le cas échéant, aux législations des pays d’origine des documents officiels reproduits.\n\nEn cas de difficulté ou de contestation, les parties sont invitées à privilégier une approche de dialogue et de résolution amiable, dans le respect du caractère informatif et non commercial du site.",
 "preview.loading": "Chargement de l’aperçu…",

  "terms.updates.title": "8. Évolution du cadre",
  "terms.updates.content": "Les présentes conditions d’utilisation et la méthodologie éditoriale sont susceptibles d’évoluer afin de :\n\naccompagner le développement du site ;\nintégrer de nouveaux types de contenus ;\ntenir compte des évolutions juridiques et institutionnelles.",
"resources.searchPlaceholder": "Tapez pour rechercher",
 "resources.category.legal": "Juridique",
  "resources.category.data": "Données",
  "resources.category.diverse": "Divers",
  "resources.category.studies": "Études",
   "auth.loginRequiredDownload": "Veuillez vous connecter pour télécharger ce fichier.",
   'preview.contactTooltip':"Pour signaler un problème ou discuter de ce document, veuillez nous contacter.",
   'resources.subCategory.all':'tous',
  'resources.subCategory.national':'National',
     'resources.subCategory.international':'International',
     'resources.subCategory.kuwait':'Koweit',
     'resources.subCategory.oman':'Oman',
     'resources.subCategory.emirates':'Émirats arabes unis',

     'resources.subCategory.saudi_arabia':'Arabie Saoudite',

     'resources.subCategory.bahrain':'Bahreïn',

     'resources.subCategory.qatar':'Qatar',


      'resources.subCategory.opinions':'Opinions',
      'resources.subCategory.other':'Autres',
       'resources.subCategory.case_law':'Jurisprudence',



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