
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero-responsive-fixed';
import BlogSection from '../components/BlogSection';
import NewArticlesAndProjects from '../components/NewArticlesAndProjects';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
     
      <BlogSection />
       <NewArticlesAndProjects />
      <Footer />
    </div>
  );
};

export default Index;
