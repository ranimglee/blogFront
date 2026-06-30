
import React from 'react';
import Header from '../components/Header';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import Hero from '@/components/Hero';
import ArticlesPreview from '@/components/ArticlesPreview';
import InitiativesPreview from '@/components/InitiativesPreview';
import ResourcesPreview from '@/components/ResourcesPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterCTA from '@/components/NewsletterCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Hero />
      <ArticlesPreview />
      <InitiativesPreview />
      <ResourcesPreview />
      <BlogSection />
      <TestimonialsSection />
  
      <NewsletterCTA />
      <Footer />
    </div>
  );
};

export default Index;
