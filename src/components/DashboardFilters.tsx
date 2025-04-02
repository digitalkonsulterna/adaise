import React from 'react';
import { Platform } from '../types/metrics';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface DashboardFiltersProps {
  selectedPlatforms: Platform['id'][];
  onPlatformToggle: (platform: Platform['id']) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (order: 'asc' | 'desc') => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedPlatforms,
  onPlatformToggle,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <button
          onClick={() => onPlatformToggle('google')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
            selectedPlatforms.includes('google')
              ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
          }`}
        >
          <GoogleIcon className="w-4 h-4" />
          <span>Google Ads</span>
        </button>
        <button
          onClick={() => onPlatformToggle('facebook')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
            selectedPlatforms.includes('facebook')
              ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
          }`}
        >
          <FacebookIcon className="w-4 h-4" />
          <span>Facebook Ads</span>
        </button>
        <button
          onClick={() => onPlatformToggle('linkedin')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
            selectedPlatforms.includes('linkedin')
              ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
          }`}
        >
          <LinkedInIcon className="w-4 h-4" />
          <span>LinkedIn Ads</span>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-[var(--color-text-secondary)]">Sort by value:</span>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
          className="px-3 py-2 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
        >
          <option value="desc">Highest first</option>
          <option value="asc">Lowest first</option>
        </select>
      </div>
    </div>
  );
}