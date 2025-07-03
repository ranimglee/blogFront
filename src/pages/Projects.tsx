
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: "Smart Agriculture Cooperative Network",
      description: "Connecting farmers across the UAE through digital platforms and shared resources.",
      location: "United Arab Emirates",
      date: "2024",
      participants: 120,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
      status: "Active"
    },
    {
      id: 2,
      title: "Youth Housing Cooperative Initiative",
      description: "Affordable housing solutions for young professionals in Saudi Arabia.",
      location: "Saudi Arabia",
      date: "2023",
      participants: 200,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      status: "Completed"
    },
    {
      id: 3,
      title: "Digital Marketplace for Consumer Cooperatives",
      description: "E-commerce platform connecting Gulf consumer cooperatives.",
      location: "Gulf Region",
      date: "2024",
      participants: 80,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      status: "In Progress"
    }
  ];

  const getStatusTranslation = (status: string) => {
    switch(status) {
      case 'Active': return t('projects.status.active');
      case 'Completed': return t('projects.status.completed');
      case 'In Progress': return t('projects.status.inProgress');
      default: return status;
    }
  };

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
              {projects.map((project) => (
                <div key={project.id} className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg card-hover">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Active' ? 'bg-gulf-coral text-gulf-white' :
                        project.status === 'Completed' ? 'bg-gulf-primary text-gulf-white' :
                        'bg-gulf-gold text-gulf-dark'
                      }`}>
                        {getStatusTranslation(project.status)}
                      </span>
                    </div>
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
                      <div className="flex items-center text-sm text-gulf-dark/60">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{project.participants} {t('projects.participants')}</span>
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
            
            <div className="text-center">
              <button className="btn-primary">
                {t('projects.viewAll')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;