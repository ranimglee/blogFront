import React, { useEffect, useRef, useState } from 'react';
import { X, Search, FileText, Folder, Briefcase, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string | number;
  title: string;
  titre?: string; // resources may have "titre" instead of "title"
}

interface SearchResults {
  articles: SearchResultItem[];
  resources: SearchResultItem[];
  projects: SearchResultItem[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    articles: [],
    resources: [],
    projects: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Debounce helper
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Fetch search results
  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults({ articles: [], resources: [], projects: [] });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/public/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setResults({
        articles: data?.articles ?? [],
        resources: data?.resources ?? [],
        projects: data?.projects ?? [],
      });
      setSelectedIndex(0);
    } catch (err) {
      console.error(err);
      setResults({ articles: [], resources: [], projects: [] });
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useRef(
    debounce((searchTerm: string) => {
      fetchResults(searchTerm);
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Keyboard navigation and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const totalResults =
        results.articles.length + results.resources.length + results.projects.length;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < totalResults - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const allItems = [
          ...results.articles.map((a) => ({ ...a, baseUrl: '/article', titleKey: 'title' })),
          ...results.resources.map((r) => ({ ...r, baseUrl: '/resources', titleKey: 'titre' })),
          ...results.projects.map((p) => ({ ...p, baseUrl: '/projects', titleKey: 'title' })),
        ];
        if (allItems[selectedIndex]) {
          onClose();
          navigate(`${allItems[selectedIndex].baseUrl}/${allItems[selectedIndex].id}`);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, results, selectedIndex, navigate]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const totalResults =
    results.articles.length + results.resources.length + results.projects.length;
  const hasQuery = query.trim().length > 0;
  const hasResults = totalResults > 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClickOutside}
    >
      <div className="flex items-start justify-center min-h-screen px-4 pt-20 pb-20">
        <div
          ref={modalRef}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-200"
        >
          {/* Header */}
          <div className="relative border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3 px-6 py-4">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles, resources, projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-400 text-gray-900"
              />
              {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search tips */}
            {!hasQuery && (
              <div className="px-6 pb-4 flex items-center gap-2 text-sm text-gray-500">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">
                  ESC
                </kbd>
                <span>to close</span>
                <span className="mx-2">•</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">
                  ↑↓
                </kbd>
                <span>to navigate</span>
                <span className="mx-2">•</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">
                  Enter
                </kbd>
                <span>to open</span>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!hasQuery && (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start searching</h3>
                <p className="text-gray-500 max-w-sm">
                  Type to search across articles, resources, and projects
                </p>
              </div>
            )}

            {hasQuery && !loading && !hasResults && (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 max-w-sm">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

            {hasQuery && hasResults && (
              <div className="divide-y divide-gray-100">
                {results.articles.length > 0 && (
                  <ResultSection
                    title="Articles"
                    icon={<FileText className="w-4 h-4" />}
                    items={results.articles}
                    baseUrl="/article"
                    onClose={onClose}
                    selectedIndex={selectedIndex}
                  />
                )}

                {results.resources.length > 0 && (
                  <ResultSection
                    title="Resources"
                    icon={<Folder className="w-4 h-4" />}
                    items={results.resources}
                    baseUrl="/resources"
                    onClose={onClose}
                    titleKey="titre"
                    selectedIndex={selectedIndex}
                  />
                )}

                {results.projects.length > 0 && (
                  <ResultSection
                    title="Projects"
                    icon={<Briefcase className="w-4 h-4" />}
                    items={results.projects}
                    baseUrl="/projects"
                    onClose={onClose}
                    selectedIndex={selectedIndex}
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {hasResults && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-500">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ResultSection
interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  items: SearchResultItem[];
  baseUrl: string;
  onClose: () => void;
  titleKey?: 'title' | 'titre';
  selectedIndex?: number;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  title,
  icon,
  items,
  baseUrl,
  onClose,
  titleKey = 'title',
  selectedIndex = -1,
}) => {
  const navigate = useNavigate();

  const handleClick = (id: string | number) => {
    onClose();
    navigate(`${baseUrl}/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {icon}
        <span>{title}</span>
        <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
          {items.length}
        </span>
      </div>
      <div className="space-y-1 mt-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full text-left px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group ${
              selectedIndex === index ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 group-hover:text-blue-700 font-medium transition-colors">
                {item[titleKey]}
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchModal;
