import React, { useEffect, useState, useMemo, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Download, FileText, BookOpen, Video, ArrowLeft, ArrowRight, 
  Search, FileSpreadsheet, FileImage, File, Eye, Mail 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { NationalSubCategory, Resource, ResourceCategory, ResourceSubCategory } from '@/types/types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();



const Resources: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedPreviewResource, setSelectedPreviewResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 3;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewData, setPreviewData] = useState<Uint8Array | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);
const [allCategories, setAllCategories] =
  useState<(ResourceCategory | 'All')[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory | 'All'>('All');

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<ResourceSubCategory | 'All'>('All');

  const [selectedSubSubCategory, setSelectedSubSubCategory] =
    useState<NationalSubCategory | 'All'>('All');

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobile = window.innerWidth < 640;

  const memoizedFile = useMemo(() => (previewData ? { data: previewData } : null), [previewData]);
const categoryTranslationKeyMap: Record<string, string> = {
  LEGAL: 'resources.category.legal',
  DATA: 'resources.category.data',
  DIVERSE: 'resources.category.diverse',
  STUDIES: 'resources.category.studies',
};

const getSubCategoryLabel = (sub: ResourceSubCategory) =>
  t(`resources.subCategory.${sub.toLowerCase()}`);

const getNationalSubCategoryLabel = (sub: NationalSubCategory) =>
  t(nationalSubCategoryLabelKey[sub]);
 
const nationalSubCategoryLabelKey: Record<NationalSubCategory, string> = {
  EMIRATES: 'resources.subCategory.emirates',
  BAHRAIN: 'resources.subCategory.bahrain',
  SAUDI_ARABIA: 'resources.subCategory.saudi_arabia',
  OMAN: 'resources.subCategory.oman',
  QATAR: 'resources.subCategory.qatar',
  KUWAIT: 'resources.subCategory.kuwait',
};

const categorySubcategoriesMap: Record<ResourceCategory, ResourceSubCategory[]> = {
  LEGAL: [ResourceSubCategory.NATIONAL, ResourceSubCategory.INTERNATIONAL],
  DIVERSE: [
    ResourceSubCategory.CASE_LAW,
    ResourceSubCategory.OPINIONS,
    ResourceSubCategory.OTHER,
  ],
  DATA: [],
  STUDIES: [],
};

const subCategories = useMemo<(ResourceSubCategory | 'All')[]>(() => {
  if (selectedCategory === 'All') return [];

  const subs = categorySubcategoriesMap[selectedCategory];

  // ✅ DATA & STUDIES → no subcategories → no "All"
  if (subs.length === 0) return [];

  // ✅ LEGAL & DIVERSE → keep "All"
  return ['All', ...subs];
}, [selectedCategory]);


const nationalSubCategories = useMemo<(NationalSubCategory | 'All')[]>(() => [
  'All',
  ...(Object.values(NationalSubCategory) as NationalSubCategory[]),
], []);


  useEffect(() => setSelectedSubCategory('All'), [selectedCategory]);

  const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || selectedPreviewResource?.type !== 'PDF') return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) < 50) return;
    if (distance > 0 && pageNumber < numPages) setPageNumber((p) => p + 1);
    else if (distance < 0 && pageNumber > 1) setPageNumber((p) => p - 1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/ressources/categories`)
    .then((res) =>
      setAllCategories([
        'All',
        ...(res.data as ResourceCategory[]),
      ])
    )
    .catch(console.error);
}, []);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPreviewResource(null);
      setIsClosing(false);
    }, 200);
  };

  const getIconForType = (type: string | undefined) => {
    switch (type) {
      case 'PDF': return <FileText className="w-6 h-6" />;
      case 'VIDEO': return <Video className="w-6 h-6" />;
      case 'EXCEL': return <FileSpreadsheet className="w-6 h-6" />;
      case 'DOC': return <BookOpen className="w-6 h-6" />;
      case 'IMAGE': return <FileImage className="w-6 h-6" />;
      default: return <File className="w-6 h-6" />;
    }
  };
const nationalSubcategoryMap: Record<string, string> = {
  EMIRATES: 'Emirates',
  BAHRAIN: 'Bahrain',
  SAUDI_ARABIA: 'Saudi Arabia',
  OMAN: 'Oman',
  QATAR: 'Qatar',
  KUWAIT: 'Kuwait',
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
useEffect(() => {
  setSelectedSubSubCategory('All'); // ✅ reset when switching subcategory
}, [selectedSubCategory]);
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const languageMap: Record<string, string> = { ar: 'ARABIC', en: 'ENGLISH', fr: 'FRENCH' };
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ressources`, {
          params: { lang: languageMap[language] },
        });

        if (!Array.isArray(response.data)) throw new Error('Invalid API response');

        const mapped: Resource[] = response.data.map((r: any) => ({
          id: r.id,
          title: r.titre || 'Untitled Resource',
          description: r.description || 'No description available',
          type: r.fileType,
          size: r.size
          ? r.size < 1024
          ? `${r.size} B`
          : r.size < 1024 * 1024
          ? `${(r.size / 1024).toFixed(1)} KB`
          : `${(r.size / (1024 * 1024)).toFixed(1)} MB`
          : 'N/A',
          icon: getIconForType(r.fileType),
          category: (r.category?.toUpperCase() as ResourceCategory) || ResourceCategory.DIVERSE,
          subCategory: (r.subCategory?.toUpperCase() as ResourceSubCategory) || ResourceSubCategory.OTHER,
subSubCategory: r.subSubCategory
  ? (r.subSubCategory.toUpperCase() as NationalSubCategory)
  : null,
          fileUrl: r.fileUrl || '',
        }));

        setResources(mapped.filter(Boolean));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch resources. Please try again later.');
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    fetchResources();
  }, [language]);

