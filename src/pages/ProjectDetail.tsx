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
        const response = await axios.get(`https://blog-production-5144.up.railway.app/api/initiatives/get-initiative-by/${id}`);
        const data = response.data;

        const mappedProject = {
          id: data.id,
          title: data.title,
          excerpt: data.subTitle || 'No excerpt available',
          content: data.content || 'No detailed description.',
          author: data.createdBy || 'Admin',
          date: data.createdAt?.split('T')[0] || 'N/A',
          image: data.imageUrl || 'https://via.placeholder.com/600x400',
          location: data.country || 'Unknown',
        };

        if (typeof mappedProject.content === 'string' && !mappedProject.content.match(/<[^>]+>/)) {
          mappedProject.content = mappedProject.content
            .split(/[.!?]\s+/)
            .filter((sentence) => sentence.trim())
            .map((sentence) => `<p>${sentence.trim()}${sentence.endsWith('.') ? '' : '.'}</p>`)
            .join('');
        }

        setProject(mappedProject);
      } catch (err) {
        setError('Failed to load project. Please try again later.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
    else {
      setLoading(false);
      setError('No project ID provided.');
    }
  }, [id]);

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20 text-center">
          <p className="text-lg text-gulf-dark/70">Chargement du projet...</p>
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
        <section className="py-12 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/projects" className="inline-flex items-center text-gulf-primary hover:text-gulf-coral mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToProjects')}
            </Link>

            <div className="max-w-4xl mx-auto">
             

              <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-6">{project.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-gulf-dark/70 mb-8">
           
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
              </div>

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-8"
              />

              <div className="prose prose-lg max-w-none text-gulf-dark/90 leading-relaxed break-words">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gulf-light">
                  <div className="flex items-center flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gulf-secondary/30 text-gulf-dark px-3 py-1 rounded-full text-sm break-words"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};


export default ProjectDetail;