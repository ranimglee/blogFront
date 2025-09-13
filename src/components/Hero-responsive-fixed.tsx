import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gulf-secondary/20 to-gulf-white/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-4 sm:right-20 w-32 h-32 sm:w-64 sm:h-64 bg-gulf-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-4 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gulf-gold/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Main Heading - Fixed for Arabic */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gulf-dark mb-4 sm:mb-6 leading-tight break-words">
            <span className="inline-block">{t('hero.title')}</span>
            <span className="bg-gradient-to-r from-gulf-primary to-gulf-gold bg-clip-text text-transparent inline-block mx-1"> {t('hero.titleHighlight')} </span>
            <span className="inline-block">{t('hero.titleEnd')}</span>
          </h1>
          
          {/* Subheading - Fixed for Arabic */}
          <h2 className="text-lg sm:text-xl md:text-2xl text-gulf-dark/80 mb-6 sm:mb-8 font-light break-words">
            {t('hero.subtitle')}
          </h2>
          
          {/* Description - Fixed for Arabic */}
          <p className="text-base sm:text-lg text-gulf-dark/70 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed break-words">
            {t('hero.description')}
          </p>
          
          {/* CTA Buttons - Fixed for Arabic */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16">
            <Link to="/about">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gulf-primary text-white hover:bg-gulf-primary/90 rounded-lg font-medium transition-colors text-sm sm:text-base">
                {t('hero.learnBtn')}
              </button>
            </Link>
          </div>
          
          {/* Stats - Fixed for Arabic */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gulf-primary mb-1 sm:mb-2">500+</div>
              <div className="text-gulf-dark/70 text-sm sm:text-base">{t('hero.stats.cooperatives')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gulf-gold mb-1 sm:mb-2">6</div>
              <div className="text-gulf-dark/70 text-sm sm:text-base">{t('hero.stats.countries')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gulf-coral mb-1 sm:mb-2">50K+</div>
              <div className="text-gulf-dark/70 text-sm sm:text-base">{t('hero.stats.members')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
