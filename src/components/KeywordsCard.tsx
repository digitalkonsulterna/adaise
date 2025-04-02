import React, { useState, useRef, useEffect } from 'react';
import { Settings2, ChevronLeft, ChevronRight, HelpCircle, ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';

interface Keyword {
  id: string;
  text: string;
  metrics: {
    searchVolume?: number;
    cpc?: number;
    difficulty?: number;
    clicks?: number;
    impressions?: number;
    ctr?: number;
    avgCpc?: number;
    cost?: number;
    conversions?: number;
    convValue?: number;
    costPerConv?: number;
    convRate?: number;
    convValuePerCost?: number;
    searchImprShare?: number;
    phoneCalls?: number;
    interactionRate?: number;
    interactions?: number;
  };
}

interface KPIConfig {
  id: string;
  label: string;
  format: (value: number) => string;
  trend?: 'up' | 'down' | 'neutral';
  submenu?: KPIConfig[];
}

const kpiConfigs: KPIConfig[] = [
  {
    id: 'searchVolume',
    label: 'Search Volume',
    format: (value) => value.toLocaleString(),
    trend: 'up'
  },
  {
    id: 'clicks',
    label: 'Clicks',
    format: (value) => value.toLocaleString(),
    trend: 'up'
  },
  {
    id: 'impressions',
    label: 'Impressions',
    format: (value) => value.toLocaleString(),
    trend: 'up'
  },
  {
    id: 'ctr',
    label: 'CTR',
    format: (value) => `${value.toFixed(2)}%`,
    trend: 'up'
  },
  {
    id: 'avgCpc',
    label: 'Avg. CPC',
    format: (value) => `$${value.toFixed(2)}`,
    trend: 'down'
  },
  {
    id: 'cost',
    label: 'Cost',
    format: (value) => `$${value.toFixed(2)}`,
    trend: 'neutral'
  },
  {
    id: 'conversions',
    label: 'Conversions',
    format: (value) => value.toLocaleString(),
    trend: 'up',
    submenu: [
      {
        id: 'convRate',
        label: 'Conv. rate',
        format: (value) => `${value.toFixed(2)}%`,
        trend: 'up'
      },
      {
        id: 'costPerConv',
        label: 'Cost / conv.',
        format: (value) => `$${value.toFixed(2)}`,
        trend: 'down'
      }
    ]
  },
  {
    id: 'convValue',
    label: 'Conv. value',
    format: (value) => `$${value.toFixed(2)}`,
    trend: 'up',
    submenu: [
      {
        id: 'convValuePerCost',
        label: 'Conv. value / cost',
        format: (value) => `${value.toFixed(2)}`,
        trend: 'up'
      }
    ]
  },
  {
    id: 'searchImprShare',
    label: 'Search impr. share',
    format: (value) => `${value.toFixed(2)}%`,
    trend: 'up'
  },
  {
    id: 'phoneCalls',
    label: 'Phone calls',
    format: (value) => value.toLocaleString(),
    trend: 'up'
  },
  {
    id: 'interactionRate',
    label: 'Interaction rate',
    format: (value) => `${value.toFixed(2)}%`,
    trend: 'up'
  },
  {
    id: 'interactions',
    label: 'Interactions',
    format: (value) => value.toLocaleString(),
    trend: 'up'
  }
];

const generateMockKeywords = (count: number): Keyword[] => {
  const keywords = [
    'digital marketing', 'seo services', 'social media marketing',
    'content strategy', 'ppc advertising', 'email marketing',
    'web design', 'brand strategy', 'marketing automation',
    'lead generation', 'conversion optimization', 'analytics tools',
    'local seo', 'mobile marketing', 'video marketing'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `kw-${i}`,
    text: keywords[i % keywords.length],
    metrics: {
      searchVolume: Math.floor(Math.random() * 50000) + 1000,
      clicks: Math.floor(Math.random() * 5000) + 100,
      impressions: Math.floor(Math.random() * 100000) + 5000,
      ctr: Number((Math.random() * 10).toFixed(2)),
      avgCpc: Number((Math.random() * 5 + 0.5).toFixed(2)),
      cost: Number((Math.random() * 1000 + 100).toFixed(2)),
      conversions: Math.floor(Math.random() * 100) + 10,
      convValue: Number((Math.random() * 5000 + 500).toFixed(2)),
      costPerConv: Number((Math.random() * 50 + 10).toFixed(2)),
      convRate: Number((Math.random() * 5).toFixed(2)),
      convValuePerCost: Number((Math.random() * 5 + 1).toFixed(2)),
      searchImprShare: Number((Math.random() * 100).toFixed(2)),
      phoneCalls: Math.floor(Math.random() * 50) + 5,
      interactionRate: Number((Math.random() * 15).toFixed(2)),
      interactions: Math.floor(Math.random() * 1000) + 100,
      difficulty: Math.floor(Math.random() * 100)
    }
  }));
};

