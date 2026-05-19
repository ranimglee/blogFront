import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BookOpen,
  Compass,
  FileText,
  Globe2,
  Heart,
  Layers,
  Lightbulb,
  Mail,
  MessageSquare,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const About = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const isRtl = language === 'ar';

  const handleContactClick = () => {
    navigate('/contact');
  };

  const missionPoints = [
    t('about.mission.point1'),
    t('about.mission.point2'),
    t('about.mission.point3'),
    t('about.mission.point4'),
    t('about.mission.point5'),
  ];

  const offerCards = [
    { icon: FileText, title: t('about.offer.texts'), description: t('about.offer.textsDesc') },
    { icon: Search, title: t('about.offer.studies'), description: t('about.offer.studiesDesc') },
    { icon: Users, title: t('about.offer.interviews'), description: t('about.offer.interviewsDesc') },
    { icon: ShieldCheck, title: t('about.offer.legal'), description: t('about.offer.legalDesc') },
    { icon: Globe2, title: t('about.offer.news'), description: t('about.offer.newsDesc') },
  ];

  const journeyItems = [
    { icon: Zap, title: t('about.vision.title'), description: t('about.vision.text') },
    { icon: Target, title: t('about.mission.title'), description: t('about.mission.text') },
    { icon: Globe2, title: t('about.scope.title'), description: t('about.scope.text') },
    { icon: Sparkles, title: t('about.team.experience'), description: t('about.team.mission') },
  ];

  const teamCards = [
    { icon: Heart, title: t('about.vision.title'), description: t('about.vision.text') },
    { icon: Target, title: t('about.mission.title'), description: t('about.team.mission') },
    { icon: Users, title: t('about.team.title'), description: t('about.team.text') },
  ];

  const contactItems = [
    { icon: Lightbulb, text: t('about.contact.suggest') },
    { icon: FileText, text: t('about.contact.share') },
    { icon: MessageSquare, text: t('about.contact.questions') },
    { icon: Heart, text: t('about.contact.feedback') },
  ];

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />

      <main className="overflow-hidden pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-gulf-secondary/30 via-white to-gulf-white py-20 sm:py-24 lg:py-28">
          <motion.div
            className="absolute -top-20 end-10 h-72 w-72 rounded-full bg-gulf-gold/20 blur-3xl"
            animate={{ y: [0, 18, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 start-0 h-80 w-80 rounded-full bg-gulf-primary/10 blur-3xl"
            animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
          />

          <motion.div
            className="container relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gulf-primary text-white shadow-xl shadow-gulf-primary/20"
            >
              <Compass className="h-8 w-8" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold leading-tight text-gulf-dark sm:text-5xl lg:text-6xl"
            >
              {t('about.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gulf-dark/70 sm:text-xl"
            >
              {t('about.subtitle')}
            </motion.p>
          </motion.div>
        </section>

        <section className="relative bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gulf-primary/15 bg-gulf-secondary/35 px-4 py-2 text-sm font-medium text-gulf-primary">
                <Sparkles className="h-4 w-4" />
                <span>{t('about.title')}</span>
              </div>

              <h2 className="text-3xl font-bold leading-tight text-gulf-dark sm:text-4xl">
                {t('about.subtitle')}
              </h2>

              <p className="mt-6 text-base leading-8 text-gulf-dark/75 sm:text-lg">
                {t('about.team.mission')}
              </p>

              <p className="mt-4 text-base leading-8 text-gulf-dark/70">
                {t('about.scope.sources')}
              </p>
            </motion.div>

            <motion.div
              className="relative min-h-[330px]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute end-0 top-0 w-[78%] rounded-2xl border border-gulf-light bg-white p-6 shadow-2xl shadow-gulf-dark/10"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="mb-8 flex items-center justify-between gap-5">
                  <div className="rounded-2xl bg-gulf-primary/10 p-3 text-gulf-primary">
                    <Network className="h-6 w-6" />
                  </div>
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-gulf-gold/75 to-gulf-coral/75" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full rounded-full bg-gulf-dark/15" />
                  <div className="h-3 w-4/5 rounded-full bg-gulf-dark/10" />
                  <div className="h-3 w-3/5 rounded-full bg-gulf-dark/10" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 start-0 w-[76%] rounded-2xl border border-gulf-primary/10 bg-gulf-secondary/70 p-6 shadow-xl shadow-gulf-dark/5 backdrop-blur-sm"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="mb-6 flex items-center gap-3 text-gulf-coral">
                  <Layers className="h-5 w-5" />
                  <div className="h-px flex-1 bg-gulf-coral/25" />
                </div>
                <p className="text-sm font-medium leading-7 text-gulf-dark/75">
                  {t('about.scope.text')}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-gulf-secondary/20 via-white to-gulf-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.article
                className="rounded-2xl border border-gulf-primary/10 bg-white p-7 shadow-xl shadow-gulf-dark/5 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gulf-primary text-white shadow-lg shadow-gulf-primary/15">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-primary">
                    {t('about.vision.title')}
                  </h2>
                </div>
                <p className="text-base leading-8 text-gulf-dark/75">
                  {t('about.vision.text')}
                </p>
              </motion.article>

              <motion.article
                className="rounded-2xl border border-gulf-gold/20 bg-white p-7 shadow-xl shadow-gulf-dark/5 sm:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gulf-gold text-gulf-dark shadow-lg shadow-gulf-gold/20">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-dark">
                    {t('about.mission.title')}
                  </h2>
                </div>

                <p className="mb-5 text-base font-medium text-gulf-dark/80">
                  {t('about.mission.text')}
                </p>

                <div className="space-y-4">
                  {missionPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gulf-gold" />
                      <p className="text-sm leading-7 text-gulf-dark/70">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="relative bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gulf-coral text-white shadow-lg shadow-gulf-coral/20">
                <BookOpen className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold text-gulf-dark sm:text-4xl">
                {t('about.offer.title')}
              </h2>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {offerCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.article
                    key={card.title}
                    className="group rounded-2xl border border-gulf-light bg-gradient-to-br from-white to-gulf-secondary/25 p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-gulf-dark/10"
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gulf-primary/10 text-gulf-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold leading-7 text-gulf-dark">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-gulf-dark/65">
                      {card.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-gulf-secondary/20 via-white to-gulf-primary/5 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mx-auto mb-12 max-w-3xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-bold text-gulf-dark sm:text-4xl">
                {t('about.journey.title')}
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute bottom-0 start-6 top-0 w-px bg-gradient-to-b from-gulf-primary/10 via-gulf-primary/30 to-gulf-gold/20 md:start-1/2" />

              <div className="space-y-8">
                {journeyItems.map((item, index) => {
                  const Icon = item.icon;
                  const alignEnd = index % 2 === 1;

                  return (
                    <motion.div
                      key={item.title}
                      className={`relative grid gap-5 ps-16 md:grid-cols-2 md:ps-0 ${
                        alignEnd ? '' : 'md:[&>article]:col-start-1'
                      }`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                    >
                      <div className="absolute start-0 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gulf-primary text-white shadow-lg shadow-gulf-primary/20 md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2">
                        <Icon className="h-5 w-5" />
                      </div>

                      <motion.article
                        className={`rounded-2xl border border-gulf-light bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-gulf-dark/10 ${
                          alignEnd ? 'md:col-start-2' : ''
                        }`}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      >
                        <h3 className="text-xl font-bold text-gulf-dark">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-gulf-dark/70">
                          {item.description}
                        </p>
                      </motion.article>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="rounded-[2rem] border border-gulf-primary/10 bg-gradient-to-br from-gulf-primary/5 via-white to-gulf-secondary/40 p-6 shadow-xl shadow-gulf-dark/5 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gulf-primary text-white shadow-lg shadow-gulf-primary/20">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gulf-primary">
                      {t('about.team.title')}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-gulf-dark/60">
                      {t('about.team.experience')}
                    </p>
                  </div>
                </div>
              </div>

              <p className="max-w-4xl text-base leading-8 text-gulf-dark/75 sm:text-lg">
                {t('about.team.text')}
              </p>

              <motion.div
                className="mt-8 grid gap-5 md:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
              >
                {teamCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <motion.article
                      key={card.title}
                      className="rounded-2xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-sm"
                      variants={fadeUp}
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gulf-primary/10 text-gulf-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-gulf-dark">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-gulf-dark/65">
                        {card.description}
                      </p>
                    </motion.article>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gulf-primary/10 text-gulf-primary">
                <Mail className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-bold text-gulf-dark">
                {t('about.contact.title')}
              </h2>
              <p className="mt-3 text-lg text-gulf-dark/70">
                {t('about.contact.email')}
              </p>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.text}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-gulf-dark/10"
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gulf-primary/20 to-gulf-primary/5 text-gulf-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-7 text-gulf-dark/80">
                      {item.text}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>

            <motion.button
              onClick={handleContactClick}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gulf-primary px-8 py-3 font-medium text-white shadow-lg shadow-gulf-primary/15 transition-colors hover:bg-gulf-primary/90"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="h-4 w-4" />
              {t('about.contact.btn')}
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
