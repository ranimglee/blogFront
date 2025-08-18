import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Link as LinkIcon,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const { t } = useLanguage();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const menuItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.article', href: '/article' },
    { key: 'nav.resources', href: '/resources' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const footerLinks = [
    { key: 'nav.site1', href: 'https://www.gcc-sg.org/' },
    { key: 'nav.site2', href: 'https://kuccs.com.kw/Portal/' },
    { key: 'nav.site3', href: 'https://ica.coop' },
    { key: 'nav.site4', href: 'https://www.ilo.org/topics/cooperatives' },
    { key: 'nav.site5', href: 'https://social.desa.un.org/issues/cooperatives' },
  ];

  return (
<footer className="bg-gulf-dark text-white" dir="auto">
      <div className="container mx-auto px-4 py-12 md:py-16" dir="auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" dir="auto">
          {/* Brand & Description */}
          <div className="lg:col-span-1" dir="auto">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4" dir="auto">
              <div className="w-10 h-10 flex items-center justify-center" dir="auto">
                <img
                  src="/lovable-uploads/aef43724-883d-4580-8f95-576adc701eaa.png"
                  alt="Sawa Palm Logo"
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
              <div dir="auto">
                <h3 className="text-xl font-bold" dir="auto">Sawa</h3>
                <p className="text-xs text-gulf-gold" dir="auto">Gulf Cooperatives</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed text-sm" dir="auto">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3 rtl:space-x-reverse" dir="auto">
              {[Linkedin, Twitter, Youtube, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.usefullLinks')}</h4>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <RouterLink
                    to={item.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center text-sm"
                  >
                    <LinkIcon className="w-3 h-3 mr-2" />
                    {t(item.key)}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer External Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {footerLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors flex items-center text-sm"
                  >
                    <LinkIcon className="w-3 h-3 mr-2" />
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.newsletter')}</h4>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gulf-gold text-sm"
              />
              <button className="w-full bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors py-2 text-sm">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Modal */}
        {showPrivacyModal && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={() => setShowPrivacyModal(false)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-4xl h-[80vh] p-6 relative shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-4 right-4 text-gray-900 hover:text-black text-2xl font-bold"
                aria-label="Close modal"
              >
                ×
              </button>
              <iframe
                src="/privacy-policy.pdf"
                title="Privacy Policy"
                className="w-full h-full border-none rounded"
              />
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {t('footer.privacy')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </footer>
  );
};

export default Footer;
