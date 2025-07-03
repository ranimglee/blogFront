
import React from 'react';
import { Calendar, ArrowRight, MapPin, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewArticlesAndProjects = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      id: 1,
      title: "Smart Agriculture Cooperative Network",
      description: "Connecting farmers across the UAE through digital platforms and shared resources.",
      location: "United Arab Emirates",
      date: "2024",
      participants: 120,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
      type: "experience"
    },
    {
      id: 2,
      title: "Youth Housing Cooperative Initiative",
      description: "Affordable housing solutions for young professionals in Saudi Arabia.",
      location: "Saudi Arabia",
      date: "2023",
      participants: 200,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
      type: "experience"
    },
    {
      id: 3,
      title: "Digital Marketplace for Consumer Cooperatives",
      description: "E-commerce platform connecting Gulf consumer cooperatives.",
      location: "Gulf Region",
      date: "2024",
      participants: 80,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      type: "experience"
    }
  ];

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
          <div className="flex items-center text-sm text-gulf-dark/60">
            <Users className="w-4 h-4 mr-2" />
            <span>{item.participants} {t('projects.participants')}</span>
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
      <div className="container mx-auto px-4">
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
          <button className="btn-primary">
            {t('projects.viewAll')}
          </button>
         
        </div>
      </div>
    </section>
  );
};

export default NewArticlesAndProjects;
