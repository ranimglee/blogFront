
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, Clock, Target } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
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
      status: "Active",
      fullDescription: "The Smart Agriculture Cooperative Network is a groundbreaking initiative that connects farmers across the UAE through advanced digital platforms and shared agricultural resources. This project aims to modernize traditional farming practices while maintaining sustainable agricultural methods.",
      objectives: [
        "Establish digital communication networks between farmers",
        "Share agricultural resources and equipment",
        "Implement smart farming technologies",
        "Create sustainable farming practices"
      ],
      achievements: [
        "120 farmers connected across the UAE",
        "30% increase in crop yield efficiency",
        "Reduced equipment costs by 40%",
        "Implemented IoT sensors in 50 farms"
      ],
      timeline: [
        { phase: "Planning & Research", date: "Jan 2024", status: "completed" },
        { phase: "Network Development", date: "Mar 2024", status: "completed" },
        { phase: "Pilot Testing", date: "Jun 2024", status: "completed" },
        { phase: "Full Implementation", date: "Sep 2024", status: "active" },
        { phase: "Expansion Phase", date: "Dec 2024", status: "upcoming" }
      ]
    },
    {
      id: 2,
      title: "Youth Housing Cooperative Initiative",
      description: "Affordable housing solutions for young professionals in Saudi Arabia.",
      location: "Saudi Arabia",
      date: "2023",
      participants: 200,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      status: "Completed",
      fullDescription: "The Youth Housing Cooperative Initiative addresses the growing need for affordable housing among young professionals in Saudi Arabia. This comprehensive program provides innovative financing solutions and cooperative ownership models.",
      objectives: [
        "Provide affordable housing options for young professionals",
        "Develop cooperative ownership models",
        "Create sustainable financing solutions",
        "Build community-centered housing developments"
      ],
      achievements: [
        "200 young professionals housed",
        "15 housing units completed",
        "Reduced housing costs by 35%",
        "Established 3 cooperative communities"
      ],
      timeline: [
        { phase: "Market Research", date: "Jan 2023", status: "completed" },
        { phase: "Cooperative Formation", date: "Mar 2023", status: "completed" },
        { phase: "Construction Phase", date: "Jun 2023", status: "completed" },
        { phase: "Community Development", date: "Sep 2023", status: "completed" },
        { phase: "Project Completion", date: "Dec 2023", status: "completed" }
      ]
    },
    {
      id: 3,
      title: "Digital Marketplace for Consumer Cooperatives",
      description: "E-commerce platform connecting Gulf consumer cooperatives.",
      location: "Gulf Region",
      date: "2024",
      participants: 80,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      status: "In Progress",
      fullDescription: "The Digital Marketplace for Consumer Cooperatives is an innovative e-commerce platform designed to connect consumer cooperatives across the Gulf region, facilitating trade and resource sharing between cooperative organizations.",
      objectives: [
        "Create unified digital marketplace",
        "Connect Gulf consumer cooperatives",
        "Facilitate inter-cooperative trade",
        "Develop digital payment systems"
      ],
      achievements: [
        "80 cooperatives onboarded",
        "Platform beta testing completed",
        "Integrated payment systems",
        "Mobile app development 70% complete"
      ],
      timeline: [
        { phase: "Platform Design", date: "Feb 2024", status: "completed" },
        { phase: "Development Phase", date: "Apr 2024", status: "completed" },
        { phase: "Beta Testing", date: "Jul 2024", status: "active" },
        { phase: "Full Launch", date: "Oct 2024", status: "upcoming" },
        { phase: "Regional Expansion", date: "Jan 2025", status: "upcoming" }
      ]
    }
  ];

  const project = projects.find(p => p.id === parseInt(id || ''));

  if (!project) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gulf-dark mb-4">Project Not Found</h1>
            <Link to="/projects" className="text-gulf-coral hover:text-gulf-primary">
              Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-gulf-primary text-gulf-white';
      case 'active': return 'bg-gulf-coral text-gulf-white';
      case 'upcoming': return 'bg-gulf-gold text-gulf-dark';
      default: return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gulf-white">
      <Header />
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-gulf-coral hover:text-gulf-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Active' ? 'bg-gulf-coral text-gulf-white' :
                    project.status === 'Completed' ? 'bg-gulf-primary text-gulf-white' :
                    'bg-gulf-gold text-gulf-dark'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-6">
                  {project.title}
                </h1>
                
                <p className="text-xl text-gulf-dark/80 mb-8">
                  {project.fullDescription}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gulf-dark/60">
                    <MapPin className="w-5 h-5 mr-2 text-gulf-coral" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gulf-dark/60">
                    <Calendar className="w-5 h-5 mr-2 text-gulf-coral" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center text-gulf-dark/60">
                    <Users className="w-5 h-5 mr-2 text-gulf-coral" />
                    <span>{project.participants} participants</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 bg-gulf-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Objectives */}
              <div className="bg-gulf-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Target className="w-6 h-6 text-gulf-coral mr-3" />
                  <h2 className="text-2xl font-bold text-gulf-dark">Objectives</h2>
                </div>
                <ul className="space-y-4">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gulf-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gulf-dark/80">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className="bg-gulf-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-gulf-primary mr-3" />
                  <h2 className="text-2xl font-bold text-gulf-dark">Key Achievements</h2>
                </div>
                <ul className="space-y-4">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gulf-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gulf-dark/80">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gulf-dark mb-4">Project Timeline</h2>
              <p className="text-gulf-dark/70">Follow the progress of this project through its various phases</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gulf-light"></div>
                
                {project.timeline.map((phase, index) => (
                  <div key={index} className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-gulf-white bg-gulf-coral z-10"></div>
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                    }`}>
                      <div className="bg-gulf-white rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(phase.status)}`}>
                            {phase.status}
                          </span>
                          <span className="text-sm text-gulf-dark/60">{phase.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gulf-dark">{phase.phase}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;