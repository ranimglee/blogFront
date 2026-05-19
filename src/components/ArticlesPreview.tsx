import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Feather, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ArticlesPreview = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <section
      className="relative overflow-hidden bg-gulf-white py-16 sm:py-20 lg:py-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="absolute -top-20 end-0 h-64 w-64 rounded-full bg-gulf-gold/20 blur-3xl"
        animate={{ y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-8 start-0 h-72 w-72 rounded-full bg-gulf-primary/10 blur-3xl"
        animate={{ y: [0, -16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gulf-primary/20 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gulf-primary/15 bg-gulf-secondary/35 px-4 py-2 text-sm font-medium text-gulf-primary">
              <Sparkles className="h-4 w-4" />
              <span>{t('blog.title')}</span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-gulf-dark sm:text-4xl lg:text-5xl">
              {t('home.articles.title')}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-gulf-dark/70 sm:text-lg">
              {t('home.articles.description')}
            </p>

            <div className="mt-8">
              <Link
                to="/articles"
                className="group inline-flex items-center gap-3 rounded-lg bg-gulf-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gulf-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-primary/90 hover:shadow-xl hover:shadow-gulf-primary/20 sm:text-base"
              >
                <span>{t('home.articles.button')}</span>
                <ArrowUpRight
                  className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRtl ? '-scale-x-100' : ''
                  }`}
                />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[320px] sm:min-h-[380px]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <motion.div
              className="absolute end-0 top-0 w-[78%] rounded-2xl border border-gulf-light bg-white p-6 shadow-2xl shadow-gulf-dark/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-gulf-dark/15 sm:p-7"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mb-8 flex items-start justify-between gap-5">
                <div className="rounded-2xl bg-gulf-primary/10 p-3 text-gulf-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-gulf-gold/70 to-gulf-coral/70" />
              </div>

              <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-gulf-gold/70" />
                <div className="h-4 w-full rounded-full bg-gulf-dark/15" />
                <div className="h-4 w-4/5 rounded-full bg-gulf-dark/10" />
                <div className="h-4 w-2/3 rounded-full bg-gulf-dark/10" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 start-0 w-[76%] rounded-2xl border border-gulf-primary/10 bg-gulf-secondary/70 p-6 shadow-xl shadow-gulf-dark/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 sm:p-7"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mb-6 flex items-center gap-3 text-gulf-coral">
                <Feather className="h-5 w-5" />
                <div className="h-px flex-1 bg-gulf-coral/25" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-11/12 rounded-full bg-gulf-primary/20" />
                <div className="h-4 w-3/4 rounded-full bg-gulf-primary/15" />
                <div className="h-4 w-1/2 rounded-full bg-gulf-primary/10" />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="h-16 rounded-xl bg-white/70" />
                <div className="h-16 rounded-xl bg-white/50" />
                <div className="h-16 rounded-xl bg-white/70" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesPreview;
