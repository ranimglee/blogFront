import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gulf-dark mb-4 sm:mb-6">
            {t('hero.title')}
            <span className="bg-gradient-to-r from-gulf-primary to-gulf-gold bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
            {t('hero.titleEnd')}
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl text-gulf-dark mb-6 sm:mb-8">
            {t('hero.subtitle')}
          </h2>
          
          <p className="text-base sm:text-lg text-gulf-dark/70 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/about"
              className="px-6 py-3 bg-gulf-primary text-white hover:bg-gulf-primary/90 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              {t('hero.learnBtn')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
