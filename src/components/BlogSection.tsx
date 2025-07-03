
import React from 'react';
import { Calendar, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Agricultural Cooperatives in the UAE",
    excerpt: "Exploring how technology and innovation are transforming agricultural cooperatives across the Emirates, creating sustainable food systems.",
    author: "Dr. Ahmed Al-Mansouri",
    date: "2024-06-20",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
    readTime: "5"
  },
  {
    id: 2,
    title: "Housing Cooperatives: A Solution for Gulf Youth",
    excerpt: "How housing cooperatives are addressing the growing need for affordable housing among young professionals in Gulf cities.",
    author: "Sarah Al-Zahra",
    date: "2024-06-18",
    category: "Housing",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    readTime: "4"
  },
  {
    id: 3,
    title: "Digital Transformation in Consumer Cooperatives",
    excerpt: "Case studies on how consumer cooperatives in Saudi Arabia are leveraging digital platforms to enhance member experience.",
    author: "Mohammad Al-Rashid",
    date: "2024-06-15",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    readTime: "6"
  }
];

const BlogSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gulf-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gulf-dark mb-6">
            {t('blog.title')}
          </h2>
          <p className="text-lg text-gulf-dark/70 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg card-hover">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gulf-primary text-gulf-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gulf-dark/60 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} {t('blog.readTime')}</span>
                </div>
                
                <Link to={`/article/${post.id}`}>
                  <h3 className="text-xl font-bold text-gulf-dark mb-3 line-clamp-2 hover:text-gulf-coral transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gulf-dark/70 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gulf-dark/80">
                    {t('blog.author')} {post.author}
                  </span>
                  <Link 
                    to={`/article/${post.id}`}
                    className="text-gulf-coral hover:text-gulf-primary transition-colors flex items-center space-x-1"
                  >
                    <span className="text-sm font-medium">{t('blog.readMore')}</span>
                    <ArrowUp className="w-4 h-4 rotate-45" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <button className="btn-primary">
            {t('blog.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;