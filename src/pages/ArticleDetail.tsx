import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Clock, User, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { trackEvent } from '@/analytics/events';

interface Comment {
  id: string;
  content: string;
  author: string;
  approved: boolean;
  createdAt: string;
}

const ArticleDetail = () => {
    const { slug } = useParams<{ slug?: string }>();

  const { t, language } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState(false);
const DEFAULT_IMAGE = '/images/no-content.jpg';

const languageMap: Record<string, string> = {
  ar: 'ARABIC',
  en: 'ENGLISH',
  fr: 'FRENCH',
};
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


const trackedArticleId = useRef<string | null>(null);

useEffect(() => {
  if (!article) return;

  if (trackedArticleId.current === article.id) return;

  trackedArticleId.current = article.id;

  // Your analytics
  trackEvent("PAGE_VIEW", {
    path: window.location.pathname,
    pageId: article.id,
    category: "ARTICLE",
    referrer: document.referrer,
  });

  // Meta Pixel
  window.fbq?.("track", "ViewContent", {
    content_name: article.title,
    content_category: "Article",
    content_id: article.id,
  });
}, [article]);

useEffect(() => {
  if (!slug) {
    setLoading(false);
    setError("No article slug provided.");
    return;
  }

  fetchArticle();
}, [slug]);

const fetchArticle = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/articles/slug/${slug}`
    );

    const mappedArticle = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.description,
      content: data.contenu,
      author: data.auteur,
      date: data.createdAt.split("T")[0],
      category: data.type,
      image: data.imageUrl,
      readTime: calculateReadTime(data.contenu),
      tags: [data.type],
    };

    setArticle(mappedArticle);
    await fetchRelatedArticles(data.slug);

    // AFTER article is loaded → fetch comments
    await fetchComments(data.id);

  } catch (err) {
    console.error(err);
    setError("Failed to load article. Please try again later.");
  } finally {
    setLoading(false);
  }
};

const fetchRelatedArticles = async (currentSlug: string) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles`, {
      params: { lang: languageMap[language] },
    });

    const mappedArticles = data
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((item: any) => item.slug !== currentSlug)
      .slice(0, 4)
      .map((item: any) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        date: item.createdAt?.split('T')[0] || 'N/A',
        image: item.imageUrl || DEFAULT_IMAGE,
      }));

    setRelatedArticles(mappedArticles);
  } catch (err) {
    console.error(t('errors.relatedArticlesLoad'), err);
    setRelatedArticles([]);
  }
};

const fetchComments = async (articleId: string) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/comments/article/${articleId}`
    );

    setComments(data.filter((c: Comment) => c.approved));
  } catch (err) {
    console.error("Error loading comments:", err);
    setComments([]);
  }
};

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
  {
    articleId: article.id,   // ✅ NOT id
    content: newComment
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
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
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gulf-secondary/30 via-gulf-white to-gulf-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/article"
              className="inline-flex items-center text-gulf-primary hover:text-gulf-coral transition-all duration-300 mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToArticles')}
            </Link>
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <span className="bg-gulf-primary text-gulf-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-gulf-primary/15 transition-colors duration-300 hover:bg-gulf-coral">
                  {article.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gulf-dark mb-6 break-words">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gulf-dark/70 mb-8">
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
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-gulf-dark/10">
                <img
                  src={article.image || DEFAULT_IMAGE}
                  alt={article.title}
                  className="w-full h-72 md:h-[28rem] object-cover"
                  onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gulf-dark/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content & Comments */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
              <article className="mx-auto w-full max-w-4xl">
              <div className="prose prose-lg max-w-none text-gulf-dark/90 leading-8 break-words prose-p:my-6 prose-p:leading-8 prose-headings:text-gulf-dark prose-a:text-gulf-primary hover:prose-a:text-gulf-coral">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gulf-light">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gulf-dark/60" />
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gulf-secondary/30 text-gulf-dark px-3 py-1 rounded-full text-sm break-words transition-all duration-300 hover:bg-gulf-primary hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment Form */}
          <div className="mt-12 rounded-2xl border border-gulf-light/80 bg-gulf-secondary/20 p-6 shadow-lg shadow-gulf-dark/5 sm:p-8">
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
        className="mt-2 block w-full rounded-xl border-gulf-light bg-white p-4 text-gulf-dark shadow-sm transition-all duration-300 focus:border-gulf-primary focus:ring focus:ring-gulf-primary focus:ring-opacity-20"
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
      className="inline-flex items-center rounded-xl border border-transparent bg-gulf-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gulf-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-primary/90 hover:shadow-xl hover:shadow-gulf-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gulf-primary"
    >
      {t('comments.submit')}
    </button>
  </form>
</div>


      <h3 className="mt-12 text-xl font-bold text-gulf-dark mb-4">{t('comments.title')}</h3>
{comments.length === 0 ? (
  <p className="rounded-2xl border border-dashed border-gulf-light bg-white p-6 text-gulf-dark/70">{t('comments.noComments')}</p>
) : (
  <div className="space-y-6">
    {comments.map((comment) => (
      <div key={comment.id} className="rounded-2xl border border-gulf-light/80 bg-white p-5 shadow-sm shadow-gulf-dark/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gulf-dark/10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gulf-primary/10 text-sm font-bold uppercase text-gulf-primary">
              {comment.author?.charAt(0) || 'A'}
            </span>
            <span className="font-semibold text-gulf-dark">{comment.author}</span>
          </div>
          <span className="text-sm text-gulf-dark/70">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gulf-dark/90 leading-7">{comment.content}</p>
      </div>
    ))}
  </div>
)}

              </article>

              <aside className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-gulf-light/80 bg-white p-5 shadow-xl shadow-gulf-dark/5">
                  <div className="mb-5 flex items-center justify-between border-b border-gulf-light/70 pb-4">
                    <h2 className="text-xl font-bold text-gulf-dark">
                         {t('articles.relatedArticles')}
                    </h2>
                  </div>

                  {relatedArticles.length > 0 ? (
                    <div className="space-y-4">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.slug}
                          to={`/article/${related.slug}`}
                          className="group flex gap-3 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-gulf-primary/15 hover:bg-gulf-secondary/20 hover:shadow-md"
                        >
                          <img
                            src={related.image}
                            alt={related.title}
                            className="h-20 w-24 shrink-0 rounded-lg object-cover"
                            onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                          />
                          <div className="min-w-0">
                            <h3 className="line-clamp-2 text-sm font-bold leading-6 text-gulf-dark transition-colors duration-300 group-hover:text-gulf-primary">
                              {related.title}
                            </h3>
                            <div className="mt-2 flex items-center text-xs text-gulf-dark/60">
                              <Calendar className="mr-1.5 h-3.5 w-3.5" />
                              <span>{related.date}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-6 text-gulf-dark/60">{t('resources.no_content') || 'No articles available'}</p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
