import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, TrendingUp, Sparkle, Search, Filter, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../contexts/ThemeContext';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';

interface Platform {
  id: 'google' | 'facebook' | 'linkedin';
  name: string;
}

interface Client {
  id: string;
  name: string;
  activeCampaigns: number;
  lastActivity: string;
  metrics: {
    ctr: number;
    cpa: number;
  };
  hasAiSuggestions: boolean;
  platforms: Platform['id'][];
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Woshapp',
    activeCampaigns: 4,
    lastActivity: '2 hours ago',
    metrics: {
      ctr: 4.5,
      cpa: 115
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook']
  },
  {
    id: '2',
    name: 'BlancheStories',
    activeCampaigns: 6,
    lastActivity: '5 hours ago',
    metrics: {
      ctr: 3.8,
      cpa: 145
    },
    hasAiSuggestions: false,
    platforms: ['google', 'facebook']
  },
  {
    id: '3',
    name: 'Elgiganten',
    activeCampaigns: 8,
    lastActivity: '1 day ago',
    metrics: {
      ctr: 5.2,
      cpa: 98
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook', 'linkedin']
  },
  {
    id: '4',
    name: 'YogaMana EpiCenter',
    activeCampaigns: 3,
    lastActivity: '3 days ago',
    metrics: {
      ctr: 4.1,
      cpa: 125
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook']
  },
  {
    id: '5',
    name: 'Liqvida Finans',
    activeCampaigns: 5,
    lastActivity: '6 hours ago',
    metrics: {
      ctr: 4.8,
      cpa: 135
    },
    hasAiSuggestions: false,
    platforms: ['google', 'linkedin']
  },
  {
    id: '6',
    name: 'SysterElsa',
    activeCampaigns: 2,
    lastActivity: '1 day ago',
    metrics: {
      ctr: 5.5,
      cpa: 105
    },
    hasAiSuggestions: true,
    platforms: ['facebook']
  },
  {
    id: '7',
    name: 'FyndGiganten',
    activeCampaigns: 7,
    lastActivity: '4 hours ago',
    metrics: {
      ctr: 4.2,
      cpa: 142
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook', 'linkedin']
  },
  {
    id: '8',
    name: 'Espresso House',
    activeCampaigns: 4,
    lastActivity: '2 days ago',
    metrics: {
      ctr: 3.9,
      cpa: 156
    },
    hasAiSuggestions: false,
    platforms: ['google', 'facebook']
  },
  {
    id: '9',
    name: 'Madina AB',
    activeCampaigns: 3,
    lastActivity: '1 day ago',
    metrics: {
      ctr: 4.7,
      cpa: 128
    },
    hasAiSuggestions: true,
    platforms: ['facebook', 'linkedin']
  },
  {
    id: '10',
    name: 'ByggaHuset',
    activeCampaigns: 5,
    lastActivity: '3 hours ago',
    metrics: {
      ctr: 4.4,
      cpa: 132
    },
    hasAiSuggestions: false,
    platforms: ['google', 'facebook']
  },
  {
    id: '11',
    name: 'Clas Ohlsson',
    activeCampaigns: 9,
    lastActivity: '1 hour ago',
    metrics: {
      ctr: 5.1,
      cpa: 95
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook', 'linkedin']
  },
  {
    id: '12',
    name: 'Solhem inredning',
    activeCampaigns: 2,
    lastActivity: '2 days ago',
    metrics: {
      ctr: 3.6,
      cpa: 168
    },
    hasAiSuggestions: false,
    platforms: ['facebook']
  },
  {
    id: '13',
    name: 'Mobleria',
    activeCampaigns: 4,
    lastActivity: '5 hours ago',
    metrics: {
      ctr: 4.3,
      cpa: 138
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook']
  },
  {
    id: '14',
    name: 'ByggMax',
    activeCampaigns: 6,
    lastActivity: '8 hours ago',
    metrics: {
      ctr: 4.9,
      cpa: 112
    },
    hasAiSuggestions: true,
    platforms: ['google', 'facebook', 'linkedin']
  },
  {
    id: '15',
    name: 'Aqarat SY',
    activeCampaigns: 3,
    lastActivity: '1 day ago',
    metrics: {
      ctr: 3.7,
      cpa: 158
    },
    hasAiSuggestions: false,
    platforms: ['facebook']
  }
];

const platformColors = {
  google: '#4285F4',
  facebook: '#1877F2',
  linkedin: '#0A66C2'
};

export const ClientList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'campaigns' | 'activity'>('activity');
  const isDark = theme === 'dark';

  const handleViewDetails = (clientName: string) => {
    navigate('/dashboard', { state: { selectedClient: clientName } });
  };

  const filteredClients = mockClients
    .filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'campaigns':
          return b.activeCampaigns - a.activeCampaigns;
        case 'activity':
          return a.lastActivity.localeCompare(b.lastActivity);
        default:
          return 0;
      }
    });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[48px]">
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/smart-resume')}
              className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </button>
            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Your Clients
            </h1>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <button className="px-4 py-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none px-4 py-2 pr-10 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-transparent"
                >
                  <option value="activity">Latest Activity</option>
                  <option value="name">Name</option>
                  <option value="campaigns">Number of Campaigns</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
              </div>
            </div>
            <button className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className={clsx(
                'rounded-xl p-6 border transition-all duration-300',
                isDark 
                  ? 'bg-[var(--color-bg-secondary)] border-[var(--color-border)]'
                  : 'bg-white border-gray-200 shadow-sm'
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {client.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {client.platforms.map(platform => (
                      <div
                        key={platform}
                        className={clsx(
                          'w-6 h-6 rounded flex items-center justify-center',
                          `bg-[${platformColors[platform]}]10`
                        )}
                        style={{ color: platformColors[platform] }}
                      >
                        {platform === 'google' && <GoogleIcon className="w-4 h-4" />}
                        {platform === 'facebook' && <FacebookIcon className="w-4 h-4" />}
                        {platform === 'linkedin' && <LinkedInIcon className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                </div>
                {client.hasAiSuggestions && (
                  <div className={clsx(
                    'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                    isDark
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-purple-100 text-purple-700'
                  )}>
                    <Sparkle className="w-3 h-3" />
                    AI
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Users className="w-4 h-4" />
                  <span>{client.activeCampaigns} active campaigns</span>
                </div>

                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Clock className="w-4 h-4" />
                  <span>Latest activity: {client.lastActivity}</span>
                </div>

                <div className={clsx(
                  'rounded-lg p-4 mb-4',
                  isDark
                    ? 'bg-[var(--color-bg-tertiary)]'
                    : 'bg-gray-50'
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      Best Campaign
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">
                      CTR: <span className="text-[var(--color-text-primary)] font-medium">{client.metrics.ctr}%</span>
                    </span>
                    <span className="text-[var(--color-text-secondary)]">
                      CPA: <span className="text-[var(--color-text-primary)] font-medium">${client.metrics.cpa}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(client.name)}
                  className={clsx(
                    'w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors',
                    isDark
                      ? 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80 text-[var(--color-text-primary)]'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  )}
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};