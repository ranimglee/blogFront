import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, MapPin, Users } from 'lucide-react';
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

const NewArticlesAndProjects = () => {
  const { t } = useLanguage();
const [experiences, setExperiences] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchInitiatives = async () => {
    try {
const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/initiatives/get-all-initiatives`);
      const initiatives = response.data.map((initiative: any) => ({
           id: initiative.id,
          title: initiative.title,
          description: initiative.subTitle || initiative.description || 'No description available',
          location: initiative.country || 'Unknown',
          date: initiative.createdAt?.split('T')[0] || 'N/A',
          image: initiative.imageUrl || 'https://via.placeholder.com/600x400'
      }));
      setExperiences(initiatives);
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors du chargement des initiatives.');
    } finally {
      setLoading(false);
    }
  };

  fetchInitiatives();
}, []);


  const renderExperienceCard = (item) => (
    <div className="bg-gulf-white border border-gulf-light rounded-2xl overflow-hidden shadow-lg card-hover">
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gulf-dark mb-3 line-clamp-2 hover:text-gulf-coral transition-colors cursor-pointer">
          {item.title}
        </h3>
        
        <p className="text-gulf-dark/70 mb-4 line-clamp-3">
          {item.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gulf-dark/60">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center text-sm text-gulf-dark/60">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{item.location}</span>
          </div>

        </div>
        
        <button className="text-gulf-coral hover:text-gulf-primary transition-colors flex items-center space-x-1 font-medium">
          <span>{t('projects.learnMore')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gulf-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gulf-dark mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-gulf-dark/70 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {experiences.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  {renderExperienceCard(item)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-center">
           <Link to={`/projects`}>
          <button className="btn-primary">
            {t('projects.viewAll')}
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArticlesAndProjects;
