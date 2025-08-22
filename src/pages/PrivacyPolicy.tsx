import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gulf-white flex flex-col">
      <Header />

      <main className="pt-20 flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-8 text-center">
              {t('privacy.title') || 'Privacy Policy'}
            </h1>

            <p className="text-sm text-gulf-dark/70 mb-6 text-center">
              {t('privacy.lastUpdated') || 'Last updated: June 2025'}
            </p>

            <div className="prose max-w-none mx-auto text-gulf-dark/80 space-y-6">
              <p>{t('privacy.intro')}</p>

              <h2>{t('privacy.info.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.info.content')}</p>

              <h2>{t('privacy.usage.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.usage.content')}</p>

              <h2>{t('privacy.cookies.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.cookies.content')}</p>

              <h2>{t('privacy.protection.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.protection.content')}</p>

              <h2>{t('privacy.links.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.links.content')}</p>

              <h2>{t('privacy.rights.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.rights.content')}</p>

              <h2>{t('privacy.law.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.law.content')}</p>

              <h2>{t('privacy.changes.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.changes.content')}</p>

              <h2>{t('privacy.contact')}</h2>
              <p className="whitespace-pre-line">{t('privacy.contact')}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