const filteredResources = resources.filter((r) => {
  const matchesCategory =
    selectedCategory === 'All' || r.category === selectedCategory;

  const matchesSubCategory =
    selectedSubCategory === 'All' || r.subCategory === selectedSubCategory;

  const matchesSubSubCategory =
    selectedCategory === 'LEGAL' && selectedSubCategory === 'NATIONAL'
      ? selectedSubSubCategory === 'All' ||
        r.subSubCategory === selectedSubSubCategory
      : true;

  const matchesSearch =
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    matchesCategory &&
    matchesSubCategory &&
    matchesSubSubCategory &&
    matchesSearch
  );
});


  const totalPages = Math.ceil(filteredResources.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = async (id: string, fileName: string) => {
    if (!isAuthenticated) {
      toast.warning(t('auth.loginRequiredDownload'));
      return;
    }

    setDownloadingId(id);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ressources/download/${id}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);

      toast.success(t('resources.download_success') || 'Téléchargement terminé.');
    } catch (err) {
      console.error(err);
      toast.error(t('resources.download_error') || 'Échec du téléchargement.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePreview = async (resource: Resource) => {
    try {
      if (!resource.fileUrl) return;

      if (['IMAGE', 'VIDEO'].includes(resource.type)) {
        setPreviewData(null);
        setPreviewKey((k) => k + 1);
        setSelectedPreviewResource(resource);
        return;
      }

      if (resource.type === 'PDF') {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ressources/preview/${resource.id}`, {
          responseType: 'arraybuffer',
        });
        const bytes = new Uint8Array(res.data);
        setPreviewData(bytes);
        setPreviewKey((k) => k + 1);
        setPageNumber(1);
        setNumPages(0);
        setSelectedPreviewResource(resource);
      }

      if (['DOC', 'EXCEL'].includes(resource.type)) {
        window.open(resource.fileUrl, '_blank');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unable to preview file');
    }
  };

  const LoadingBooks = () => (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="perspective flex items-center justify-center">
        <div className="animate-rotateBook text-5xl">📖</div>
      </div>
      <p className="text-lg text-gulf-dark/70 mt-6 animate-pulse">
        {t('loading.pleaseWait') || 'Please wait for a moment...'}
      </p>
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
  }

  if (error)
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 py-20 text-center text-red-600">{error}</main>
        <Footer />
      </div>
    );
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-gulf-secondary/30 to-white text-center">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold text-gulf-dark mb-4">{t('resources.title')}</h1>
          </div>
        </section>

        <div className="mt-8 px-4">
  <div className="max-w-4xl mx-auto">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-6">
      
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-indigo-500" />
        </div>
        <input
          type="text"
          placeholder={t('resources.searchPlaceholder') || 'Search resources...'}
          className="w-full pl-12 pr-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white hover:border-indigo-300"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

{/* Category Filter */}
<div className="flex flex-wrap justify-center gap-4 mb-4">
  {allCategories.map((cat) => (
    <button
      key={cat}
      onClick={() => {
        setSelectedCategory(cat);
        setCurrentPage(1);
      }}
      className={`px-6 py-2 rounded-full transition-colors ${
        selectedCategory === cat
          ? 'bg-gulf-primary text-white'
          : 'hover:bg-gulf-primary hover:text-white'
      }`}
    >
      {cat === 'All'
        ? t('resources.filter.all')
        : t(categoryTranslationKeyMap[cat] || cat)}
    </button>
  ))}
</div>

{/* Subcategory Filter */}
{selectedCategory !== 'All' && (
  <div className="flex flex-wrap justify-center gap-4 mb-4 ">
    {subCategories.map((sub) => (
      <button
        key={sub}
        onClick={() => {
          setSelectedSubCategory(sub);
          setCurrentPage(1);
        }}
className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200
  ${
    selectedSubCategory === sub
      ? 'bg-[#1A535C] text-white'
      : 'bg-[#1A535C]/10 text-[#1A535C] hover:bg-[#C2AF42] hover:text-white'
  }`}




      >
    {t(`resources.subCategory.${sub.toLowerCase()}`)}
      </button>
    ))}
  </div>
)}

