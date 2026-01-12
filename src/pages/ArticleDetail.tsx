import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Clock, User, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

interface Comment {
  id: string;
  content: string;
  author: string;
  approved: boolean;
  createdAt: string;
}

const ArticleDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const { t } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState(false);
const calculateReadTime = (htmlContent: string) => {
  if (!htmlContent) return 1;

  // Remove HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, ' ');

  // Count words
  const words = text.trim().split(/\s+/).length;

  // Average reading speed
  const wordsPerMinute = 220;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles/${id}`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/comments/article/${id}`)
        ]);

        const data = articleResponse.data;
        const mappedArticle = {
          id: data.id,
          title: data.title,
          excerpt: data.description,
          content: data.contenu,
          author: data.auteur,
          date: data.createdAt.split('T')[0],
          category: data.type,
          image: data.imageUrl,
          readTime: calculateReadTime(data.contenu),
          tags: [data.type],
        };

        if (typeof mappedArticle.content === 'string' && !mappedArticle.content.match(/<[^>]+>/)) {
          mappedArticle.content = mappedArticle.content
            .split(/[.!?]\s+/)
            .filter((sentence) => sentence.trim())
            .map((sentence) => `<p>${sentence.trim()}${sentence.endsWith('.') ? '' : '.'}</p>`)
            .join('');
        }

        setArticle(mappedArticle);

        const approvedComments = commentsResponse.data.filter((comment: Comment) => comment.approved);
        setComments(approvedComments);
      } catch (err: any) {
        setError('Failed to load article or comments. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    } else {
      setLoading(false);
      setError('No article ID provided.');
    }
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setCommentError('Please write a comment.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/comments`,
        { articleId: id, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentSuccess(true);
      setNewComment('');
      setCommentError(null);
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (err: any) {
      setCommentError(t('comments.loginRequired'));
      console.error('Error submitting comment:', err);
    }
  };

  // Animated LoadingBooks component
  const LoadingBooks = () => (
   <div className="flex flex-col items-center justify-center mt-20">
    <div className="w-24 h-32 perspective flex items-center justify-center">
      <div className="animate-rotateBook text-5xl">
        📖
      </div>
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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20 text-center">
          <p className="text-lg text-red-600">{error || "The article you're looking for doesn't exist."}</p>
          <Link to="/article" className="btn-primary mt-4 inline-block">{t('backToArticles')}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gulf-white">
      <Header />
      <main className="pt-20">
        {/* Article Hero */}
        <section className="py-12 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/article"
              className="inline-flex items-center text-gulf-primary hover:text-gulf-coral transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToArticles')}
            </Link>
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="bg-gulf-primary text-gulf-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-6 break-words">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gulf-dark/70 mb-8">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.readTime} {t('blog.readTime')}</span>
                </div>
              </div>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Article Content & Comments */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-gulf-dark/90 leading-relaxed break-words">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gulf-light">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gulf-dark/60" />
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gulf-secondary/30 text-gulf-dark px-3 py-1 rounded-full text-sm break-words"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment Form */}
          <div className="mt-12 p-6 bg-gulf-secondary/20 rounded-2xl">
  <h3 className="text-xl font-bold text-gulf-dark mb-4">
    {t('comments.leaveComment')}
  </h3>

  <form onSubmit={handleCommentSubmit} className="space-y-4">
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gulf-dark/70"
      >
        {t('comments.comment')}
      </label>

      <textarea
        id="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="mt-1 block w-full rounded-md border-gulf-light shadow-sm focus:border-gulf-primary focus:ring focus:ring-gulf-primary focus:ring-opacity-50"
        rows={4}
        required
      />
    </div>

    {commentError && (
      <p className="text-red-500 text-sm">{commentError}</p>
    )}

    {commentSuccess && (
      <p className="text-green-500 text-sm">
        {t('comments.success')}
      </p>
    )}

    <button
      type="submit"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gulf-primary hover:bg-gulf-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gulf-primary"
    >
      {t('comments.submit')}
    </button>
  </form>
</div>


      <h3 className="text-xl font-bold text-gulf-dark mb-4">{t('comments.title')}</h3>
{comments.length === 0 ? (
  <p className="text-gulf-dark/70">{t('comments.noComments')}</p>
) : (
  <div className="space-y-6">
    {comments.map((comment) => (
      <div key={comment.id} className="p-4 bg-gulf-secondary/10 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gulf-dark">{comment.author}</span>
          <span className="text-sm text-gulf-dark/70">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gulf-dark/90">{comment.content}</p>
      </div>
    ))}
  </div>
)}

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
