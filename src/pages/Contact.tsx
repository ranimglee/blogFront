
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gulf-dark mb-6">
                {t('contact.title')}
              </h1>
              <p className="text-xl text-gulf-dark/80 mb-12">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gulf-dark font-medium mb-2">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                        placeholder={t('contact.name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gulf-dark font-medium mb-2">
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                        placeholder={t('contact.email')}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gulf-dark font-medium mb-2">
                      {t('contact.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                      placeholder={t('contact.subject')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gulf-dark font-medium mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                      placeholder={t('contact.message')}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full btn-primary">
                    {t('contact.send')}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gulf-dark mb-6">
                    {t('contact.info.title')}
                  </h3>
                  
                  <div className="space-y-4">
                   
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gulf-gold/10 rounded-lg flex items-center justify-center text-gulf-gold flex-shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gulf-dark mb-1">{t('footer.email')}</h4>
                        <p className="text-gulf-dark/70">{t('contact.info.email')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gulf-coral/10 rounded-lg flex items-center justify-center text-gulf-coral flex-shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gulf-dark mb-1">{t('footer.phone')}</h4>
                        <p className="text-gulf-dark/70">{t('contact.info.phone')}</p>
                      </div>
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
