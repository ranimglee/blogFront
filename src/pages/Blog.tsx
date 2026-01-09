import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, ArrowUp, Search,ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const BlogPage = () => {
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 3;

  const DEFAULT_IMAGE = '/images/no-content.jpg';

  const languageMap: Record<string, string> = {
    ar: 'ARABIC',
    en: 'ENGLISH',
    fr: 'FRENCH',
  };

  const calculateReadTime = (htmlContent: string) => {
    if (!htmlContent) return 1;
    const text = htmlContent.replace(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 220));
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles`, {
          params: { lang: languageMap[language] },
        });

        const fetchedArticles = response.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((article: any) => ({
            id: article.id,
            title: article.title,
            excerpt: article.description,
            author: article.auteur,
            date: article.createdAt?.split('T')[0] || 'N/A',
            category: article.type,
            image: article.imageUrl || DEFAULT_IMAGE,
            readTime: calculateReadTime(article.contenu),
          }));

        setArticles(fetchedArticles);
      } catch (err: any) {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    fetchArticles();
  }, [language]);

  // Filter articles by search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading component
  const LoadingBooks = () => (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-24 h-32 perspective flex items-center justify-center">
        <div className="animate-rotateBook text-5xl">📖</div>
      </div>
      <p className="text-lg text-gulf-dark/70 mt-6 animate-pulse">
        {t('loading.pleaseWait') || 'Please wait for a moment...'}
      </p>
      <style>{`
        .perspective { perspective: 600px; }
        .animate-rotateBook { 
          animation: rotateBook 1.5s linear infinite; 
          transform-style: preserve-3d; 
          display: inline-block;
        }
        @keyframes rotateBook {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gulf-white flex flex-col">
        <Header />
        <main className="pt-20 py-20 flex flex-col items-center justify-center flex-1">
          <LoadingBooks />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20 text-center">
          <p className="text-lg text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gulf-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gulf-dark mb-6">{t('blog.title')}</h1>

            {/* Search Bar */}
            <div className="mt-8 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-indigo-500" />
                      </div>
                      <input
                        type="text"
                        placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
                        className="w-full pl-12 pr-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white hover:border-indigo-300"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {currentArticles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {currentArticles.map(article => (
                  <div key={article.id} className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg card-hover">
                    <div className="relative overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }} />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gulf-primary text-gulf-white px-3 py-1 rounded-full text-sm font-medium">{article.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gulf-dark/60 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime} {t('blog.readTime')}</span>
                      </div>
                      <Link to={`/article/${article.id}`}>
                        <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                      </Link>
                      <p className="text-gulf-dark/70 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gulf-dark/80">{t('blog.author')} {article.author}</span>
                        <Link to={`/article/${article.id}`} className="text-gulf-coral flex items-center space-x-1 font-medium">
                          <span>{t('blog.readMore')}</span>
                          <ArrowUp className="w-4 h-4 rotate-45" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-20">
                <img src={DEFAULT_IMAGE} alt="No content available" className="w-96 h-96 object-contain mb-6" />
                <p className="text-2xl font-semibold text-gulf-dark/70">{t('resources.no_content') || 'No articles available'}</p>
              </div>
            )}

            {/* Pagination */}
{/* Pagination with Arrows */}
{totalPages > 1 && (
  <div className="flex justify-center items-center space-x-2 mt-8">
    {/* Previous Button */}
    <button
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-2 rounded-full border flex items-center justify-center ${
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:bg-gulf-light'
      } transition-colors`}
    >
      {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`px-4 py-2 rounded-full border ${
          currentPage === index + 1
            ? 'bg-gulf-primary text-white'
            : 'bg-white text-gulf-dark hover:bg-gulf-light'
        } transition-colors`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-2 rounded-full border flex items-center justify-center ${
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:bg-gulf-light'
      } transition-colors`}
    >
      {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
    </button>
  </div>
)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
