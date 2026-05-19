import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookMarked, FileText, FolderOpen, Library, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const resourceCards = [
  {
    icon: FileText,
    line: 'w-11/12',
    tint: 'bg-gulf-primary/10 text-gulf-primary',
  },
  {
    icon: BookMarked,
    line: 'w-4/5',
    tint: 'bg-gulf-gold/20 text-gulf-primary',
  },
  {
    icon: FolderOpen,
    line: 'w-2/3',
    tint: 'bg-gulf-coral/10 text-gulf-coral',
  },
];

const ResourcesPreview = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <section
      className="relative overflow-hidden bg-gulf-white py-16 sm:py-20 lg:py-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <motion.div
        className="absolute -top-20 end-16 h-64 w-64 rounded-full bg-gulf-primary/10 blur-3xl"
        animate={{ y: [0, 16, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 start-8 h-72 w-72 rounded-full bg-gulf-secondary/70 blur-3xl"
        animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gulf-gold/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gulf-primary/15 bg-gulf-secondary/35 px-4 py-2 text-sm font-medium text-gulf-primary">
              <Library className="h-4 w-4" />
              <span>{t('resources.title')}</span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-gulf-dark sm:text-4xl lg:text-5xl">
              {t('home.resources.title')}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-gulf-dark/70 sm:text-lg">
              {t('home.resources.description')}
            </p>

            <div className="mt-8">
              <Link
                to="/resources"
                className="group inline-flex items-center gap-3 rounded-lg bg-gulf-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gulf-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-primary/90 hover:shadow-xl hover:shadow-gulf-primary/20 sm:text-base"
              >
                <span>{t('home.resources.button')}</span>
                <ArrowUpRight
                  className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRtl ? '-scale-x-100' : ''
                  }`}
                />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[380px] rounded-[2rem] bg-gradient-to-br from-gulf-secondary/55 via-white to-gulf-primary/5 p-4 sm:min-h-[430px] sm:p-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="absolute inset-0 rounded-[2rem] border border-gulf-primary/10" />

            <motion.div
              className="relative ms-auto w-full max-w-sm rounded-2xl border border-gulf-light bg-white p-5 shadow-2xl shadow-gulf-dark/10 sm:p-6"
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gulf-white px-4 py-3 text-gulf-dark/60 shadow-sm">
                <Search className="h-5 w-5 text-gulf-primary" />
                <div className="h-2 flex-1 rounded-full bg-gulf-dark/10" />
              </div>

              <div className="space-y-4">
                {resourceCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={card.line}
                      className="flex items-center gap-4 rounded-2xl border border-gulf-light/80 bg-gulf-white/80 p-4 transition-colors duration-300 hover:border-gulf-primary/20"
                      initial={{ opacity: 0, x: isRtl ? -14 : 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                    >
                      <div className={`rounded-xl p-3 ${card.tint}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className={`h-3 rounded-full bg-gulf-dark/15 ${card.line}`} />
                        <div className="h-2 w-1/2 rounded-full bg-gulf-dark/10" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-6 start-4 w-[58%] rounded-2xl bg-gulf-primary p-5 text-white shadow-xl shadow-gulf-primary/20 sm:start-8 sm:w-[52%] sm:p-6"
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mb-7 h-12 w-12 rounded-2xl bg-white/15 p-3">
                <Library className="h-6 w-6 text-gulf-gold" />
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full rounded-full bg-white/35" />
                <div className="h-3 w-4/5 rounded-full bg-white/25" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-24 end-3 h-20 w-20 rounded-2xl bg-gradient-to-br from-gulf-gold/80 to-gulf-coral/75 shadow-lg shadow-gulf-coral/10 sm:end-8"
              animate={{ rotate: [0, 3, 0], y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
