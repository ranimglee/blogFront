import React, { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const menuItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.article', href: '/article' },
    { key: 'nav.resources', href: '/resources' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="bg-gulf-primary backdrop-blur-md fixed w-full top-0 z-50 border-b border-gulf-light">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 flex items-center justify-center">
              <img
                src="/lovable-uploads/aef43724-883d-4580-8f95-576adc701eaa.png"
                alt="Sawa Palm Logo"
                className="w-6 h-6 md:w-8 object-contain brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">AFAQ</h1>
              <p className="text-xs text-gulf-gold hidden sm:block">Gulf Cooperatives</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center rtl:space-x-reverse xl:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`text-white hover:text-gulf-gold font-medium transition-colors relative group text-sm xl:text-base rtl-nav-link ${
                  location.pathname === item.href ? 'text-gulf-gold' : ''
                }`}
              >
                {t(item.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gulf-gold transition-all duration-300 ${
                    location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="w-4 h-4 sm:w-5 text-white" />
            </button>
            <LanguageSelector />
            
            {/* Desktop Login/Logout */}
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors"
                >
                  {t('nav.logout')}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors"
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

     {/* Mobile Menu Dropdown (instead of fixed fullscreen) */}
{isMenuOpen && (
  <div className="lg:hidden absolute left-0 right-0 top-full bg-gulf-primary border-t border-white/10 shadow-lg z-40">
    <div className="px-4 py-6">
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.href}
            className={`text-white hover:text-gulf-gold font-medium transition-colors text-base border-b border-white/10 pb-2 ${
              location.pathname === item.href ? 'text-gulf-gold' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t(item.key)}
          </Link>
        ))}

        {/* Mobile Login/Logout */}
        {isAuthenticated ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="mt-4 px-4 py-2 bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors w-full"
          >
            {t('nav.logout')}
          </button>
        ) : (
          <Link
            to="/login"
            className="mt-4 px-4 py-2 bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.login')}
          </Link>
        )}
      </nav>
    </div>
  </div>
)}

      </div>
    </header>
  );
};

export default Header;
