import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

const Contact = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/public/send-message`, formData);
      toast.success(t('contact.successMessage') || 'Message sent successfully!');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error(t('contact.errorMessage') || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-gulf-secondary/20 via-white to-gulf-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gulf-dark mb-4">
                {t('contact.title')}
              </h1>
              <p className="text-lg md:text-xl text-gulf-dark/70">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
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
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gulf-primary focus:border-transparent transition"
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
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gulf-primary focus:border-transparent transition"
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
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gulf-primary focus:border-transparent transition"
                      placeholder={t('contact.subject')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gulf-dark font-medium mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gulf-primary focus:border-transparent transition"
                      placeholder={t('contact.message')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gulf-primary text-white font-semibold py-3 rounded-xl hover:bg-gulf-dark transition flex items-center justify-center gap-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                        ></path>
                      </svg>
                    ) : null}
                    {loading ? t('contact.sending') || 'Sending...' : t('contact.send')}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gulf-dark mb-6">
                    {t('contact.info.title')}
                  </h3>

                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gulf-gold/20 rounded-xl flex items-center justify-center text-gulf-gold flex-shrink-0 transition hover:scale-110">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gulf-dark mb-1">{t('footer.email')}</h4>
                        <p className="text-gulf-dark/70">{t('contact.info.email')}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gulf-coral/20 rounded-xl flex items-center justify-center text-gulf-coral flex-shrink-0 transition hover:scale-110">
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
