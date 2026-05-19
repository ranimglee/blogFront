import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white via-gulf-secondary/20 to-gulf-white py-16 sm:py-20 lg:py-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="absolute top-10 start-8 h-56 w-56 rounded-full bg-gulf-gold/20 blur-3xl"
        animate={{ y: [0, 14, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 end-12 h-72 w-72 rounded-full bg-gulf-primary/10 blur-3xl"
        animate={{ y: [0, -16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gulf-primary/15 bg-white/80 px-4 py-2 text-sm font-medium text-gulf-primary shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>{t('home.testimonials.organization')}</span>
          </div>

          <h2 className="text-3xl font-bold leading-tight text-gulf-dark sm:text-4xl lg:text-5xl">
            {t('home.testimonials.title')}
          </h2>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-10 max-w-4xl sm:mt-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="absolute inset-x-6 top-6 h-full rounded-3xl bg-gulf-primary/5" />
          <div className="absolute inset-x-12 top-12 h-full rounded-3xl bg-gulf-gold/10" />

          <motion.article
            className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-2xl shadow-gulf-dark/10 backdrop-blur-md transition-shadow duration-300 hover:shadow-gulf-dark/15 sm:p-8 lg:p-10"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="absolute end-8 top-8 h-24 w-24 rounded-full bg-gulf-secondary/60 blur-2xl" />

            <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gulf-primary text-white shadow-lg shadow-gulf-primary/20 md:mx-0">
                <Quote className={`h-8 w-8 ${isRtl ? 'scale-x-100' : '-scale-x-100'}`} />
              </div>

              <div className="text-center md:text-start">
                <blockquote className="text-xl font-medium leading-9 text-gulf-dark sm:text-2xl sm:leading-10">
                  {t('home.testimonials.quote')}
                </blockquote>

                <div className="mt-8 flex flex-col items-center gap-4 border-t border-gulf-light pt-6 sm:flex-row sm:justify-between">
                  <div>
                    <p className="text-lg font-bold text-gulf-dark">
                      {t('home.testimonials.author')}
                    </p>
                    <p className="mt-1 max-w-xl text-sm font-medium uppercase tracking-[0.12em] text-gulf-primary/80">
                      {t('home.testimonials.organization')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-8 rounded-full bg-gulf-primary" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gulf-primary/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gulf-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
