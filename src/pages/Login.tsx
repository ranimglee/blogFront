
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Login = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white border border-gulf-secondary/30 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gulf-dark mb-4">
                  {isLogin ? 'Login' : 'Register'}
                </h1>
                <p className="text-gulf-dark/70">
                  {isLogin 
                    ? 'Please log in to download resources and access premium content.'
                    : 'Create an account to access all features and resources.'
                  }
                </p>
              </div>
              
              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gulf-dark mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gulf-dark mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gulf-dark mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gulf-dark mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}
                
                <Button className="w-full bg-gulf-primary hover:bg-gulf-primary/90 text-white">
                  {isLogin ? 'Login' : 'Register'}
                </Button>
                
                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gulf-primary hover:text-gulf-primary/80 text-sm"
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Login"
                    }
                  </button>
                </div>

                {isLogin && (
                  <div className="text-center">
                    <a href="#" className="text-gulf-primary hover:text-gulf-primary/80 text-sm">
                      Forgot your password?
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;