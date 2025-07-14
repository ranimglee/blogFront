
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gulf-secondary/20 to-gulf-white/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gulf-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gulf-gold/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gulf-dark mb-6 leading-tight">
            {t('hero.title')}
            <span className="bg-gradient-to-r from-gulf-primary to-gulf-gold bg-clip-text text-transparent"> {t('hero.titleHighlight')} </span>
            {t('hero.titleEnd')}
          </h1>
          
          {/* Subheading */}
          <h2 className="text-base sm:text-xl md:text-2xl text-gulf-dark/80 mb-8 font-light">
            {t('hero.subtitle')}
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gulf-dark/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                          <Link to={`/about`}>
          
            <button className="btn-accent">
              {t('hero.learnBtn')}
            </button>
            </Link>
          </div>
          
          {/* Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gulf-primary mb-2">500+</div>
              <div className="text-gulf-dark/70">{t('hero.stats.cooperatives')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gulf-gold mb-2">6</div>
              <div className="text-gulf-dark/70">{t('hero.stats.countries')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gulf-coral mb-2">50K+</div>
              <div className="text-gulf-dark/70">{t('hero.stats.members')}</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
       
      </div>
    </section>
  );
};

export default Hero;
