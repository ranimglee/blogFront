import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { trackEvent } from '@/analytics/events';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug?: string }>();

  const { t } = useLanguage();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_IMAGE = '/images/no-content.jpg';
const trackedRef = useRef(false);

useEffect(() => {
  if (!project || trackedRef.current) return;

  trackedRef.current = true;

  trackEvent("PAGE_VIEW", {
    path: window.location.pathname,
    pageId: project.id,
    category: "PROJECT",
    referrer: document.referrer,
  });
}, [project]);

 useEffect(() => {
  const fetchProject = async () => {
    try {
      if (!slug) {
        setError("No slug provided.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/initiatives/slug/${slug}`
      );

      const data = response.data;

      const mappedProject = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.subTitle || 'No excerpt available',
        content: data.content || 'No detailed description.',
        author: data.createdBy || 'Admin',
        date: data.createdAt?.split('T')[0] || 'N/A',
        image: data.imageUrl || 'https://via.placeholder.com/600x400',
        location: data.country || 'Unknown',
        tags: data.tags || [],
      };

      if (
        typeof mappedProject.content === 'string' &&
        !mappedProject.content.match(/<[^>]+>/)
      ) {
        mappedProject.content = mappedProject.content
          .split(/[.!?]\s+/)
          .filter((s) => s.trim())
          .map((s) => `<p>${s.trim()}${s.endsWith('.') ? '' : '.'}</p>`)
          .join('');
      }

      setProject(mappedProject);
    } catch (err) {
      setError('Failed to load project. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [slug]);

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

  if (loading ) {
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
          <h1 className="text-4xl font-bold text-gulf-dark mb-4">Project Not Found</h1>
          <p className="text-gulf-dark/70 mb-8">{error}</p>
          <Link to="/projects" className="btn-primary">
            {t('backToProjects')}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gulf-white">
      <Header />
      <main className="pt-20">
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gulf-secondary/30 via-gulf-white to-gulf-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/projects" className="mb-8 inline-flex max-w-full items-center gap-2 text-sm font-medium text-gulf-primary transition-all duration-300 hover:text-gulf-coral">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>{t('backToProjects')}</span>
              <span className="text-gulf-dark/35">/</span>
              <span className="truncate text-gulf-dark/70">{project.title}</span>
            </Link>

            <div className="mx-auto max-w-5xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gulf-dark mb-6">{project.title}</h1>

              <div className="flex flex-wrap items-center gap-3 text-gulf-dark/70 mb-8">
                <div className="inline-flex items-center rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-gulf-light/80">
                  <Calendar className="w-4 h-4 mr-2 text-gulf-primary" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
                <div className="inline-flex items-center rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-gulf-light/80">
                  <MapPin className="w-4 h-4 mr-2 text-gulf-primary" />
                  <span>{project.location}</span>
                </div>
              </div>

              <div className="relative mb-10 overflow-hidden rounded-2xl shadow-2xl shadow-gulf-dark/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 md:h-[28rem] object-cover"
                  onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gulf-dark/25 via-transparent to-transparent" />
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
              <article className="mx-auto w-full max-w-4xl">
                <div className="prose prose-lg max-w-none text-gulf-dark/90 leading-8 break-words prose-p:my-6 prose-p:leading-8 prose-headings:text-gulf-dark prose-a:text-gulf-primary hover:prose-a:text-gulf-coral">
                  <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </div>

                {/* Tags */}
                {project.tags?.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gulf-light">
                    <div className="flex items-center flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full border border-gulf-primary/10 bg-gulf-secondary/30 px-3 py-1 text-sm text-gulf-dark transition-all duration-300 hover:bg-gulf-primary hover:text-white break-words"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <aside className="space-y-6 lg:sticky lg:top-28">
                <div className="rounded-2xl border border-gulf-light/80 bg-white p-5 shadow-xl shadow-gulf-dark/5">
                  <h2 className="mb-5 border-b border-gulf-light/70 pb-4 text-xl font-bold text-gulf-dark">{t('projects.title')}</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-gulf-secondary/25 p-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-gulf-primary" />
                      <div>
                        <p className="text-sm font-medium text-gulf-dark">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-gulf-secondary/25 p-3">
                      <Calendar className="mt-0.5 h-4 w-4 text-gulf-primary" />
                      <div>
                        <p className="text-sm font-medium text-gulf-dark">{new Date(project.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag: string) => (
                          <span key={tag} className="rounded-full bg-gulf-secondary/40 px-3 py-1 text-xs font-medium text-gulf-dark/75">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-gulf-light/80 bg-white p-5 shadow-xl shadow-gulf-dark/5">
                  <h2 className="mb-5 border-b border-gulf-light/70 pb-4 text-xl font-bold text-gulf-dark">{t('projects.viewAll')}</h2>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group flex gap-3 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-gulf-primary/15 hover:bg-gulf-secondary/20 hover:shadow-md"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-20 w-24 shrink-0 rounded-lg object-cover"
                      onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                    />
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm font-bold leading-6 text-gulf-dark transition-colors duration-300 group-hover:text-gulf-primary">
                        {project.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gulf-dark/60">
                        <span className="inline-flex items-center"><Calendar className="mr-1 h-3.5 w-3.5" />{project.date}</span>
                        <span className="inline-flex items-center"><MapPin className="mr-1 h-3.5 w-3.5" />{project.location}</span>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/projects"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gulf-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-gulf-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-primary/90"
                  >
                    {t('projects.viewAll')}
                  </Link>
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

export default ProjectDetail;
