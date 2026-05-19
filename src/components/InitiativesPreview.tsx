import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Handshake, Lightbulb, MapPinned, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const InitiativesPreview = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-gulf-secondary/25 via-white to-gulf-white py-16 sm:py-20 lg:py-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="absolute -top-16 start-10 h-56 w-56 rounded-full bg-gulf-coral/15 blur-3xl"
        animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 end-0 h-80 w-80 rounded-full bg-gulf-gold/20 blur-3xl"
        animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            className="relative min-h-[360px] sm:min-h-[420px] lg:order-first"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute start-0 top-6 w-[70%] rounded-2xl border border-gulf-primary/10 bg-white p-5 shadow-xl shadow-gulf-dark/10 sm:p-6"
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="rounded-2xl bg-gulf-primary/10 p-3 text-gulf-primary">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div className="h-2 w-24 rounded-full bg-gulf-gold/70" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="h-20 rounded-xl bg-gulf-secondary/70" />
                <div className="h-20 rounded-xl bg-gulf-gold/20" />
                <div className="h-20 rounded-xl bg-gulf-primary/10" />
              </div>
            </motion.div>

            <motion.div
              className="absolute end-0 top-28 w-[74%] rounded-2xl bg-gulf-primary p-6 text-white shadow-2xl shadow-gulf-primary/20 sm:p-7"
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <MapPinned className="h-6 w-6 text-gulf-gold" />
                <div className="h-px flex-1 bg-white/20" />
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full rounded-full bg-white/35" />
                <div className="h-3 w-4/5 rounded-full bg-white/25" />
                <div className="h-3 w-3/5 rounded-full bg-white/20" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 start-8 w-[66%] rounded-2xl border border-gulf-coral/10 bg-white/85 p-5 shadow-xl shadow-gulf-dark/10 backdrop-blur-sm sm:p-6"
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="rounded-2xl bg-gulf-coral/10 p-3 text-gulf-coral">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gulf-gold to-gulf-coral" />
              </div>
              <div className="h-16 rounded-xl bg-gradient-to-r from-gulf-secondary/80 to-gulf-gold/20" />
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-2xl lg:ms-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gulf-coral/20 bg-white/80 px-4 py-2 text-sm font-medium text-gulf-coral shadow-sm">
              <Handshake className="h-4 w-4" />
              <span>{t('projects.title')}</span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-gulf-dark sm:text-4xl lg:text-5xl">
              {t('home.initiatives.title')}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-gulf-dark/70 sm:text-lg">
              {t('home.initiatives.description')}
            </p>

            <div className="mt-8">
              <Link
                to="/initiatives"
                className="group inline-flex items-center gap-3 rounded-lg bg-gulf-coral px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gulf-coral/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-coral/90 hover:shadow-xl hover:shadow-gulf-coral/20 sm:text-base"
              >
                <span>{t('home.initiatives.button')}</span>
                <ArrowUpRight
                  className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRtl ? '-scale-x-100' : ''
                  }`}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InitiativesPreview;
