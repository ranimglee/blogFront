import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
                {t('privacy.title') || 'Privacy Policy'}
              </h1>

              <p className="text-sm text-gulf-dark/60 mb-12 text-center italic">
                {t('privacy.lastUpdated') || 'Last updated: June 2025'}
              </p>

              <div className="prose max-w-4xl mx-auto text-gulf-dark/80 space-y-10">
                <p className="text-lg leading-relaxed">
                  {t('privacy.intro')}
                </p>

                {[
                  { title: t('privacy.info.title'), content: t('privacy.info.content') },
                  { title: t('privacy.usage.title'), content: t('privacy.usage.content') },
                  { title: t('privacy.cookies.title'), content: t('privacy.cookies.content') },
                  { title: t('privacy.protection.title'), content: t('privacy.protection.content') },
                  { title: t('privacy.links.title'), content: t('privacy.links.content') },
                  { title: t('privacy.rights.title'), content: t('privacy.rights.content') },
                  { title: t('privacy.changes.title'), content: t('privacy.changes.content') },
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h2 className="text-2xl font-semibold text-gulf-primary mb-3">
                      {section.title}
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
                  </motion.div>
                ))}

                <div className="pt-6 border-t border-gulf-light/40">
                  <h2 className="text-2xl font-semibold text-gulf-primary mb-3">
                    {t('privacy.contactTitle') || 'Contact Us'}
                  </h2>
                  <p className="whitespace-pre-line leading-relaxed">
                    {t('privacy.contact') || 'If you have any questions about this privacy policy, please contact us.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
