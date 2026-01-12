import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // Step 1 = request code, Step 2 = reset password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleRequestReset = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/public/request-reset`, { email });
      toast.success(t('forgotPassword.codeSent'));
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || t('forgotPassword.errorRequest'));
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error(t('forgotPassword.passwordMismatch'));
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/public/reset-password`, {
        email,
        code,
        newPassword,
      });
      toast.success(t('forgotPassword.successReset'));
      setStep(1);

        // Redirect to login after short delay (so the user sees the success message)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || t('forgotPassword.errorReset'));
    }
  };

  return (
     <div className="min-h-screen bg-white">
      <Header />
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gulf-dark mb-6">
          {t('forgotPassword.title')}
        </h2>

        {step === 1 ? (
          <>
            <label className="block text-sm font-medium mb-2">{t('forgotPassword.email')}</label>
            <Input
              type="email"
              value={email}
              placeholder={t('forgotPassword.emailPlaceholder')}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleRequestReset} className="w-full mt-4 bg-gulf-primary text-white">
              {t('forgotPassword.requestCode')}
            </Button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-2">{t('forgotPassword.code')}</label>
            <Input
              type="text"
              value={code}
              placeholder={t('forgotPassword.codePlaceholder')}
              onChange={(e) => setCode(e.target.value)}
            />

            <label className="block text-sm font-medium mt-4 mb-2">{t('forgotPassword.newPassword')}</label>
            <Input
              type="password"
              value={newPassword}
              placeholder={t('forgotPassword.newPasswordPlaceholder')}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="block text-sm font-medium mt-4 mb-2">{t('forgotPassword.confirmPassword')}</label>
            <Input
              type="password"
              value={confirmNewPassword}
              placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            <Button onClick={handleResetPassword} className="w-full mt-4 bg-gulf-primary text-white">
              {t('forgotPassword.resetPassword')}
            </Button>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
     <Footer />
    </div>
  );
};

export default ForgotPassword;
