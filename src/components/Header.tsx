import React, { useEffect, useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  useEffect(() => {
    // Check if token exists in localStorage to determine authentication status
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const menuItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.article', href: '/article' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.resources', href: '/resources' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-gulf-primary backdrop-blur-md fixed w-full top-0 z-50 border-b border-gulf-light">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/lovable-uploads/aef43724-883d-4580-8f95-576adc701eaa.png"
                alt="Sawa Palm Logo"
                className="w-10 h-10 object-contain brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AFAK</h1>
              <p className="text-xs text-gulf-gold">Gulf Cooperatives</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`text-white hover:text-gulf-gold font-medium transition-colors relative group ${
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
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            <LanguageSelector />
            {/* Login/Logout Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors"
              >
                {t('nav.logout')}
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors"
              >
                {t('nav.login')}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-3 pt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`text-white hover:text-gulf-gold font-medium transition-colors py-2 ${
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
                  className="px-4 py-2 bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors mt-2"
                >
                  {t('nav.logout')}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gulf-gold text-gulf-dark hover:bg-gulf-gold/90 rounded-lg transition-colors mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;