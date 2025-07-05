import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, FileText, BookOpen, Video } from 'lucide-react';
import axios from 'axios';

const Resources = () => {
  const { t } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const postsPerPage = 6; // Pagination: 6 resources per page

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ressources');
        console.log('API Response:', response.data); // Log full response for debugging
        if (Array.isArray(response.data)) {
          const fetchedResources = response.data.map((resource: any) => {
            if (!resource || typeof resource !== 'object') {
              console.warn('Invalid resource object:', resource);
              return null;
            }
            return {
              id: resource.id,
              title: resource.titre || 'Untitled Resource',
              description: resource.description || 'No description available',
              type: resource.fileType,
              size: resource.size ? `${(resource.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A',
              icon: getIconForType(resource.fileType),
              category: resource.category, // Keep as-is from API (e.g., "JURIDIQUE")
              fileUrl: resource.fileUrl || '', // Fallback for missing fileUrl
            };
          }).filter((resource) => resource !== null); // Filter out invalid resources
          setResources(fetchedResources);
        } else {
          throw new Error('Invalid API response: Expected an array');
        }
      } catch (err: any) {
        setError('Failed to fetch resources. Please try again later.');
        console.error('Error fetching resources:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Function to determine icon based on file type
  const getIconForType = (type: string | undefined): React.ReactNode => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-6 h-6" />;
      case 'Digital Book':
        return <BookOpen className="w-6 h-6" />;
      case 'Video Series':
        return <Video className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  // Download function
const handleDownload = async (ressourceId: string, fileName: any) => {
  try {
    console.log(`📥 Début du téléchargement pour ressourceId = ${ressourceId}`);

    const response = await axios.get(
      `http://localhost:8080/api/ressources/download/${ressourceId}`,
      { responseType: 'blob' }
    );

    console.log('📦 Réponse reçue du backend');
    console.log('🔖 Headers:', response.headers);

    const contentDisposition = response.headers['content-disposition'];
    const contentType = response.headers['content-type'];
    console.log(`📝 content-disposition: ${contentDisposition}`);
    console.log(`📂 content-type: ${contentType}`);

    let filename = "fichier";

    if (contentDisposition) {
      // Extraction du filename="monfichier.ext"
      const match = contentDisposition.match(/filename="([^"]+)"/);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
        console.log(`📄 Nom de fichier extrait: ${filename}`);
      } else {
        console.warn('⚠️ Pas de filename trouvé dans content-disposition');
      }
    } else {
      console.warn('⚠️ Pas d’en-tête content-disposition présent');
    }

    const blob = new Blob([response.data], { type: contentType });
    const url = URL.createObjectURL(blob);

    console.log('🔗 Création du lien de téléchargement et clic simulé');

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);

    console.log('✅ Téléchargement terminé');
  } catch (error) {
    console.error("❌ Erreur téléchargement :", error);
  }
};







  const categories = [
    { key: 'resources.filter.all', value: 'All' },
    { key: 'resources.filter.legal', value: 'Legal' },
    { key: 'resources.filter.finance', value: 'Finance' },
    { key: 'resources.filter.governance', value: 'Governance' },
    { key: 'resources.filter.caseStudies', value: 'Case Studies' },
  ];

  // Map API categories to filter values
  const categoryMap: { [key: string]: string } = {
    'JURIDIQUE': 'Legal',
    'FINANCE': 'Finance',
    'GOVERNANCE': 'Governance',
    'CASESTUDIES': 'Case Studies',
  };

  // Filter resources based on selected category
  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter((resource) => categoryMap[resource.category.toUpperCase()] === selectedCategory);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredResources.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-gulf-dark/70">Chargement des ressources...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
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
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-2 rounded-full border border-gulf-secondary transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-gulf-primary text-white border-gulf-primary'
                      : 'hover:bg-gulf-primary hover:text-white hover:border-gulf-primary'
                  }`}
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
              {currentResources.map((resource) => {
                const fileName = resource.fileUrl
                  ? resource.fileUrl.split('/').pop()?.split('?')[0] || `resource_${resource.id}`
                  : `resource_${resource.id}`;
                return (
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
                          <button
                            onClick={() => handleDownload(resource.id || '', fileName)}
                            className="flex items-center space-x-2 bg-gulf-primary hover:bg-gulf-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                            disabled={!resource.fileUrl}
                          >
                            <Download className="w-4 h-4" />
                            <span>{t('resources.download')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default Resources;