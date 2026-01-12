import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: null,
    acceptedPrivacy: false,
  });

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/login');
  }, [navigate]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (isLogin) {
      const { email, password } = loginData;
      if (!email || !validateEmail(email)) errors.push(t('login.error.invalidEmail'));
      if (!password || !validatePassword(password)) errors.push(t('login.error.invalidPassword'));
    } else {
      const { fullName, email, password, confirmPassword, country, phoneNumber, acceptedPrivacy } = registerData;
      if (!fullName || fullName.length < 2) errors.push(t('register.error.invalidFullName'));
      if (!email || !validateEmail(email)) errors.push(t('register.error.invalidEmail'));
      if (!password || !validatePassword(password)) errors.push(t('register.error.invalidPassword'));
      if (!confirmPassword || password !== confirmPassword) errors.push(t('register.error.passwordMismatch'));
      if (!acceptedPrivacy) errors.push(t('register.error.acceptPrivacy'));
      if (!country) errors.push(t('register.error.invalidCountry'));
      if (!phoneNumber) errors.push(t('register.error.invalidPhone'));
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginData);
        const { token, refreshToken, role } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role', role);
        toast.success(t('login.success'));
        navigate('/');
      } else {
        const { fullName, email, password, phoneNumber, country } = registerData;
        const [firstname, ...rest] = fullName.trim().split(' ');
        const lastname = rest.join(' ');

        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          firstname,
          lastname,
          email,
          password,
          country: country.label,
          phoneNumber,
        });
        toast.success(t('register.success'));

        setIsLogin(true);
        setRegisterData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          country: null,
          acceptedPrivacy: false,
        });
      }
    } catch (err: any) {
      const errorCode = err.response?.data?.errorCode;
      if (isLogin) {
        switch (errorCode) {
          case 'INVALID_CREDENTIALS':
            toast.error(t('login.error.invalid'));
            break;
          case 'ACCOUNT_BANNED':
            toast.error(t('login.error.banned'));
            break;
          case 'ACCOUNT_LOCKED':
            toast.error(t('login.error.tooManyAttempts'));
            break;
          case 'ACCOUNT_NOT_ACTIVE':
            toast.error(t('login.error.notActive'));
            break;
          default:
            toast.error(t('login.error.generic'));
        }
      } else {
        switch (errorCode) {
          case 'EMAIL_ALREADY_EXISTS':
            toast.error(t('register.error.emailExists'));
            break;
          case 'PHONE_ALREADY_EXISTS':
            toast.error(t('register.error.phoneExists'));
            break;
          default:
            toast.error(t('register.error.generic'));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setLoginData({ email: '', password: '' });
    setRegisterData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      country: null,
      acceptedPrivacy: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gulf-primary/5 to-gulf-secondary/10">
      <Header />

      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-gulf-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gulf-secondary/10 rounded-full blur-3xl"></div>
              </div>

              {/* Main card with enhanced styling */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-gulf-secondary/20 rounded-3xl p-8 shadow-2xl shadow-gulf-primary/5 transition-all duration-500 hover:shadow-gulf-primary/10">
                {/* Header with animated underline */}
                <div className="text-center mb-10">
                  <div className="inline-block mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gulf-primary to-gulf-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-gulf-primary/20 transform transition-transform hover:scale-110 duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-gulf-dark mb-3 tracking-tight">
                    {isLogin ? t('login.title') : t('register.title')}
                  </h1>
                  <p className="text-gulf-dark/60 text-sm">
                    {isLogin ? t('login.subtitle') : t('register.subtitle')}
                  </p>
                  <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-gulf-primary to-gulf-secondary rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="animate-fadeIn">
                      <label className="block text-sm font-semibold text-gulf-dark mb-2.5">
                        {t('register.fullName')}
                      </label>
                      <Input
                        type="text"
                        placeholder={t('register.fullNamePlaceholder')}
                        value={registerData.fullName}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, fullName: e.target.value })
                        }
                        className="h-12 border-2 border-gulf-secondary/30 focus:border-gulf-primary transition-colors duration-300 rounded-xl"
                      />
                    </div>
                  )}

                  <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gulf-dark mb-2.5">
                      {t('login.email')}
                    </label>
                    <Input
                      type="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={isLogin ? loginData.email : registerData.email}
                      onChange={(e) =>
                        isLogin
                          ? setLoginData({ ...loginData, email: e.target.value })
                          : setRegisterData({ ...registerData, email: e.target.value })
                      }
                      className="h-12 border-2 border-gulf-secondary/30 focus:border-gulf-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  {!isLogin && (
                    <>
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-semibold text-gulf-dark mb-2.5">
                          {t('register.country')}
                        </label>
                        <Select
                          options={options}
                          value={registerData.country}
                          onChange={(value) =>
                            setRegisterData({ ...registerData, country: value })
                          }
                          placeholder={t('register.countryPlaceholder')}
                          className="text-sm"
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: '48px',
                              borderRadius: '0.75rem',
                              borderWidth: '2px',
                              borderColor: 'rgba(203, 213, 225, 0.3)',
                              '&:hover': {
                                borderColor: 'var(--gulf-primary)',
                              },
                            }),
                          }}
                        />
                      </div>

                      <div className="animate-fadeIn">
                        <label className="block text-sm font-semibold text-gulf-dark mb-2.5">
                          {t('register.phoneNumber')}
                        </label>
                        <PhoneInput
                          country={'tn'}
                          value={registerData.phoneNumber}
                          onChange={(value) =>
                            setRegisterData({ ...registerData, phoneNumber: value })
                          }
                          enableSearch
                          disableDropdown={false}
                          inputStyle={{
                            width: '100%',
                            height: '48px',
                            fontSize: '14px',
                            borderRadius: '0.75rem',
                            border: '2px solid rgba(203, 213, 225, 0.3)',
                            paddingLeft: '50px',
                            color: '#1f2937',
                            backgroundColor: '#fff',
                          }}
                          buttonStyle={{
                            border: '2px solid rgba(203, 213, 225, 0.3)',
                            borderRight: 'none',
                            backgroundColor: '#fff',
                            borderRadius: '0.75rem 0 0 0.75rem',
                          }}
                          dropdownStyle={{
                            zIndex: 9999,
                            maxHeight: '200px',
                            overflowY: 'auto',
                          }}
                        />
                      </div>
                    </>
                  )}

                  <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gulf-dark mb-2.5">
                      {t('login.password')}
                    </label>
                    <Input
                      type="password"
                      placeholder={t('login.passwordPlaceholder')}
                      value={isLogin ? loginData.password : registerData.password}
                      onChange={(e) =>
                        isLogin
                          ? setLoginData({ ...loginData, password: e.target.value })
                          : setRegisterData({ ...registerData, password: e.target.value })
                      }
                      className="h-12 border-2 border-gulf-secondary/30 focus:border-gulf-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  {!isLogin && (
                    <>
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-semibold text-gulf-dark mb-2.5">
                          {t('register.confirmPassword')}
                        </label>
                        <Input
                          type="password"
                          placeholder={t('register.confirmPasswordPlaceholder')}
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, confirmPassword: e.target.value })
                          }
                          className="h-12 border-2 border-gulf-secondary/30 focus:border-gulf-primary transition-colors duration-300 rounded-xl"
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gulf-primary/5 rounded-xl border border-gulf-primary/10 animate-fadeIn">
                        <input
                          id="privacy"
                          type="checkbox"
                          checked={registerData.acceptedPrivacy}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, acceptedPrivacy: e.target.checked })
                          }
                          className="mt-1 w-4 h-4 accent-gulf-primary"
                        />
                        <label htmlFor="privacy" className="text-sm text-gulf-dark leading-relaxed">
                          {t('register.accept')}{' '}
                          <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gulf-primary font-semibold hover:underline transition-all"
                          >
                            {t('register.privacyPolicy')}
                          </a>
                        </label>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-gulf-primary to-gulf-secondary hover:shadow-lg hover:shadow-gulf-primary/30 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{isLogin ? t('login.loading') : t('register.loading')}</span>
                      </div>
                    ) : (
                      isLogin ? t('login.submit') : t('register.submit')
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gulf-secondary/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-4 text-gulf-dark/50 font-medium">or</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={toggleForm}
                      className="text-gulf-primary hover:text-gulf-secondary font-semibold text-sm transition-colors duration-300 hover:underline"
                      type="button"
                    >
                      {isLogin ? t('login.switchToRegister') : t('register.switchToLogin')}
                    </button>
                  </div>

                  {isLogin && (
                    <div className="text-center pt-2">
                      <Link
                        to="/forgot-password"
                        className="text-gulf-dark/60 hover:text-gulf-primary text-sm transition-colors duration-300 hover:underline"
                      >
                        {t('login.forgotPassword')}
                      </Link>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

     <style>
  {`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
  `}
</style>

    </div>
  );
};

export default Login;