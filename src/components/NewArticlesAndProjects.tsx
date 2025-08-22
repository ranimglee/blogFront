import React, { useEffect, useState } from 'react';
import { Calendar, ArrowUp, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewProjectsCarousel = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_IMAGE = '/images/no-content.jpg';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/initiatives/get-all-initiatives`);
        const latestProjects = response.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6) // only latest 6
          .map((project: any) => ({
            id: project.id,
            title: project.title || 'Untitled',
            description: project.subTitle || project.description || t('resources.no_content'),
            location: project.country || 'Unknown',
            date: project.createdAt?.split('T')[0] || 'N/A',
            image: project.imageUrl || DEFAULT_IMAGE,
          }));
        setProjects(latestProjects);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-24 h-32 perspective">
        <div className="w-full h-full bg-blue-500 rounded-lg shadow-lg animate-rotateBook flex items-center justify-center text-white font-bold text-lg">
          📖
        </div>
      </div>
      <p className="text-lg text-gulf-dark/70 mt-6 animate-pulse">
        {t('loading.pleaseWait') || 'Please wait for a moment...'}
      </p>
      <style>
        {`
          .perspective { perspective: 600px; }
          .animate-rotateBook { animation: rotateBook 1.5s linear infinite; transform-style: preserve-3d; }
          @keyframes rotateBook { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(180deg); } 100% { transform: rotateY(360deg); } }
        `}
      </style>
    </div>
  );

  const renderProjectCard = (project) => (
    <div className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gulf-dark mb-3 line-clamp-2 hover:text-gulf-coral transition-colors cursor-pointer">
          {project.title}
        </h3>

        <p className="text-gulf-dark/70 mb-4 line-clamp-3 flex-1">{project.description}</p>

        <div className="flex items-center text-sm text-gulf-dark/60 mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{project.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{project.location}</span>
          </div>
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="text-gulf-coral hover:text-gulf-primary transition-colors flex items-center space-x-1 font-medium mt-auto"
        >
          <span>{t('projects.learnMore')}</span>
          <ArrowUp className="w-4 h-4 rotate-45" />
        </Link>
      </div>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <p className="text-red-600 text-center py-20">{error}</p>;

  return (
    <section className="py-20 bg-gulf-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gulf-dark text-center mb-12">
          {t('projects.title')}
        </h2>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-7xl mx-auto mb-12"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                {renderProjectCard(project)}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      
      </div>
    </section>
  );
};

export default NewProjectsCarousel;
