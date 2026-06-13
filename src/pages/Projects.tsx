import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin,ArrowLeft, ArrowRight, Search } from 'lucide-react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
const [selectedCountry, setSelectedCountry] = useState(t('projects.allCountries'));
  const postsPerPage = 3;

  const languageMap: Record<string, string> = {
    ar: 'ARABIC',
    en: 'ENGLISH',
    fr: 'FRENCH',
  };

  const DEFAULT_IMAGE = '/images/no-content.jpg';
useEffect(() => {
  setSelectedCountry(t('projects.allCountries'));
}, [language]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/initiatives`, {
          params: { lang: languageMap[language] },
        });

        const fetchedProjects = response.data
          .map((project: any) => ({
            id: project.id,
            slug: project.slug,
            title: project.title,
            description: project.subTitle || project.description || t('projects.noDescription'),
            location: project.country || 'Unknown',
            date: project.createdAt?.split('T')[0] || 'N/A',
            participants: project.participants || 0,
            image: project.imageUrl || DEFAULT_IMAGE,
          }))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setProjects(fetchedProjects);
      } catch (err: any) {
        setError('Failed to fetch projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    fetchProjects();
  }, [language]);

  // Filter projects based on search & country
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());


const matchesCountry =
  selectedCountry === t('projects.allCountries') || project.location === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredProjects.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get unique countries for filter dropdown
const countries = [t('projects.allCountries'), ...Array.from(new Set(projects.map((p) => p.location)))];

  return (
    <div className="min-h-screen bg-gulf-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="border-b border-gulf-light/70 bg-gradient-to-br from-gulf-secondary/25 via-gulf-white to-gulf-white py-12 sm:py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gulf-dark mb-4">{t('projects.title')}</h1>
            </div>
            {/* Search + Filter */}
   <div className="mt-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-gulf-light/80 bg-white/85 p-3 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gulf-primary/70" />
              </div>
              <input
                type="text"
                placeholder={t('projects.searchPlaceholder')}

                className="h-12 w-full rounded-xl border border-gulf-light bg-white pl-11 pr-4 text-sm text-gulf-dark outline-none transition-all duration-300 placeholder:text-gulf-dark/40 hover:border-gulf-primary/30 focus:border-gulf-primary focus:ring-4 focus:ring-gulf-primary/10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Country Select */}
            <div className="relative md:w-60">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gulf-primary/70" />
              </div>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gulf-light bg-white pl-11 pr-10 text-sm text-gulf-dark outline-none transition-all duration-300 hover:border-gulf-primary/30 focus:border-gulf-primary focus:ring-4 focus:ring-gulf-primary/10"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gulf-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCountry !== t('projects.allCountries')) && (
            <div className="mt-3 flex flex-wrap gap-2 px-1">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gulf-primary px-3 py-1 text-xs font-medium text-white">
  {t('projects.activeSearch')}: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:bg-gulf-dark/20 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {selectedCountry !== t('projects.allCountries')&& (
                <span className="inline-flex items-center gap-1 rounded-full bg-gulf-coral px-3 py-1 text-xs font-medium text-white">
                  {selectedCountry}
                  <button
onClick={() => setSelectedCountry(t('projects.allCountries'))}                    className="ml-1 hover:bg-gulf-dark/20 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  
          </div>
        </section>

        {/* Projects Feed */}
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {currentProjects.length > 0 ? (
              <div className="mx-auto max-w-5xl divide-y divide-gulf-light/80 rounded-2xl border border-gulf-light/80 bg-white shadow-sm shadow-gulf-dark/5">
                {currentProjects.map((project) => (
                  <article key={project.slug} className="group grid gap-4 p-4 transition-colors duration-300 hover:bg-gulf-secondary/15 sm:p-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-6">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gulf-secondary/30 md:aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gulf-dark/20 to-transparent opacity-70" />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center">
                      <Link to={`/projects/${project.slug}`} className="w-fit">
                        <h2 className="line-clamp-2 text-xl font-bold leading-7 text-gulf-dark transition-colors duration-300 group-hover:text-gulf-primary sm:text-2xl sm:leading-8">
                          {project.title}
                        </h2>
                      </Link>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-gulf-dark/65 sm:text-base">{project.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gulf-dark/55">
                        <span className="inline-flex items-center">
                          <MapPin className="mr-1.5 h-4 w-4 text-gulf-primary/75" />
                          <span>{project.location}</span>
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gulf-dark/25" />
                        <span className="inline-flex items-center">
                          <Calendar className="mr-1.5 h-4 w-4 text-gulf-primary/75" />
                          <span>{project.date}</span>
                        </span>
                      </div>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-gulf-coral transition-colors duration-300 hover:text-gulf-primary"
                      >
                        <span>{t('projects.learnMore')}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mx-auto mt-6 flex max-w-lg flex-col items-center justify-center rounded-2xl border border-gulf-light/80 bg-white p-8 text-center shadow-sm shadow-gulf-dark/5 sm:p-10">
                <img
                  src={DEFAULT_IMAGE}
                  alt="No content available"
                  className="mb-5 h-40 w-40 object-contain opacity-85 sm:h-52 sm:w-52"
                />
                <p className="text-xl font-bold text-gulf-dark sm:text-2xl">
                  {t('resources.no_content') || 'No projects available'}
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-gulf-dark/60">{t('projects.searchPlaceholder')}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCountry(t('projects.allCountries'));
                    setCurrentPage(1);
                  }}
                  className="mt-5 rounded-xl bg-gulf-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gulf-primary/90"
                >
                  {t('projects.allCountries')}
                </button>
              </div>
            )}

{/* Pagination with Arrow Icons */}
{totalPages > 1 && (
  <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
    {/* Previous Button */}
    <button
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:border-gulf-primary/30 hover:bg-gulf-secondary/35 hover:text-gulf-primary'
      }`}
    >
      {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`h-10 min-w-10 rounded-full border px-3 text-sm font-semibold transition-all duration-300 ${
          currentPage === index + 1
            ? 'bg-gulf-primary text-white border-gulf-primary shadow-sm shadow-gulf-primary/15'
            : 'bg-white text-gulf-dark hover:border-gulf-primary/30 hover:bg-gulf-secondary/35 hover:text-gulf-primary'
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:border-gulf-primary/30 hover:bg-gulf-secondary/35 hover:text-gulf-primary'
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


export default Projects;
