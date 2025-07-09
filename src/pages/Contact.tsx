import React, { useState } from 'react';
import axios from 'axios'; // If not already installed: npm install axios
import Header from '../components/Header';
import Footer from '../components/Footer';
const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('https://blog-production-5144.up.railway.app/public/send-message', formData);
      setStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* ... Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-gulf-dark font-medium mb-2">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                        placeholder={t('contact.name')}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gulf-dark font-medium mb-2">
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                        placeholder={t('contact.email')}
                        required
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
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                      placeholder={t('contact.subject')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gulf-dark font-medium mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gulf-light rounded-lg focus:outline-none focus:border-gulf-primary"
                      placeholder={t('contact.message')}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full btn-primary" disabled={status === 'loading'}>
                    {status === 'loading' ? t('contact.sending') : t('contact.send')}
                  </button>

                  {status === 'success' && (
                    <p className="text-green-600 text-sm mt-2">{t('contact.successMessage')}</p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-600 text-sm mt-2">{t('contact.errorMessage')}</p>
                  )}
                </form>
              </div>

              {/* ... Contact Information */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
function useLanguage(): { t: any; } {
  throw new Error('Function not implemented.');
}

