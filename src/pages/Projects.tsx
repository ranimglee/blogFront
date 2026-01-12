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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/initiatives`, {
          params: { lang: languageMap[language] },
        });

        const fetchedProjects = response.data
          .map((project: any) => ({
            id: project.id,
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
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gulf-dark mb-6">{t('projects.title')}</h1>
            {/* Search + Filter */}
   <div className="mt-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-indigo-500" />
              </div>
              <input
                type="text"
                placeholder={t('projects.searchPlaceholder')}

                className="w-full pl-12 pr-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white hover:border-indigo-300"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Country Select */}
            <div className="sm:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-indigo-500" />
              </div>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-10 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white hover:border-indigo-300 appearance-none cursor-pointer"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCountry !== 'All Countries') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium shadow-sm">
  {t('projects.activeSearch')}: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:bg-indigo-700 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {selectedCountry !== t('projects.allCountries')&& (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium shadow-sm">
                  {selectedCountry}
                  <button
onClick={() => setSelectedCountry(t('projects.allCountries'))}                    className="ml-1 hover:bg-emerald-700 rounded-full p-0.5 transition-colors"
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

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {currentProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {currentProjects.map((project) => (
                  <div key={project.id} className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg card-hover">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gulf-dark mb-3">{project.title}</h3>
                      <p className="text-gulf-dark/70 mb-4 line-clamp-3">{project.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gulf-dark/60">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gulf-dark/60">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-gulf-coral hover:text-gulf-primary transition-colors flex items-center space-x-1 font-medium"
                      >
                        <span>{t('projects.learnMore')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-20">
                <img
                  src={DEFAULT_IMAGE}
                  alt="No content available"
                  className="w-96 h-96 object-contain mb-6"
                />
                <p className="text-2xl font-semibold text-gulf-dark/70">
                  {t('resources.no_content') || 'No projects available'}
                </p>
              </div>
            )}

{/* Pagination with Arrow Icons */}
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


export default Projects;
