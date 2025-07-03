
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, FileText, BookOpen, Video } from 'lucide-react';

const Resources = () => {
  const { t } = useLanguage();

  const resources = [
    {
      id: 1,
      title: "Gulf Cooperative Legal Framework Guide",
      description: "Comprehensive guide to legal requirements for establishing cooperatives in Gulf countries.",
      type: "PDF Guide",
      size: "2.5 MB",
      icon: <FileText className="w-6 h-6" />,
      category: "Legal"
    },
    {
      id: 2,
      title: "Financial Management for Cooperatives",
      description: "Best practices and templates for managing cooperative finances and accounting.",
      type: "Excel Templates",
      size: "1.8 MB",
      icon: <FileText className="w-6 h-6" />,
      category: "Finance"
    },
    {
      id: 3,
      title: "Cooperative Governance Handbook",
      description: "Essential guide to board governance and member engagement strategies.",
      type: "Digital Book",
      size: "4.2 MB",
      icon: <BookOpen className="w-6 h-6" />,
      category: "Governance"
    },
    {
      id: 4,
      title: "Success Stories: Gulf Cooperatives",
      description: "Video series featuring successful cooperative case studies from across the region.",
      type: "Video Series",
      size: "150 MB",
      icon: <Video className="w-6 h-6" />,
      category: "Case Studies"
    }
  ];

  const categories = [
    { key: 'resources.filter.all', value: 'All' },
    { key: 'resources.filter.legal', value: 'Legal' },
    { key: 'resources.filter.finance', value: 'Finance' },
    { key: 'resources.filter.governance', value: 'Governance' },
    { key: 'resources.filter.caseStudies', value: 'Case Studies' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gulf-dark mb-6">
                {t('resources.title')}
              </h1>
              <p className="text-xl text-gulf-dark/80 mb-12">
                {t('resources.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b border-gulf-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className="px-6 py-2 rounded-full border border-gulf-secondary hover:bg-gulf-primary hover:text-white hover:border-gulf-primary transition-colors"
                >
                  {t(category.key)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white border border-gulf-secondary/30 rounded-2xl p-6 shadow-lg card-hover">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gulf-primary/10 rounded-lg flex items-center justify-center text-gulf-primary">
                        {resource.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-gulf-secondary text-gulf-dark px-2 py-1 rounded text-xs font-medium">
                          {resource.category}
                        </span>
                        <span className="text-gulf-dark/60 text-xs">
                          {resource.size}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gulf-dark mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gulf-dark/70 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gulf-dark/60">
                          {resource.type}
                        </span>
                        <button className="flex items-center space-x-2 bg-gulf-primary hover:bg-gulf-primary/90 text-white px-4 py-2 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                          <span>{t('resources.download')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="btn-primary">
                {t('resources.viewAll')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
