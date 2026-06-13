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
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles`, {
          params: { lang: languageMap[language] },
        });

        const fetchedArticles = response.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((article: any) => ({
            id: article.id,
            slug: article.slug,
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
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-gulf-secondary/30 via-gulf-white to-gulf-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gulf-dark mb-5">{t('blog.title')}</h1>
            </div>

            {/* Search Bar */}
     <div className="mt-10 px-4 flex justify-center">
  <div className="w-full max-w-2xl">
    <div className="rounded-2xl border border-gulf-light/80 bg-white/90 p-3 shadow-xl shadow-gulf-dark/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gulf-dark/10">
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gulf-primary/70" />
          </div>
          <input
            type="text"
            placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
            className="h-14 w-full rounded-xl border border-gulf-light bg-white pl-12 pr-4 text-base text-gulf-dark shadow-sm outline-none transition-all duration-300 placeholder:text-gulf-dark/40 hover:border-gulf-primary/30 focus:border-gulf-primary focus:ring-4 focus:ring-gulf-primary/15"
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
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {currentArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentArticles.map(article => (
                  <article key={article.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gulf-light/80 bg-gulf-white shadow-lg shadow-gulf-dark/5 transition-all duration-300 hover:-translate-y-1 hover:border-gulf-primary/20 hover:shadow-2xl hover:shadow-gulf-dark/10">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gulf-secondary/30">
                      <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-gulf-dark/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gulf-primary text-gulf-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg shadow-gulf-dark/10 transition-colors duration-300 group-hover:bg-gulf-coral">{article.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gulf-dark/60 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                        <span className="h-1 w-1 rounded-full bg-gulf-dark/30" />
                        <span>{article.readTime} {t('blog.readTime')}</span>
                      </div>
                   <Link to={`/article/${article.slug}`}>
  <h3 className="text-xl font-bold leading-8 text-gulf-dark mb-3 transition-colors duration-300 group-hover:text-gulf-primary line-clamp-2">{article.title}</h3>
</Link>
                      <p className="text-gulf-dark/70 mb-6 line-clamp-3 leading-7">{article.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-gulf-light/70 pt-4">
                        <span className="min-w-0 truncate text-sm font-medium text-gulf-dark/80">{t('blog.author')} {article.author}</span>
                        <Link to={`/article/${article.slug}`} className="inline-flex shrink-0 items-center gap-1 text-gulf-coral font-semibold transition-all duration-300 hover:text-gulf-primary">
                          <span>{t('blog.readMore')}</span>
                          <ArrowUp className="w-4 h-4 rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center rounded-2xl border border-gulf-light/80 bg-white p-8 text-center shadow-xl shadow-gulf-dark/5 sm:p-10">
                <img src={DEFAULT_IMAGE} alt="No content available" className="mb-6 h-48 w-48 object-contain opacity-90 sm:h-64 sm:w-64" />
                <p className="text-2xl font-bold text-gulf-dark">{t('resources.no_content') || 'No articles available'}</p>
                <p className="mt-3 max-w-md text-sm leading-6 text-gulf-dark/60">{t('blog.searchPlaceholder') || 'Search articles...'}</p>
              </div>
            )}

            {/* Pagination */}
{/* Pagination with Arrows */}
{totalPages > 1 && (
  <div className="mt-10 flex flex-wrap justify-center items-center gap-3">
    {/* Previous Button */}
    <button
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:-translate-y-0.5 hover:border-gulf-primary/30 hover:bg-gulf-secondary/40 hover:text-gulf-primary hover:shadow-md'
      }`}
    >
      {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`h-11 min-w-11 rounded-full border px-4 font-semibold shadow-sm transition-all duration-300 ${
          currentPage === index + 1
            ? 'bg-gulf-primary text-white border-gulf-primary shadow-lg shadow-gulf-primary/20'
            : 'bg-white text-gulf-dark hover:-translate-y-0.5 hover:border-gulf-primary/30 hover:bg-gulf-secondary/40 hover:text-gulf-primary hover:shadow-md'
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:-translate-y-0.5 hover:border-gulf-primary/30 hover:bg-gulf-secondary/40 hover:text-gulf-primary hover:shadow-md'
      }`}
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
