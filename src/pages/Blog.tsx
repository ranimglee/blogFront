
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSection from '../components/BlogSection';

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <BlogSection />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
