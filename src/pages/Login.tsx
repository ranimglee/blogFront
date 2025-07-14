import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/admin');
  }, [navigate]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (isLogin) {
      if (!email || !validateEmail(email)) errors.push(t('login.error.invalidEmail'));
      if (!password || !validatePassword(password)) errors.push(t('login.error.invalidPassword'));
    } else {
      if (!fullName || fullName.length < 2) errors.push(t('register.error.invalidFullName'));
      if (!email || !validateEmail(email)) errors.push(t('register.error.invalidEmail'));
      if (!password || !validatePassword(password)) errors.push(t('register.error.invalidPassword'));
      if (!confirmPassword || password !== confirmPassword) errors.push(t('register.error.passwordMismatch'));
      if (!acceptedPrivacy) errors.push(t('register.error.acceptPrivacy'));
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
        const { token, refreshToken, role } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role', role);
        toast.success(t('login.success'));
        navigate('/');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { fullName, email, password });
        toast.success(t('register.success'));
        setIsLogin(true);
        setAcceptedPrivacy(false);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message;
      if (msg === 'Invalid email or password!') toast.error(t('login.error.invalid'));
      else if (msg === 'Your account is banned.') toast.error(t('login.error.banned'));
      else if (msg === 'Too many failed attempts. Try again later.') toast.error(t('login.error.tooManyAttempts'));
      else toast.error(isLogin ? t('login.error.generic') : t('register.error.generic'));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white border border-gulf-secondary/30 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gulf-dark mb-4">
                  {isLogin ? t('login.title') : t('register.title')}
                </h1>
                <p className="text-gulf-dark/70">
                  {isLogin ? t('login.subtitle') : t('register.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gulf-dark mb-2">
                      {t('register.fullName')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('register.fullNamePlaceholder')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gulf-dark mb-2">
                    {t('login.email')}
                  </label>
                  <Input
                    type="email"
                    placeholder={t('login.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gulf-dark mb-2">
                    {t('login.password')}
                  </label>
                  <Input
                    type="password"
                    placeholder={t('login.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gulf-dark mb-2">
                        {t('register.confirmPassword')}
                      </label>
                      <Input
                        type="password"
                        placeholder={t('register.confirmPasswordPlaceholder')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gulf-dark">
                      <input
                        id="privacy"
                        type="checkbox"
                        checked={acceptedPrivacy}
                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="privacy">
                        {t('register.accept')}{' '}
                        <a
                          href="#!"
                          className="text-gulf-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPdfModal(true);
                          }}
                        >
                          {t('register.privacyPolicy')}
                        </a>
                      </label>
                    </div>
                  </>
                )}

                <Button type="submit" className="w-full bg-gulf-primary hover:bg-gulf-primary/90 text-white">
                  {isLogin ? t('login.submit') : t('register.submit')}
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gulf-primary hover:text-gulf-primary/80 text-sm"
                    type="button"
                  >
                    {isLogin ? t('login.switchToRegister') : t('register.switchToLogin')}
                  </button>
                </div>

                {isLogin && (
                  <div className="text-center">
                    <Link to="/forgot-password" className="text-gulf-primary hover:text-gulf-primary/80 text-sm">
                      {t('login.forgotPassword')}
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Modal PDF */}
      {showPdfModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPdfModal(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPdfModal(false)}
              className="mb-2 text-red-500 hover:text-red-700"
            >
              {t('register.close')}
            </button>
           <iframe
  src="/privacy-policy.pdf"
  title="Politique de confidentialité"
  className="w-full h-[70vh]"
  frameBorder="0"
/>

          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
