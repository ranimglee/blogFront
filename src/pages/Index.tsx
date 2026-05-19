
import React from 'react';
import Header from '../components/Header';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import Hero from '@/components/Hero';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
     
      <BlogSection />
     
      <Footer />
    </div>
  );
};

export default Index;
