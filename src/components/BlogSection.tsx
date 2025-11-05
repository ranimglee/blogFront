import React, { useEffect, useState } from 'react';
import { Calendar, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const BlogCarousel = () => {
  const { t, language } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef] = useEmblaCarousel(
    { loop: blogPosts.length > 3, align: 'start' },
    [Autoplay({ delay: 4000 })]
  );

  const DEFAULT_IMAGE = '/images/no-content.jpg';
  const languageMap: Record<string, string> = { ar: 'ARABIC', en: 'ENGLISH', fr: 'FRENCH' };

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles`, {
          params: { lang: languageMap[language] },
        });

        const latestArticles = response.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6)
          .map((article: any) => ({
            id: article.id,
            title: article.title,
            excerpt: article.description,
            author: article.auteur,
            date: article.createdAt.split('T')[0],
            category: article.type,
            image: article.imageUrl || DEFAULT_IMAGE,
            readTime: Math.ceil(article.contenu.length / 200) || 4,
          }));

        setBlogPosts(latestArticles);
      } catch (err: any) {
        setError('Failed to fetch articles. Please try again later.');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  // Loading state
  const LoadingBooks = () => (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-24 h-32 perspective flex items-center justify-center">
        <div className="animate-rotateBook text-5xl">📖</div>
      </div>
      <p className="text-lg text-gulf-dark/70 mt-6 animate-pulse">
        {t('loading.pleaseWait') || 'Please wait for a moment...'}
      </p>
    </div>
  );

  if (loading) return <LoadingBooks />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <section className="py-20 bg-gulf-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gulf-dark text-center mb-12">
          {t('blog.title')}
        </h2>

        {blogPosts.length > 0 ? (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] transition-transform duration-300"
                >
                  <div className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg flex flex-col h-full">
                    <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gulf-primary text-gulf-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center text-sm text-gulf-dark/60 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} {t('blog.readTime')}</span>
                      </div>
                      <Link to={`/article/${post.id}`}>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-gulf-coral transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gulf-dark/70 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-medium text-gulf-dark/80">
                          {t('blog.author')} {post.author}
                        </span>
                        <Link to={`/article/${post.id}`} className="text-gulf-coral flex items-center space-x-1 font-medium">
                          <span>{t('blog.readMore')}</span>
                          <ArrowUp className="w-4 h-4 rotate-45" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <img src={DEFAULT_IMAGE} alt="No content available" className="w-96 h-96 object-contain mb-6" />
            <p className="text-2xl font-semibold text-gulf-dark/70">
              {t('resources.no_content') || 'No articles available'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogCarousel;
