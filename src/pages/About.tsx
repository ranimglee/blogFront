
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Target, Lightbulb, Shield, Compass, Globe, Award, Building2, Handshake, Zap, Heart, Rocket, TreePine, Mail, FileText, Video, BookOpen, Scale, Newspaper, MessageSquare } from 'lucide-react';
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
<section className="py-10 bg-gradient-to-br from-gulf-secondary/10 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-12 h-12 bg-gulf-primary rounded-lg flex items-center justify-center text-white mx-auto mb-6">
                <Compass className="w-6 h-6" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-4">
                {t('about.title')}
              </h1>
             
              
              {/* Highlights Grid */}
          
            </div>
          </div>
        </section>

        {/* Vision & Mission - Balanced Layout */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-gulf-gold/10 p-8 rounded-lg border border-gulf-light/50">
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
              <div className="bg-gulf-gold/10 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gulf-gold rounded-lg flex items-center justify-center text-gulf-dark mr-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-gold">{t('about.mission.title')}</h2>
                </div>
               
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
        <section className="py-6 bg-gulf-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-4">
              <div className="w-10 h-10 bg-gulf-coral rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-gulf-dark mb-2">{t('about.offer.title')}</h2>
            </div>
            
          
          </div>
        </section>

        {/* Scope & Team - Balanced Content */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Scope */}
              <div className="bg-gulf-coral/5 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                 
                </div>
                <p className="text-gulf-dark/80 leading-relaxed mb-4">
                  {t('about.team.mission')}
                </p>
               
              </div>

                   <div className="bg-gulf-coral/5 p-8 rounded-lg border border-gulf-light/50">
                <div className="flex items-center mb-6">
                 
                </div>
                <p className="text-gulf-dark/80 leading-relaxed mb-4">
                  {t('about.scope.text')}
                </p>
                <p className="text-gulf-dark/70 text-sm leading-relaxed">
                  {t('about.scope.sources')}
                </p>
              </div>
              
              {/* Team Summary */}
              
            </div>
                <div className="bg-gulf-primary/5 p-8 rounded-lg mt-8 ...">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gulf-primary rounded-lg flex items-center justify-center text-white mr-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gulf-primary">{t('about.team.title')}</h2>
                </div>
                <p className="text-gulf-dark/80 leading-relaxed mb-4">
                  {t('about.team.text')}
                  {t('about.team.languages')}
                  {t('about.team.diversity')}
                </p>
               
              </div>
            {/* Extended Team Description */}
           
          </div>
        </section>

  {/* Contact Section */}
<section className="py-16 bg-white mb-12">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
    <div className="w-14 h-14 bg-gulf-primary/10 rounded-2xl flex items-center justify-center text-gulf-primary mx-auto mb-6">
      <Mail className="w-7 h-7" />
    </div>

    <h2 className="text-3xl font-bold text-gulf-dark mb-4">
      {t('about.contact.title')}
    </h2>
    <p className="text-lg text-gulf-dark/70 mb-10">
      📧 {t('about.contact.email')}
    </p>

    {/* Contact options as cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {contactItems.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md border border-gray-100 hover:shadow-lg transition rounded-xl p-6 flex flex-col items-center text-center"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gulf-primary/10 text-gulf-primary mb-3">
            {item.icon}
          </div>
          <p className="text-sm text-gulf-dark/80">{item.text}</p>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <button
      onClick={handleContactClick}
className="bg-gulf-primary text-white px-8 py-3 rounded-xl font-medium hover:brightness-90 transition-all flex items-center justify-center gap-2 mx-auto"
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