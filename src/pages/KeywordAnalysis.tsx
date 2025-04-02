import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search,
  X,
  ArrowLeft,
  Filter,
  LayoutGrid,
  Download,
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Trash2,
  ChevronUp
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';
import { useTheme } from '../contexts/ThemeContext';
import { GoogleIcon } from '../components/icons/GoogleIcon';

interface KeywordChip {
  id: string;
  text: string;
}

interface KeywordResult {
  keyword: string;
  difficulty: number;
  searchVolume: number;
  cpc: number;
  competition: number;
  serp: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface KeywordAnalysisProps {
  initialKeywords?: string[];
  onAnalysisComplete?: () => void;
}

const countries: Country[] = [
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' }
];

const mockResults: KeywordResult[] = [
  {
    keyword: 'seo',
    difficulty: 57,
    searchVolume: 5400,
    cpc: 1.07,
    competition: 0.34,
    serp: 'Show'
  },
  {
    keyword: 'sem',
    difficulty: 44,
    searchVolume: 2900,
    cpc: 0.34,
    competition: 0.04,
    serp: 'Show'
  },
  {
    keyword: 'social media',
    difficulty: 72,
    searchVolume: 1900,
    cpc: 0.44,
    competition: 0.01,
    serp: 'Show'
  },
  {
    keyword: 'website builder',
    difficulty: 85,
    searchVolume: 720,
    cpc: 2.78,
    competition: 0.81,
    serp: 'Show'
  }
];

const mockRecentSearches = [
  { id: '1', keywords: ['seo', 'digital marketing', 'content strategy'], date: '2024-03-15T10:30:00Z' },
  { id: '2', keywords: ['social media', 'facebook ads'], date: '2024-03-14T15:45:00Z' },
  { id: '3', keywords: ['ecommerce', 'shopify', 'woocommerce'], date: '2024-03-13T09:15:00Z' },
  { id: '4', keywords: ['local seo', 'google my business'], date: '2024-03-12T14:20:00Z' },
  { id: '5', keywords: ['email marketing', 'automation'], date: '2024-03-11T11:30:00Z' },
  { id: '6', keywords: ['ppc', 'google ads', 'sem'], date: '2024-03-10T16:45:00Z' },
  { id: '7', keywords: ['content marketing', 'blogging'], date: '2024-03-09T13:20:00Z' },
  { id: '8', keywords: ['web design', 'ui/ux'], date: '2024-03-08T10:15:00Z' },
  { id: '9', keywords: ['analytics', 'data tracking'], date: '2024-03-07T09:30:00Z' },
  { id: '10', keywords: ['mobile optimization', 'responsive design'], date: '2024-03-06T14:45:00Z' }
];

const getDifficultyColor = (score: number) => {
  if (score <= 50) return 'bg-green-100 text-green-800';
  if (score <= 70) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
};

export const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ initialKeywords = [], onAnalysisComplete }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const [keywords, setKeywords] = useState<KeywordChip[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showResults, setShowResults] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [currentPage, setCurrentPage] = useState(1);
  const [isKeywordsExpanded, setIsKeywordsExpanded] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    // Check for keywords from location state (from chat)
    if (location.state?.keywords) {
      setKeywords(location.state.keywords.map((text: string) => ({
        id: Math.random().toString(36).substr(2, 9),
        text
      })));
      setShowResults(true);
    } 
    // Check for initialKeywords prop
    else if (initialKeywords && initialKeywords.length > 0) {
      setKeywords(initialKeywords.map(text => ({
        id: Math.random().toString(36).substr(2, 9),
        text
      })));
      setShowResults(true);
    }
  }, [location.state, initialKeywords]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addKeyword(inputValue.trim());
    }
  };

  const addKeyword = (text: string) => {
    const newKeyword = {
      id: Math.random().toString(36).substr(2, 9),
      text: text
    };
    setKeywords(prev => [...prev, newKeyword]);
    setInputValue('');
  };

  const removeKeyword = (id: string) => {
    setKeywords(prev => prev.filter(keyword => keyword.id !== id));
  };

  const handleAnalyze = () => {
    if (keywords.length === 0) return;
    setShowResults(true);
    if (onAnalysisComplete) {
      onAnalysisComplete();
    }
  };

  const handleRecentSearchClick = (searchKeywords: string[]) => {
    setKeywords(searchKeywords.map(k => ({
      id: Math.random().toString(36).substr(2, 9),
      text: k
    })));
    setShowResults(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const totalPages = Math.ceil(mockRecentSearches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecentSearches = mockRecentSearches.slice(startIndex, endIndex);

  const ResultsView = () => (
    <div className="flex-1 bg-[var(--color-bg-primary)] min-h-screen pt-[48px]">
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowResults(false)}
              className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </button>
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">Bulk keyword Analysis</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <button className="px-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <Menu as="div" className="relative">
              <Menu.Button className="px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center">
                {selectedCurrency}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 mt-2 w-32 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-10">
                {['EUR', 'USD', 'GBP', 'SEK'].map((currency) => (
                  <Menu.Item key={currency}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          'w-full text-left px-4 py-2',
                          active ? 'bg-[var(--color-bg-tertiary)]' : ''
                        )}
                        onClick={() => setSelectedCurrency(currency)}
                      >
                        {currency}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)]">
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
          <div className="p-4 border-b border-[var(--color-border)]">
            <button
              onClick={() => setIsKeywordsExpanded(!isKeywordsExpanded)}
              className="w-full flex items-center justify-between"
            >
              <h2 className="text-lg font-medium flex items-center gap-2">
                Entered keywords <span className="bg-[var(--color-accent)]20 text-[var(--color-accent)] px-2 py-0.5 rounded-full text-sm">{keywords.length}</span>
              </h2>
              {isKeywordsExpanded ? (
                <ChevronUp className="w-5 h-5 text-[var(--color-text-tertiary)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--color-text-tertiary)]" />
              )}
            </button>

            {isKeywordsExpanded && (
              <div className="mt-4">
                <div className="relative">
                  <div className="min-h-[100px] p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
                    {keywords.map((keyword, index) => (
                      <div key={keyword.id} className="flex items-center gap-2 mb-2">
                        <span className="text-[var(--color-text-secondary)]">{index + 1}.</span>
                        <span className="bg-[var(--color-accent)]20 text-[var(--color-accent)] px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {keyword.text}
                          <button
                            onClick={() => removeKeyword(keyword.id)}
                            className="hover:text-[var(--color-accent-hover)]"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-text-secondary)]">{keywords.length + 1}.</span>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Enter a keyword"
                        className="flex-1 bg-[var(--color-bg-secondary)] px-3 py-1 rounded-full border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleAnalyze()}
                    className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors text-sm font-medium"
                  >
                    Run Analyzing
                  </button>
                </div>
              </div>
            )}
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded border-[var(--color-border)]" />
                </th>
                <th className="px-6 py-4 text-left font-medium text-[var(--color-text-secondary)]">
                  KEYWORD ({keywords.length})
                </th>
                <th className="px-6 py-4 text-left font-medium text-[var(--color-text-secondary)]">
                  DIFFICULTY
                </th>
                <th className="px-6 py-4 text-left font-medium text-[var(--color-text-secondary)]">
                  SEARCH VOL.
                </th>
                <th className="px-6 py-4 text-left font-medium text-[var(--color-text-secondary)]">
                  CPC
                </th>
                <th className="px-6 py-4 text-left font-medium text-[var(--color-text-secondary)]">
                  COMPETITION
                </th>
                <th className="px-6 py-4 text-left font-medium text-[var(--color-text-secondary)]">
                  SERP OVERVIEW
                </th>
              </tr>
            </thead>
            <tbody>
              {mockResults.map((result, index) => (
                <tr key={index} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-[var(--color-border)]" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]">
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-[var(--color-accent)] hover:underline cursor-pointer">
                        {result.keyword}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      'px-2 py-1 rounded-full text-sm font-medium',
                      getDifficultyColor(result.difficulty)
                    )}>
                      {result.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-primary)]">
                    {result.searchVolume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-primary)]">
                    €{result.cpc.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-primary)]">
                    {result.competition.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[var(--color-accent)] hover:underline">
                      {result.serp}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (showResults) {
    return <ResultsView />;
  }

  return (
    <div className="flex-1 bg-[var(--color-bg-primary)] min-h-screen pt-[48px]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-[var(--color-bg-secondary)] rounded-2xl shadow-sm border border-[var(--color-border)] p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Keyword Research
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Discover the Best Keywords for Your Marketing Strategy
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <div className="min-h-[56px] px-4 py-2 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] flex flex-wrap gap-2 items-center">
                {keywords.map((keyword, index) => (
                  <React.Fragment key={keyword.id}>
                    {index > 0 && <span className="text-[var(--color-text-tertiary)]">{index + 1}.</span>}
                    <span className="bg-[var(--color-accent)]20 text-[var(--color-accent)] px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {keyword.text}
                      <button
                        onClick={() => removeKeyword(keyword.id)}
                        className="hover:text-[var(--color-accent-hover)]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  </React.Fragment>
                ))}
                <span className="text-[var(--color-text-tertiary)]">{(keywords.length + 1) + "."}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder={keywords.length === 0 ? "Enter keywords" : ""}
                  className="flex-1 min-w-[150px] bg-transparent border-none outline-none text-[var(--color-text-primary)]"
                />
              </div>
            </div>

            <Menu as="div" className="relative">
              <Menu.Button className="h-[56px] px-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg flex items-center gap-2 hover:bg-[var(--color-bg-tertiary)] transition-colors">
                <div className="flex items-center gap-2">
                  <GoogleIcon className="w-5 h-5" />
                  <span className="text-2xl">{selectedCountry.flag}</span>
                </div>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-10">
                {countries.map((country) => (
                  <Menu.Item key={country.code}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          'w-full text-left px-4 py-2 flex items-center gap-2',
                          active ? 'bg-[var(--color-bg-tertiary)]' : ''
                        )}
                        onClick={() => setSelectedCountry(country)}
                      >
                        <GoogleIcon className="w-4 h-4" />
                        <span className="text-xl">{country.flag}</span>
                        <span>{country.name}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>

            <button
              onClick={handleAnalyze}
              disabled={keywords.length === 0}
              className={clsx(
                'h-[56px] px-8 rounded-lg flex items-center gap-2 font-medium transition-colors',
                keywords.length === 0
                  ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
                  : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
              )}
            >
              <Search className="w-5 h-5" />
              ANALYZE
            </button>
          </div>
        </div>

        <div className="bg-[var(--color-bg-secondary)] rounded-2xl shadow-sm border border-[var(--color-border)] mt-8">
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Recent keywords researches</h2>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {currentRecentSearches.map((search) => (
              <div key={search.id} className="px-6 py-4 flex items-center justify-between hover:bg-[var(--color-bg-tertiary)]">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {search.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="text-[var(--color-accent)] hover:underline cursor-pointer"
                        onClick={() => handleRecentSearchClick(search.keywords)}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{formatDate(search.date)}</p>
                </div>
                <button
                  className="p-2 text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete search"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">
                {startIndex + 1}-{Math.min(endIndex, mockRecentSearches.length)} of {mockRecentSearches.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    currentPage === 1
                      ? 'text-[var(--color-text-tertiary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    currentPage === totalPages
                      ? 'text-[var(--color-text-tertiary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};