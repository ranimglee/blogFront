import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, FileText, BookOpen, Video } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resources = () => {
  const { t,language } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const postsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem('token'); // adjust this based on your auth flow
    setIsAuthenticated(!!token);
  }, []);

 const languageMap: Record<string, string> = {
  ar: 'ARABIC',
  en: 'ENGLISH',
  fr: 'FRENCH',
};

useEffect(() => {
  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ressources`, {
        params: { lang: languageMap[language] } // send mapped language
      });

      if (Array.isArray(response.data)) {
        const fetchedResources = response.data
          .map((resource: any) => {
            if (!resource || typeof resource !== 'object') return null;
            return {
              id: resource.id,
              title: resource.titre || 'Untitled Resource',
              description: resource.description || 'No description available',
              type: resource.fileType,
              size: resource.size ? `${(resource.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A',
              icon: getIconForType(resource.fileType),
              category: resource.category,
              fileUrl: resource.fileUrl || '',
            };
          })
          .filter(Boolean);

        setResources(fetchedResources);
      } else {
        throw new Error('Invalid API response: Expected an array');
      }
    } catch (err: any) {
      setError('Failed to fetch resources. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setCurrentPage(1); // Reset pagination on language change
    }
  };

  fetchResources();
}, [language]); // Re-fetch whenever the language changes


  const getIconForType = (type: string | undefined): React.ReactNode => {
    switch (type) {
      case 'PDF': return <FileText className="w-6 h-6" />;
      case 'Digital Book': return <BookOpen className="w-6 h-6" />;
      case 'Video Series': return <Video className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };
const [downloadingId, setDownloadingId] = useState<string | null>(null);


const handleDownload = async (ressourceId: string, fileName: string) => {
  if (!isAuthenticated) {
    toast.warning(t('You must login to download') || 'Veuillez vous connecter pour télécharger ce fichier.');
    return;
  }

  setDownloadingId(ressourceId); // Start spinner

  try {
    console.log('Downloading resource:', ressourceId); // Debug

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/ressources/download/${ressourceId}`,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const contentDisposition = response.headers['content-disposition'];
    const contentType = response.headers['content-type'];

    let filename = fileName;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="([^"]+)"/);
      if (match && match[1]) filename = decodeURIComponent(match[1]);
    }

    const blob = new Blob([response.data], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    toast.success(t('resources.download_success') || 'Téléchargement terminé.');
  } catch (err) {
    console.error('Download error:', err);
    toast.error(t('resources.download_error') || 'Échec du téléchargement.');
  } finally {
    setDownloadingId(null); // Stop spinner
  }
};



  const categories = [
    { key: 'resources.filter.all', value: 'All' },
    { key: 'resources.filter.legal', value: 'Legal' },
    { key: 'resources.filter.finance', value: 'Finance' },
    { key: 'resources.filter.governance', value: 'Governance' },
    { key: 'resources.filter.caseStudies', value: 'Case Studies' },
  ];

  const categoryMap: { [key: string]: string } = {
    'JURIDIQUE': 'Legal',
    'FINANCE': 'Finance',
    'GOVERNANCE': 'Governance',
    'CASESTUDIES': 'Case Studies',
  };

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter((r) => categoryMap[r.category?.toUpperCase()] === selectedCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredResources.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const LoadingBooks = () => {
  const { t } = useLanguage();

return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* Rotating Book Icon */}
      <div className="perspective flex items-center justify-center">
        <div className="animate-rotateBook text-5xl">
          📖
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-lg text-gulf-dark/70 mt-6 animate-pulse">
        {t('loading.pleaseWait') || 'Please wait for a moment...'}
      </p>

      {/* Animation Styles */}
      <style>{`
        .perspective { perspective: 600px; }
        .animate-rotateBook { 
          animation: rotateBook 2s linear infinite; 
          transform-style: preserve-3d; 
          display: inline-block;
        }
        @keyframes rotateBook {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};



if (loading) {
  return (
    <div className="min-h-screen bg-gulf-white flex flex-col">
      <Header />
      <main className="pt-20 py-20 flex flex-col items-center justify-center flex-1">
        <LoadingBooks />
      </main>
      <Footer />
    </div>
  );
}  if (error) return <div className="min-h-screen"><Header /><main className="pt-20 py-20 text-center text-red-600">{error}</main><Footer /></div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-white text-center">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold text-gulf-dark mb-4">{t('resources.title')}</h1>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 border-b border-gulf-secondary/30 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
className={`px-6 py-2 rounded-full   transition-colors ${selectedCategory === c.value
                  ? 'bg-gulf-primary text-white'
                  : 'hover:bg-gulf-primary hover:text-white'
                  }`}
              >
                {t(c.key)}
              </button>
            ))}
          </div>
        </section>

        {/* Resources */}
       {/* Resources */}
<section className="py-20">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
    {currentResources.length > 0 ? (
      currentResources.map((resource) => {
        const fileName = resource.fileUrl?.split('/').pop()?.split('?')[0] || `resource_${resource.id}`;
        return (
          <div key={resource.id} className="bg-white border-black rounded-2xl p-6 shadow-lg">
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gulf-primary/10 rounded-lg flex items-center justify-center text-gulf-primary">
                {resource.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 text-xs">
                  <span className="bg-gulf-secondary text-gulf-dark px-2 py-1 rounded">{resource.category}</span>
                  <span className="text-gulf-dark/60">{resource.size}</span>
                </div>
                <h3 className="text-lg font-bold text-gulf-dark">{resource.title}</h3>
                <p className="text-sm text-gulf-dark/70 mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gulf-dark/60">{resource.type}</span>
<button
  onClick={() => handleDownload(resource.id || '', fileName)}
  className="flex items-center space-x-2 bg-gulf-primary hover:bg-gulf-primary/90 text-white px-4 py-2 rounded-lg transition"
  disabled={!resource.fileUrl || downloadingId === resource.id}
>
  {downloadingId === resource.id ? (
    // Spinner animation
    <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z"
      ></path>
    </svg>
  ) : (
    <Download className="w-4 h-4" />
  )}
  <span>
    {downloadingId === resource.id
      ? t('resources.downloading') || 'Downloading...'
      : t('resources.download')}
  </span>
</button>


                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
       <div className="col-span-full flex flex-col items-center justify-center mt-20">
    <img
      src="/images/no-content.jpg" // your image path
      alt="No content available"
      className="w-96 h-96 object-contain mb-6" // bigger size
    />
    <p className="text-2xl font-semibold text-gulf-dark/70">
      {t('resources.no_content') || 'No content available'}
    </p>
  </div>
)}
  </div>


          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-10">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-full border ${currentPage === index + 1
                    ? 'bg-gulf-primary text-white'
                    : 'bg-white text-gulf-dark hover:bg-gulf-light'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