{selectedCategory === 'LEGAL' && selectedSubCategory === 'NATIONAL' && (
  <div className="flex flex-wrap justify-center gap-4 mb-4">
    {nationalSubCategories.map((subSub) => (
      <button
        key={subSub}
        onClick={() => {
          setSelectedSubSubCategory(subSub);
          setCurrentPage(1);
        }}
        className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
          selectedSubSubCategory === subSub
            ? 'bg-gulf-primary text-white'
            : 'hover:bg-gulf-primary hover:text-white'
        }`}
      >
       {subSub === 'All'
  ? t('resources.filter.all')
  : t(nationalSubCategoryLabelKey[subSub])}

      </button>
    ))}
  </div>
)}







    </div>
  </div>
</div>

        {/* Resources List */}
        <section className="py-20">
<div className="container mx-auto px-3 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {currentResources.length > 0 ? (
              currentResources.map((resource) => {
                const fileName =
                  resource.fileUrl?.split('/').pop()?.split('?')[0] || `resource_${resource.id}`;
                return (
                  <div
                    key={resource.id}
                    className="bg-white border-black rounded-2xl p-6 shadow-lg"
                  >
                      <div className="flex gap-3 sm:gap-4">
                      <div className="w-12 h-12 bg-gulf-primary/10 rounded-lg flex items-center justify-center text-gulf-primary">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 text-xs">
<div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
  {/* Category */}
  <span className="bg-gulf-secondary text-gulf-dark px-2 py-1 rounded-full">
    {t(categoryTranslationKeyMap[resource.category] || resource.category)}
  </span>

  {/* SubCategory */}
  {resource.subCategory && (
    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
      {getSubCategoryLabel(resource.subCategory)}
    </span>
  )}

  {/* Sub-SubCategory (only NATIONAL) */}
  {resource.category === 'LEGAL' &&
    resource.subCategory === 'NATIONAL' &&
    resource.subSubCategory && (
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
        {getNationalSubCategoryLabel(resource.subSubCategory)}
      </span>
    )}

  {/* Size */}
  <span className="text-gulf-dark/60 ml-auto">{resource.size}</span>
</div>

                        </div>
                       <h3 className="text-base sm:text-lg font-bold text-gulf-dark">
{resource.title}</h3>
                        <p className="text-xs sm:text-sm text-gulf-dark/70 mb-3">
{resource.description}</p>
                       {/* Divider */}
                      <div className="border-t border-gray-200"></div>

                      {/* Footer Section */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                          {resource.type}
                        </span>
                        
<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        
                          <button
                            onClick={() => handleDownload(resource.id || '', fileName)}

  className="flex items-center justify-center gap-2
  bg-gulf-primary hover:bg-gulf-primary/90
  text-white px-4 py-2 rounded-lg transition
  w-full sm:w-auto text-sm"

                            disabled={!resource.fileUrl || downloadingId === resource.id}
                          >
                            {downloadingId === resource.id ? (
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
                 
{['PDF', 'IMAGE', 'VIDEO'].includes(resource.type) && (
  <button
    onClick={() => handlePreview(resource)}

  className="flex items-center justify-center gap-2
  bg-gulf-gold hover:bg-gulf-gold/90
  text-white px-4 py-2 rounded-lg transition
  w-full sm:w-auto text-sm"

  >
    <Eye className="w-4 h-4" />
    <span>{t('resources.preview') || 'Preview'}</span>
  </button>
)}




                        </div>
                          </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center mt-20">
                <img
                  src="/images/no-content.jpg"
                  alt="No content available"
                  className="w-96 h-96 object-contain mb-6"
                />
                <p className="text-2xl font-semibold text-gulf-dark/70">
                  {t('resources.no_content') || 'No content available'}
                </p>
              </div>
            )}
          </div>

         {/* Pagination with Arrows */}
{totalPages > 1 && (
<div className="flex flex-wrap justify-center items-center gap-2 mt-10 px-2">
    {/* Previous Button */}
    <button
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-sm ${
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:bg-gulf-light'
      } transition-colors`}
    >
      {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`px-4 py-2 rounded-full border ${
          currentPage === index + 1
            ? 'bg-gulf-primary text-white'
            : 'bg-white text-gulf-dark hover:bg-gulf-light'
        } transition-colors`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-2 rounded-full border flex items-center justify-center ${
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gulf-dark hover:bg-gulf-light'
      } transition-colors`}
    >
      {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
    </button>
  </div>
)}
        </section>
      </main>
  {/* PDF Preview Modal */}
{selectedPreviewResource && (
    <div
className="bg-white w-full max-w-5xl h-[90vh] sm:h-[85vh]
rounded-xl relative p-2 sm:p-4 overflow-auto"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>

  <div
    className={`fixed inset-0 z-50 flex items-center justify-center px-2
      transition-opacity duration-200
      ${isClosing ? 'opacity-0' : 'opacity-100'}
      bg-black/70`}
    onClick={closeModal}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white w-full max-w-5xl h-[90vh] sm:h-[85vh]
        rounded-xl relative p-3 sm:p-4 overflow-auto
        transition-all duration-200 transform
        ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
      `}
    >
      {/* Close button (bigger for mobile) */}
     {/* Modal actions */}
<div className="absolute top-3 right-3 flex items-center gap-3 z-10">
    <button
    onClick={closeModal}
    className="w-10 h-10 flex items-center justify-center
      rounded-full bg-red-100 text-red-600
      hover:bg-red-600 hover:text-white
      transition-all"
    aria-label="Close preview"
  >
    ✕
  </button>
  {/* Contact button */}
  <div className="relative group">
    <button
      onClick={() => navigate('/contact')}
      className="w-10 h-10 flex items-center justify-center
        rounded-full bg-gulf-primary/10 text-gulf-primary
        hover:bg-gulf-primary hover:text-white
        transition-all"
      aria-label="Contact us"
    >
      <Mail className="w-5 h-5" />
    </button>

    {/* Tooltip */}
    <div
      className="absolute right-0 mt-2 w-64
        bg-black text-white text-xs rounded-lg px-3 py-2
        opacity-0 group-hover:opacity-100
        transition-opacity pointer-events-none"
    >
      {t('preview.contactTooltip') ||
        'To report an issue or discuss this document, please contact us.'}
    </div>
  </div>

  {/* Close button */}

</div>





      <div className="h-full flex flex-col items-center justify-center">
        {/* PDF */}
        {selectedPreviewResource.type === 'PDF' && previewData && (
  <Document
    key={previewKey}
    file={memoizedFile}
    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
loading={
  <div className="mt-4 flex items-center gap-2 text-sm text-gulf-dark/70">
    <span className="w-2 h-2 rounded-full bg-gulf-primary animate-pulse" />
    {t('preview.loading')}
  </div>
}

  >
<Page
  pageNumber={pageNumber}
  width={Math.min(window.innerWidth - 40, 450)}
  renderTextLayer={false}
  renderAnnotationLayer={false}
/>

  </Document>
)}


           {/* IMAGE */}
        {selectedPreviewResource.type === 'IMAGE' && (
          <img
            src={selectedPreviewResource.fileUrl}
            alt={selectedPreviewResource.title}
            className="max-h-full max-w-full object-contain"
          />
        )}

        {/* VIDEO */}
        {selectedPreviewResource.type === 'VIDEO' && (
          <video
            controls
            className="max-h-full max-w-full"
            src={selectedPreviewResource.fileUrl}
          />
        )}


        {/* Simple page navigation */}
      {selectedPreviewResource.type === 'PDF' && numPages > 1 && (
  <div className="mt-3 flex items-center gap-3">
    <button
      className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      disabled={pageNumber <= 1}
      onClick={() => setPageNumber((p) => p - 1)}
    >
      Prev
    </button>
    <span className="text-sm text-gray-600">
      {pageNumber} / {numPages}
    </span>
    <button
      className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      disabled={pageNumber >= numPages}
      onClick={() => setPageNumber((p) => p + 1)}
    >
      Next
    </button>
    
  </div>
 
)}
  </div>
      </div>
    </div>
  </div>
)}
      {/* ✅ Toast Container Added */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <Footer />
    </div>
  );
};

export default Resources;
