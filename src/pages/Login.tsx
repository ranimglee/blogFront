import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors = [];

    if (isLogin) {
      if (!email || !validateEmail(email)) {
        errors.push(t('login.error.invalidEmail'));
      }
      if (!password || !validatePassword(password)) {
        errors.push(t('login.error.invalidPassword'));
      }
      if (errors.length > 0) {
        errors.forEach((error) => toast.error(error));
        return;
      }

      try {
        const response = await axios.post('https://blog-production-5144.up.railway.app/auth/login', {
          email,
          password,
        });
        const { token, refreshToken, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role', role);
        toast.success(t('login.success'));
        navigate('/');
      } catch (err: any) {
        let message = t('login.error.generic');
        if (err.response?.data?.message === 'Invalid email or password!') {
          message = t('login.error.invalid');
        } else if (err.response?.data?.message === 'Your account is banned.') {
          message = t('login.error.banned');
        } else if (err.response?.data?.message === 'Too many failed attempts. Try again later.') {
          message = t('login.error.tooManyAttempts');
        }
        toast.error(message);
      }
    } else {
      if (!fullName || fullName.length < 2) {
        errors.push(t('register.error.invalidFullName'));
      }
      if (!email || !validateEmail(email)) {
        errors.push(t('register.error.invalidEmail'));
      }
      if (!password || !validatePassword(password)) {
        errors.push(t('register.error.invalidPassword'));
      }
      if (!confirmPassword || password !== confirmPassword) {
        errors.push(t('register.error.passwordMismatch'));
      }
      if (errors.length > 0) {
        errors.forEach((error) => toast.error(error));
        return;
      }

      try {
        const response = await axios.post('https://blog-production-5144.up.railway.app/auth/register', {
          fullName,
          email,
          password,
        });
        toast.success(t('register.success'));
        setIsLogin(true); // Switch to login after successful registration
      } catch (err: any) {
        toast.error(t('register.error.generic'));
      }
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
                  {isLogin 
                    ? t('login.subtitle')
                    : t('register.subtitle')
                  }
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
                      required
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
                    required
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
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gulf-dark mb-2">
                      {t('register.confirmPassword')}
                    </label>
                    <Input
                      type="password"
                      placeholder={t('register.confirmPasswordPlaceholder')}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <Button type="submit" className="w-full bg-gulf-primary hover:bg-gulf-primary/90 text-white">
                  {isLogin ? t('login.submit') : t('register.submit')}
                </Button>
                
                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gulf-primary hover:text-gulf-primary/80 text-sm"
                  >
                    {isLogin 
                      ? t('login.switchToRegister')
                      : t('register.switchToLogin')
                    }
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
    </div>
  );
};

export default Login;