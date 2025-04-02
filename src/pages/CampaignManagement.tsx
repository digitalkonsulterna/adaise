import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { mockCampaigns } from '../data/mockCampaigns';
import { mockAdSets } from '../data/mockAdSets';
import { mockAds } from '../data/mockAds';
import { Campaign } from '../types/campaign';
import { AdSet } from '../types/adSet';
import { Ad } from '../types/ad';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { Search, Filter, ChevronDown, Columns, LayoutGrid, Grid2x2, Image } from 'lucide-react';
import { DateRangePicker } from '../components/DateRangePicker';
import { clsx } from 'clsx';
import { ColumnsDropdown, ColumnOption } from '../components/ui/ColumnsDropdown';

const formatCurrency = (value: number | undefined) => {
  if (value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

const formatNumber = (value: number | undefined) => {
  if (value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US').format(value);
};

const formatPercentage = (value: number | undefined) => {
  if (value === undefined) return 'N/A';
  return `${value.toFixed(2)}%`;
};

type TabType = 'campaigns' | 'adsets' | 'ads';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: <LayoutGrid className="w-5 h-5" />
  },
  {
    id: 'adsets',
    label: 'Ad Groups',
    icon: <Grid2x2 className="w-5 h-5" />
  },
  {
    id: 'ads',
    label: 'Ads',
    icon: <Image className="w-5 h-5" />
  }
];

export const CampaignManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google', 'facebook', 'linkedin']);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'name', 'status', 'results', 'reach', 'costPerResult', 'budget', 'spent', 'impressions', 'ctr', 'roas'
  ]);

  const campaignColumns = [
    {
      key: 'name',
      title: 'Campaign Name',
      sticky: true,
      render: (value: string, row: Campaign) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-[var(--color-text-primary)]">{value || 'Untitled'}</span>
          <div className="flex space-x-1">
            {row.platforms.map(platform => (
              <span key={platform} className="w-4 h-4">
                {platform === 'google' && <GoogleIcon />}
                {platform === 'facebook' && <FacebookIcon />}
                {platform === 'linkedin' && <LinkedInIcon />}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'}
        </span>
      )
    },
    {
      key: 'results',
      title: 'Results',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'reach',
      title: 'Reach',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'costPerResult',
      title: 'CPC',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'budget',
      title: 'Budget',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'spent',
      title: 'Amount Spent',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'impressions',
      title: 'Impressions',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'ctr',
      title: 'CTR',
      render: (value: number) => formatPercentage(value)
    },
    {
      key: 'roas',
      title: 'ROAS',
      render: (value: number) => value?.toFixed(2) || 'N/A'
    }
  ];

  const adSetColumns = [
    {
      key: 'name',
      title: 'Ad Group Name',
      sticky: true,
      render: (value: string, row: AdSet) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-[var(--color-text-primary)]">{value || 'Untitled'}</span>
          <div className="flex space-x-1">
            {row.platforms.map(platform => (
              <span key={platform} className="w-4 h-4">
                {platform === 'google' && <GoogleIcon />}
                {platform === 'facebook' && <FacebookIcon />}
                {platform === 'linkedin' && <LinkedInIcon />}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'}
        </span>
      )
    },
    {
      key: 'results',
      title: 'Results',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'reach',
      title: 'Reach',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'costPerResult',
      title: 'Cost per Result',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'budget',
      title: 'Budget',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'spent',
      title: 'Amount Spent',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'biddingStrategy',
      title: 'Bidding Strategy',
      render: (value: string) => value ? value.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') : 'N/A'
    },
    {
      key: 'targeting',
      title: 'Targeting',
      render: (value: string[]) => value?.join(', ') || 'N/A'
    }
  ];

  const adColumns = [
    {
      key: 'name',
      title: 'Ad Name',
      sticky: true,
      render: (value: string, row: Ad) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-[var(--color-text-primary)]">{value || 'Untitled'}</span>
          <div className="flex space-x-1">
            {row.platforms.map(platform => (
              <span key={platform} className="w-4 h-4">
                {platform === 'google' && <GoogleIcon />}
                {platform === 'facebook' && <FacebookIcon />}
                {platform === 'linkedin' && <LinkedInIcon />}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium',
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'}
        </span>
      )
    },
    {
      key: 'results',
      title: 'Results',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'reach',
      title: 'Reach',
      render: (value: number) => formatNumber(value)
    },
    {
      key: 'costPerResult',
      title: 'Cost per Result',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'spent',
      title: 'Amount Spent',
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'format',
      title: 'Format',
      render: (value: string) => value ? value.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') : 'N/A'
    },
    {
      key: 'relevanceScore',
      title: 'Relevance Score',
      render: (value: number) => value?.toFixed(1) || 'N/A'
    }
  ];

  const columnOptions: ColumnOption[] = campaignColumns.map(col => ({
    key: col.key,
    label: col.title,
    group: 'Campaign'
  }));

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns(prev => {
      if (prev.includes(columnKey)) {
        if (columnKey === 'name') return prev;
        return prev.filter(key => key !== columnKey);
      }
      return [...prev, columnKey];
    });
  };

  const handleSelectAllColumns = (checked: boolean) => {
    if (checked) {
      setVisibleColumns(campaignColumns.map(col => col.key));
    } else {
      setVisibleColumns(['name']);
    }
  };

  const getVisibleColumns = () => {
    switch (activeTab) {
      case 'campaigns':
        return campaignColumns.filter(col => visibleColumns.includes(col.key));
      case 'adsets':
        return adSetColumns.filter(col => visibleColumns.includes(col.key));
      case 'ads':
        return adColumns.filter(col => visibleColumns.includes(col.key));
      default:
        return [];
    }
  };

  const filterDataByPlatforms = <T extends Campaign | AdSet | Ad>(data: T[]): T[] => {
    return data
      .filter(item => 
        item.platforms.some(platform => selectedPlatforms.includes(platform)) &&
        (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .map(item => ({
        ...item,
        platforms: item.platforms.filter(p => selectedPlatforms.includes(p)),
        results: item.results * (item.platforms.filter(p => selectedPlatforms.includes(p)).length / item.platforms.length),
        reach: item.reach * (item.platforms.filter(p => selectedPlatforms.includes(p)).length / item.platforms.length),
        impressions: item.impressions * (item.platforms.filter(p => selectedPlatforms.includes(p)).length / item.platforms.length),
        spent: item.spent * (item.platforms.filter(p => selectedPlatforms.includes(p)).length / item.platforms.length)
      }));
  };

  const getActiveData = () => {
    switch (activeTab) {
      case 'campaigns':
        return filterDataByPlatforms(mockCampaigns);
      case 'adsets':
        return filterDataByPlatforms(mockAdSets);
      case 'ads':
        return filterDataByPlatforms(mockAds);
      default:
        return [];
    }
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => {
      if (prev.length === 1 && prev.includes(platform)) {
        return prev;
      }
      return prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform];
    });
  };

  return (
    <div className="flex-1 bg-[var(--color-bg-primary)] flex flex-col h-[calc(100vh-48px)]">
      {/* Sticky Header Section */}
      <div className="sticky top-[5px] z-40 bg-[var(--color-bg-secondary)] shadow-sm">
        {/* Platform Filter Bar */}
        <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-text-secondary)]">Show data for:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handlePlatformToggle('google')}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    selectedPlatforms.includes('google')
                      ? 'text-[#4285F4] bg-[#4285F4]/10'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-[var(--color-bg-tertiary)]'
                  )}
                  title="Google Ads"
                >
                  <GoogleIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handlePlatformToggle('facebook')}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    selectedPlatforms.includes('facebook')
                      ? 'text-[#1877F2] bg-[#1877F2]/10'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-[var(--color-bg-tertiary)]'
                  )}
                  title="Facebook Ads"
                >
                  <FacebookIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handlePlatformToggle('linkedin')}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    selectedPlatforms.includes('linkedin')
                      ? 'text-[#0A66C2] bg-[#0A66C2]/10'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-[var(--color-bg-tertiary)]'
                  )}
                  title="LinkedIn Ads"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <DateRangePicker onChange={() => {}} />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="px-6 pt-4">
          <div className="flex space-x-1 border-b border-[var(--color-border)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'px-6 py-3 text-sm font-medium transition-colors relative flex items-center gap-2',
                  'focus:outline-none',
                  activeTab === tab.id
                    ? 'text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] rounded-t-lg'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Controls Bar */}
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                placeholder={`Search ${activeTab}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]"
              />
            </div>
            <button className="px-4 py-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center space-x-2 text-[var(--color-text-primary)]">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <ColumnsDropdown
              columns={columnOptions}
              selectedColumns={visibleColumns}
              onColumnToggle={handleColumnToggle}
              onSelectAll={handleSelectAllColumns}
            />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6">
            <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-[1200px]">
                  <Table
                    columns={getVisibleColumns()}
                    data={getActiveData()}
                    selectedRows={selectedItems}
                    onSelectRow={(id) => {
                      setSelectedItems(prev =>
                        prev.includes(id)
                          ? prev.filter(itemId => itemId !== id)
                          : [...prev, id]
                      );
                    }}
                    onSelectAll={(checked) => {
                      const data = getActiveData();
                      setSelectedItems(checked ? data.map(item => item.id) : []);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};