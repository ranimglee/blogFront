import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Users,
  Target,
  Lightbulb,
  Compass,
  Zap,
  Heart,
  Mail,
  FileText,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const missionPoints = [
    t('about.mission.point1'),
    t('about.mission.point2'),
    t('about.mission.point3'),
    t('about.mission.point4'),
    t('about.mission.point5')
  ];

  const contactItems = [
    { icon: <Lightbulb className="w-5 h-5" />, text: t('about.contact.suggest') },
    { icon: <FileText className="w-5 h-5" />, text: t('about.contact.share') },
    { icon: <MessageSquare className="w-5 h-5" />, text: t('about.contact.questions') },
    { icon: <Heart className="w-5 h-5" />, text: t('about.contact.feedback') }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20 space-y-20">
        {/* Hero */}
        <section className="py-14 bg-gradient-to-br from-gulf-secondary/10 to-white">
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-6">
            <div className="w-14 h-14 bg-gulf-primary rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
              <Compass className="w-7 h-7" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark">
              {t('about.title')}
            </h1>
          </div>
        </section>

        {/* Vision & Mission */}
        <section>
          <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Vision */}
            <div className="group rounded-2xl border border-gulf-light/40 bg-gradient-to-br from-white to-gulf-gold/10 p-7 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 bg-gulf-primary rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                  <Zap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gulf-primary">
                  {t('about.vision.title')}
                </h2>
              </div>

              <p className="text-gulf-dark/80 leading-relaxed">
                {t('about.vision.text')}
              </p>
            </div>

            {/* Mission */}
            <div className="group rounded-2xl border border-gulf-light/40 bg-gradient-to-br from-white to-gulf-gold/10 p-7 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 bg-gulf-gold rounded-xl flex items-center justify-center text-gulf-dark shadow-md group-hover:scale-105 transition">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gulf-gold">
                  {t('about.mission.title')}
                </h2>
              </div>

              <div className="space-y-3">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-gulf-gold shrink-0" />
                    <p className="text-sm text-gulf-dark/70 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offer */}
        <section className="py-12 bg-gulf-secondary/5">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
            <div className="w-12 h-12 bg-gulf-coral rounded-xl flex items-center justify-center text-white mx-auto shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>

            <h2 className="text-3xl font-bold text-gulf-dark">
              {t('about.offer.title')}
            </h2>
          </div>
        </section>

        {/* Scope & Team */}
        <section>
          <div className="container mx-auto px-4 max-w-6xl space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md transition">
                <p className="text-gulf-dark/80 leading-relaxed">
                  {t('about.team.mission')}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md transition space-y-3">
                <p className="text-gulf-dark/80 leading-relaxed">
                  {t('about.scope.text')}
                </p>
                <p className="text-sm text-gulf-dark/70">
                  {t('about.scope.sources')}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gulf-light/40 bg-gradient-to-br from-gulf-primary/5 to-white p-7 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 bg-gulf-primary rounded-xl flex items-center justify-center text-white shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gulf-primary">
                  {t('about.team.title')}
                </h2>
              </div>

              <p className="text-gulf-dark/80 leading-relaxed">
                {t('about.team.text')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-10">
            <div className="w-14 h-14 bg-gulf-primary/10 rounded-2xl flex items-center justify-center text-gulf-primary mx-auto">
              <Mail className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gulf-dark">
                {t('about.contact.title')}
              </h2>
              <p className="text-lg text-gulf-dark/70">
                {t('about.contact.email')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {contactItems.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition text-center space-y-4"
                >
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-gulf-primary/20 to-gulf-primary/5 text-gulf-primary group-hover:scale-105 transition">
                    {item.icon}
                  </div>

                  <p className="text-sm text-gulf-dark/80 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 bg-gulf-primary text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition"
            >
              <Mail className="w-4 h-4" />
              {t('about.contact.btn')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
