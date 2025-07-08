
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Target, Lightbulb, Shield, Compass, Globe, Award, Building2, Handshake, Zap, Heart, Rocket, TreePine, Mail, FileText, Video, BookOpen, Scale, Newspaper, MessageSquare } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    
  ];

  const offerings = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: t('about.offer.texts'),
      description: t('about.offer.textsDesc')
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: t('about.offer.studies'),
      description: t('about.offer.studiesDesc')
    },
    {
      icon: <Video className="w-5 h-5" />,
      title: t('about.offer.interviews'),
      description: t('about.offer.interviewsDesc')
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: t('about.offer.legal'),
      description: t('about.offer.legalDesc')
    },
    {
      icon: <Newspaper className="w-5 h-5" />,
      title: t('about.offer.news'),
      description: t('about.offer.newsDesc')
    }
  ];

  const missionPoints = [
    t('about.mission.point1'),
    t('about.mission.point2'),
    t('about.mission.point3'),
    t('about.mission.point4'),
    t('about.mission.point5')
  ];

  const contactItems = [
    { icon: <Lightbulb className="w-4 h-4" />, text: t('about.contact.suggest') },
    { icon: <FileText className="w-4 h-4" />, text: t('about.contact.share') },
    { icon: <MessageSquare className="w-4 h-4" />, text: t('about.contact.questions') },
    { icon: <Heart className="w-4 h-4" />, text: t('about.contact.feedback') }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gulf-secondary/10 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-12 h-12 bg-gulf-primary rounded-lg flex items-center justify-center text-white mx-auto mb-6">
                <Compass className="w-6 h-6" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-4">
                {t('about.title')}
              </h1>
              <p className="text-lg text-gulf-dark/70 mb-12">
                {t('about.subtitle')}
              </p>
              
              {/* Highlights Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`${item.color} mb-3 mx-auto`}>
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold text-gulf-dark mb-1">{item.number}</div>
                    <div className="text-gulf-dark/60 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Balanced Layout */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-gulf-secondary/5 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gulf-primary rounded-lg flex items-center justify-center text-white mr-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-primary">{t('about.vision.title')}</h2>
                </div>
                <p className="text-gulf-dark/80 leading-relaxed">
                  {t('about.vision.text')}
                </p>
              </div>
              
              {/* Mission Overview */}
              <div className="bg-gulf-gold/5 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gulf-gold rounded-lg flex items-center justify-center text-gulf-dark mr-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-gold">{t('about.mission.title')}</h2>
                </div>
                <p className="text-gulf-dark/80 leading-relaxed mb-4">
                  {t('about.mission.text')}
                </p>
                <div className="space-y-2">
                  {missionPoints.slice(0, 5).map((point, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gulf-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gulf-dark/70 text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>

            {/* Additional Mission Points */}
           
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-gulf-secondary/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <div className="w-10 h-10 bg-gulf-coral rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-gulf-dark mb-2">{t('about.offer.title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((offering, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gulf-light/50">
                  <div className="w-8 h-8 bg-gulf-primary/10 rounded-lg flex items-center justify-center text-gulf-primary mb-4">
                    {offering.icon}
                  </div>
                  <h3 className="font-semibold text-gulf-dark mb-2">{offering.title}</h3>
                  <p className="text-gulf-dark/70 text-sm leading-relaxed">{offering.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scope & Team - Balanced Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Scope */}
              <div className="bg-gulf-coral/5 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gulf-coral rounded-lg flex items-center justify-center text-white mr-4">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-coral">{t('about.scope.title')}</h2>
                </div>
                <p className="text-gulf-dark/80 leading-relaxed mb-4">
                  {t('about.scope.text')}
                </p>
                <p className="text-gulf-dark/70 text-sm leading-relaxed">
                  {t('about.scope.sources')}
                </p>
              </div>
              
              {/* Team Summary */}
              <div className="bg-gulf-primary/5 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gulf-primary rounded-lg flex items-center justify-center text-white mr-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-primary">{t('about.team.title')}</h2>
                </div>
                <p className="text-gulf-dark/80 leading-relaxed mb-4">
                  {t('about.team.text')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gulf-primary rounded-full"></div>
                    <p className="text-gulf-dark/70 text-sm">{t('about.team.experience')}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gulf-primary rounded-full"></div>
                    <p className="text-gulf-dark/70 text-sm">{t('about.team.languages')}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gulf-primary rounded-full"></div>
                    <p className="text-gulf-dark/70 text-sm">{t('about.team.diversity')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Extended Team Description */}
            <div className="mt-8 bg-gulf-secondary/10 p-8 rounded-lg border border-gulf-light/50">
              <p className="text-gulf-dark/80 leading-relaxed text-center">
                {t('about.team.mission')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gulf-primary text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white mx-auto mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('about.contact.title')}</h2>
            <p className="text-lg text-white/90 mb-8">
              📧 {t('about.contact.email')}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {contactItems.map((item, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-white mb-2 flex justify-center">{item.icon}</div>
                  <p className="text-white/90 text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gulf-primary px-6 py-3 rounded-lg font-medium hover:bg-gulf-secondary transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {t('about.contact.btn')}
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-gulf-primary transition-colors flex items-center justify-center gap-2">
                <Scale className="w-4 h-4" />
                {t('about.contact.legal')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;