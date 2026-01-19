import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gulf-white flex flex-col">
      <Header />

      <main className="pt-24 flex-1">
        <section className="py-16 bg-gulf-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark text-center mb-6">
                {t('terms.title')}
              </h1>

              <p className="text-sm text-gulf-dark/60 mb-12 text-center italic">
                {t('terms.lastUpdated')}
              </p>

              <div className="prose max-w-4xl mx-auto text-gulf-dark/80 space-y-10">
                <p className="text-lg leading-relaxed">
                  {t('terms.intro')}
                </p>

                {[
                  'status',
                  'content',
                  'sources',
                  'translations',
                  'methodology',
                  'responsibility',
                  'law',
                  'updates',
                ].map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h2 className="text-2xl font-semibold text-gulf-primary mb-3">
                      {t(`terms.${key}.title`)}
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed">
                      {t(`terms.${key}.content`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
