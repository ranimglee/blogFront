
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Target, Lightbulb, Shield, Compass, Globe, Award, Building2, Handshake, Zap, Heart, Rocket, TreePine } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Handshake className="w-8 h-8" />,
      titleKey: 'about.values.collaboration',
      descriptionKey: 'about.values.collaboration.desc',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      titleKey: 'about.values.sustainability',
      descriptionKey: 'about.values.sustainability.desc',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      titleKey: 'about.values.innovation',
      descriptionKey: 'about.values.innovation.desc',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titleKey: 'about.values.integrity',
      descriptionKey: 'about.values.integrity.desc',
      gradient: 'from-rose-500 to-rose-600'
    },
  ];



  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Enhanced Hero Section */}
        <section className="py-32 bg-gradient-to-br from-gulf-secondary/30 via-gulf-white to-gulf-light/40 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gulf-primary/10 to-gulf-gold/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-gulf-coral/10 to-gulf-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gulf-gold/5 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-6xl mx-auto">
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-gulf-primary to-gulf-gold rounded-3xl flex items-center justify-center text-white shadow-2xl animate-fade-in">
                    <Compass className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gulf-coral rounded-full flex items-center justify-center animate-bounce">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-gulf-dark mb-8 animate-fade-in">
                {t('about.title')}
              </h1>
              <p className="text-2xl md:text-3xl text-gulf-dark/80 mb-8 leading-relaxed animate-fade-in font-light">
                {t('about.subtitle')}
              </p>
              
           
              
             
            </div>
          </div>
        </section>

        {/* Enhanced Mission & Vision */}
        <section className="py-32 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gulf-light/20 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              <div className="group">
                <div className="bg-gradient-to-br from-gulf-primary/5 via-white to-gulf-primary/10 p-12 rounded-3xl shadow-2xl border border-gulf-primary/10 hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gulf-primary/5 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-gulf-primary to-gulf-primary/80 rounded-3xl flex items-center justify-center text-white mr-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <Target className="w-10 h-10" />
                      </div>
                      <h2 className="text-5xl font-bold bg-gradient-to-r from-gulf-primary to-gulf-primary/80 bg-clip-text text-transparent">
                        {t('about.mission.title')}
                      </h2>
                    </div>
                    <p className="text-gulf-dark/80 leading-relaxed text-xl">
                      {t('about.mission.text')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-br from-gulf-gold/5 via-white to-gulf-gold/10 p-12 rounded-3xl shadow-2xl border border-gulf-gold/10 hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gulf-gold/5 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-gulf-gold to-gulf-gold/80 rounded-3xl flex items-center justify-center text-gulf-dark mr-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <Zap className="w-10 h-10" />
                      </div>
                      <h2 className="text-5xl font-bold bg-gradient-to-r from-gulf-gold to-gulf-gold/80 bg-clip-text text-transparent">
                        {t('about.vision.title')}
                      </h2>
                    </div>
                    <p className="text-gulf-dark/80 leading-relaxed text-xl">
                      {t('about.vision.text')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="py-32 bg-gradient-to-br from-gulf-secondary/20 via-gulf-light/10 to-gulf-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent)] opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,119,6,0.05),transparent)] opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-gulf-primary via-gulf-gold to-gulf-coral rounded-3xl flex items-center justify-center text-white shadow-2xl animate-pulse">
                    <Handshake className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gulf-gold rounded-full animate-ping"></div>
                </div>
              </div>
              <h2 className="text-6xl font-bold text-gulf-dark mb-8">
                {t('about.values.title')}
              </h2>
              <p className="text-2xl text-gulf-dark/70 max-w-4xl mx-auto leading-relaxed">
                Our core values guide everything we do and shape our approach to cooperative development
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-8xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className={`w-24 h-24 bg-gradient-to-br ${value.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gulf-primary mb-6">
                        {t(value.titleKey)}
                      </h3>
                      <p className="text-gulf-dark/70 leading-relaxed text-lg">
                        {t(value.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action Section */}
        <section className="py-32 bg-gradient-to-br from-gulf-primary via-gulf-primary/95 to-gulf-primary/90 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(217,119,6,0.2),transparent)]"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gulf-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-white shadow-2xl">
                    <Users className="w-14 h-14" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gulf-gold rounded-full flex items-center justify-center animate-bounce">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                Ready to Build Together?
              </h2>
              <p className="text-2xl text-white/90 mb-16 leading-relaxed max-w-4xl mx-auto">
                Join us in creating sustainable cooperative solutions that empower communities across the Gulf region
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button className="group bg-white text-gulf-primary px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gulf-secondary transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Get Started Today
                </button>
                <button className="group border-3 border-white text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-gulf-primary transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                  <Compass className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;