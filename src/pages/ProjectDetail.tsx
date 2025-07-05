import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, Target, Clock } from 'lucide-react';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const { t } = useLanguage();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/get-initiative-by/${id}`);
        const data = response.data;
        const mappedProject = {
          id: data.id,
          title: data.title,
          description: data.subTitle || data.description || 'No description available',
          location: data.country || 'Unknown',
          date: data.createdAt?.split('T')[0] || 'N/A',
          participants: data.participants || 0,
          image: data.imageUrl || 'https://via.placeholder.com/600x400',
          status: data.status || 'In Progress',
          fullDescription: data.content || 'No detailed description available',
          objectives: data.objectives || ['No objectives specified'],
          achievements: data.achievements || ['No achievements recorded'],
          timeline: data.timeline || [
            { phase: 'Planning', date: 'N/A', status: 'upcoming' },
          ],
        };
        setProject(mappedProject);
      } catch (err: any) {
        setError('Failed to load project. Please try again later.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    } else {
      setLoading(false);
      setError('No project ID provided.');
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-gulf-dark/70">Chargement du projet...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gulf-dark mb-4">Project Not Found</h1>
            <p className="text-gulf-dark/70 mb-8">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
            <Link to="/projects" className="text-gulf-coral hover:text-gulf-primary">
              {t('backToProjects')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gulf-primary text-gulf-white';
      case 'active':
        return 'bg-gulf-coral text-gulf-white';
      case 'upcoming':
        return 'bg-gulf-gold text-gulf-dark';
      default:
        return 'bg-gray-200 text-gray-600';
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
            {t('backToProjects')}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Active'
                        ? 'bg-gulf-coral text-gulf-white'
                        : project.status === 'Completed'
                        ? 'bg-gulf-primary text-gulf-white'
                        : 'bg-gulf-gold text-gulf-dark'
                    }`}
                  >
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
                    <span>{project.participants} {t('participants')}</span>
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
                  <h2 className="text-2xl font-bold text-gulf-dark">{t('objectives')}</h2>
                </div>
                <ul className="space-y-4">
                  {project.objectives.map((objective: string, index: number) => (
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
                  <h2 className="text-2xl font-bold text-gulf-dark">{t('achievements')}</h2>
                </div>
                <ul className="space-y-4">
                  {project.achievements.map((achievement: string, index: number) => (
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
              <h2 className="text-3xl font-bold text-gulf-dark mb-4">{t('timeline')}</h2>
              <p className="text-gulf-dark/70">{t('timelineDescription')}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gulf-light"></div>

                {project.timeline.map((phase: any, index: number) => (
                  <div
                    key={index}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-gulf-white bg-gulf-coral z-10"
                    ></div>

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                      }`}
                    >
                      <div className="bg-gulf-white rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(phase.status)}`}
                          >
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