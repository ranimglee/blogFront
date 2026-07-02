import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import React, { useState } from 'react';
const NewsletterCTA = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);

const [status, setStatus] = useState<{
  type: 'success' | 'error';
  message: string;
} | null>(null);


const handleSubscribe = async (event: React.FormEvent) => {
  event.preventDefault();

  if (!email.trim()) {
    setStatus({
      type: 'error',
      message: t('footer.errorMessage'),
    });
    return;
  }

  try {
    setLoading(true);
    setStatus(null);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || ''}/public/newsletter/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consent: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      if (errorText === 'EMAIL_ALREADY_SUBSCRIBED') {
        setStatus({
          type: 'error',
          message: t('footer.alreadySubscribed'),
        });
      } else {
        setStatus({
          type: 'error',
          message: t('footer.errorMessage'),
        });
      }

      return;
    }

    setStatus({
      type: 'success',
      message: t('footer.successMessage'),
    });

// Meta Pixel
window.fbq?.("track", "Lead", {
  content_name: "Newsletter Subscription",
});
    setEmail('');
  } catch (error) {
    setStatus({
      type: 'error',
      message: t('footer.errorMessage'),
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <section
      className="relative overflow-hidden bg-gulf-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="container relative z-10 mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gulf-primary via-gulf-primary to-gulf-dark px-5 py-10 text-white shadow-2xl shadow-gulf-primary/20 sm:px-8 sm:py-14 lg:px-14 lg:py-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute -top-24 end-10 h-72 w-72 rounded-full bg-gulf-gold/25 blur-3xl"
            animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-28 start-8 h-80 w-80 rounded-full bg-gulf-coral/25 blur-3xl"
            animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-gulf-secondary backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-gulf-gold" />
                <span>{t('footer.newsletter')}</span>
              </div>

              <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {t('home.newsletter.title')}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                {t('home.newsletter.description')}
              </p>
            </motion.div>

            <motion.form
              className="relative rounded-3xl border border-white/15 bg-white/10 p-4 shadow-xl shadow-black/10 backdrop-blur-md sm:p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              onSubmit={handleSubscribe}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <span className="sr-only">{t('home.newsletter.placeholder')}</span>
                  <Mail className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gulf-primary/60" />
                 <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder={t('home.newsletter.placeholder')}

                    className="h-14 w-full rounded-2xl border border-white/70 bg-white pe-4 ps-12 text-sm font-medium text-gulf-dark outline-none transition-all duration-300 placeholder:text-gulf-dark/45 focus:border-gulf-gold focus:ring-4 focus:ring-gulf-gold/20"
                  />
                </label>

                <button
  type="submit"
  disabled={loading}
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gulf-gold px-6 text-sm font-bold text-gulf-dark shadow-lg shadow-gulf-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-gold/90 hover:shadow-xl hover:shadow-gulf-gold/25"
                >
                  <span>
  {loading
    ? t('footer.loading')
    : t('home.newsletter.button')}
</span>
                  <Send
                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 ${
                      isRtl ? '-scale-x-100' : ''
                    }`}
                  />
                </button>
              </div>

{status && (
  <p
    className={`mt-4 text-sm font-medium ${
      status.type === 'success'
        ? 'text-green-300'
        : 'text-red-300'
    }`}
  >
    {status.message}
  </p>
)}

<div className="mt-4 grid grid-cols-3 gap-3">
  <div className="h-16 rounded-2xl bg-white/10" />
  <div className="h-16 rounded-2xl bg-white/15" />
  <div className="h-16 rounded-2xl bg-white/10" />
</div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