const mockKeywords = generateMockKeywords(50);

export const KeywordsCard: React.FC = () => {
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>([
    'searchVolume', 'clicks', 'impressions', 'ctr', 'cost', 'conversions', 'convRate'
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(mockKeywords.length / itemsPerPage);

  useEffect(() => {
    const savedKPIs = localStorage.getItem('selectedKeywordKPIs');
    if (savedKPIs) {
      setSelectedKPIs(JSON.parse(savedKPIs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedKeywordKPIs', JSON.stringify(selectedKPIs));
  }, [selectedKPIs]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setMousePosition({
        x: rect.right,
        y: rect.top
      });
    }
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    if (tableBodyRef.current) {
      tableBodyRef.current.style.opacity = '0';
      tableBodyRef.current.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      } else {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      }

      if (tableBodyRef.current) {
        requestAnimationFrame(() => {
          if (tableBodyRef.current) {
            tableBodyRef.current.style.opacity = '1';
            tableBodyRef.current.style.transform = 'translateY(0)';
          }
        });
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 150);
  };

  const getCurrentPageKeywords = () => {
    const start = currentPage * itemsPerPage;
    return mockKeywords.slice(start, start + itemsPerPage);
  };

  const handleKPIChange = (index: number, kpiId: string) => {
    setSelectedKPIs(prev => {
      const newKPIs = [...prev];
      newKPIs[index] = kpiId;
      return newKPIs;
    });
  };

  return (
    <div className="bg-[var(--color-card)] rounded-xl shadow-sm">
      {/* Card Header */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div ref={titleRef} className="flex items-center gap-2">
            <h3 className="text-[var(--color-text-primary)] font-medium">Campaign keywords</h3>
            <button
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onMouseMove={handleMouseMove}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)]">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--color-text-secondary)] w-48">
                Keyword
              </th>
              {selectedKPIs.map((kpiId, index) => (
                <th key={kpiId} className="py-3 px-4">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                      {kpiConfigs.find(k => k.id === kpiId)?.label}
                      <ChevronDown className="w-4 h-4 ml-0.5" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-1 w-48 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-20">
                      {kpiConfigs.map((kpi) => (
                        <Menu.Item key={kpi.id}>
                          {({ active }) => (
                            <button
                              className={clsx(
                                'w-full text-left px-3 py-2 text-sm transition-colors',
                                active ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                              )}
                              onClick={() => handleKPIChange(index, kpi.id)}
                            >
                              {kpi.label}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody
            ref={tableBodyRef}
            className="transition-all duration-300 ease-in-out"
            style={{ opacity: 1, transform: 'translateY(0)' }}
          >
            {getCurrentPageKeywords().map((keyword, idx) => (
              <tr
                key={keyword.id}
                className={clsx(
                  'transition-colors',
                  idx % 2 === 0 
                    ? 'bg-[var(--color-bg-secondary)]' 
                    : 'bg-[var(--color-bg-tertiary)]',
                  'hover:bg-[var(--color-bg-tertiary)]/80'
                )}
              >
                <td className="py-3 px-4 text-sm text-[var(--color-text-primary)]">
                  {keyword.text}
                </td>
                {selectedKPIs.map((kpiId) => {
                  const kpi = kpiConfigs.find(k => k.id === kpiId);
                  const value = keyword.metrics[kpiId as keyof typeof keyword.metrics];
                  
                  if (!kpi || value === undefined) return null;

                  return (
                    <td key={kpiId} className="py-3 px-4 text-right">
                      <span className="text-sm text-[var(--color-text-primary)] font-medium font-mono inline-flex items-center justify-end gap-1">
                        {kpi.format(value)}
                        {kpi.trend && (
                          <span className={clsx(
                            'text-xs',
                            kpi.trend === 'up' ? 'text-green-500' : 
                            kpi.trend === 'down' ? 'text-red-500' : 
                            'text-[var(--color-text-tertiary)]'
                          )}>
                            {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
                          </span>
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-secondary)]">
            {`${currentPage * itemsPerPage + 1}-${Math.min((currentPage + 1) * itemsPerPage, mockKeywords.length)} of ${mockKeywords.length}`}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0 || isAnimating}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                (currentPage === 0 || isAnimating)
                  ? 'text-[var(--color-text-tertiary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages - 1 || isAnimating}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                (currentPage === totalPages - 1 || isAnimating)
                  ? 'text-[var(--color-text-tertiary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 w-64 p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg shadow-lg -top-2 left-full ml-2">
          <p className="text-sm">View and analyze campaign keywords performance across selected platforms</p>
        </div>
      )}
    </div>
  );
};