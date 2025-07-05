import React, { useEffect, useState } from 'react';
import { Calendar, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const BlogSection = () => {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/articles');
        const articles = response.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          excerpt: article.description,
          author: article.auteur,
          date: article.createdAt.split('T')[0],
          category: article.type,
          image: article.imageUrl,
          readTime: Math.ceil(article.contenu.length / 200) || 4,
        }));
        setBlogPosts(articles);
      } catch (err: any) {
        setError('Failed to fetch articles. Please try again later.');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gulf-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg text-gulf-dark/70">Chargement des articles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gulf-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </section>
    );
  }

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
          {currentPosts.map((post) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
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
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
