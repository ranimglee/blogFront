import React from 'react';
import { MapPin, Mail, Link, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Twitter', url: '#', icon: <Twitter className="w-5 h-5" /> },
    { name: 'YouTube', url: '#', icon: <Youtube className="w-5 h-5" /> },
    { name: 'Instagram', url: '#', icon: <Instagram className="w-5 h-5" /> },
  ];

  const quickLinks = [
    { nameKey: 'nav.site1', href: 'https://www.gcc-sg.org/' },
    { nameKey: 'nav.site2', href: 'https://kuccs.com.kw/Portal/' },
    { nameKey: 'nav.site3', href: 'https://ica.coop' },
    { nameKey: 'nav.site4', href: 'https://www.ilo.org/topics/cooperatives' },
    { nameKey: 'nav.site5', href: 'https://social.desa.un.org/issues/cooperatives' },
  ];

  const countries = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Kuwait',
    'Qatar',
    'Bahrain',
    'Oman',
  ];

  return (
    <footer className="bg-gulf-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/aef43724-883d-4580-8f95-576adc701eaa.png" 
                  alt="Sawa Palm Logo" 
                  className="w-10 h-10 object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sawa</h3>
                <p className="text-gulf-gold text-sm">Gulf Cooperatives</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gulf-primary transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Gulf Countries */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.gulfRegion')}</h4>
            <ul className="space-y-3">
              {countries.map((country) => (
                <li key={country}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.newsletter')}</h4>
            <p className="text-white/70 mb-4">
              {t('footer.newsletterDescription')}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gulf-gold"
              />
              <button className="w-full bg-gulf-primary hover:bg-gulf-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;