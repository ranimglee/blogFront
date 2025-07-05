import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // Pagination: 3 projects per page

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/initiatives/get-all-initiatives');
        const fetchedProjects = response.data.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.subTitle || project.description || 'No description available',
          location: project.country || 'Unknown',
          date: project.createdAt?.split('T')[0] || 'N/A',
          participants: project.participants || 0,
          image: project.imageUrl || 'https://via.placeholder.com/600x400',
        }));
        setProjects(fetchedProjects);
      } catch (err: any) {
        setError('Failed to fetch projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(projects.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 

  if (loading) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-gulf-dark/70">Chargement des projets...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-red-600">{error}</p>
          </div>
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
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gulf-dark mb-6">
                {t('projects.title')}
              </h1>
              <p className="text-xl text-gulf-dark/80 mb-12">
                {t('projects.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {currentProjects.map((project) => (
                <div key={project.id} className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg card-hover">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                   
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gulf-dark mb-3">
                      {project.title}
                    </h3>

                    <p className="text-gulf-dark/70 mb-4 line-clamp-3">
                      {project.description}
                    </p>

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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-full border ${
                        currentPage === pageNumber
                          ? 'bg-gulf-primary text-white'
                          : 'bg-white text-gulf-dark hover:bg-gulf-light'
                      } transition-colors`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
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