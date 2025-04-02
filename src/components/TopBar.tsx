import React from 'react';
import { DateRangePicker } from './DateRangePicker';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import clsx from 'clsx';

interface TopBarProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  selectedPlatforms,
  onPlatformToggle,
}) => {
  const handlePlatformToggle = (platform: string) => {
    // Prevent deselecting if it's the last selected platform
    if (selectedPlatforms.length === 1 && selectedPlatforms.includes(platform)) {
      return;
    }
    onPlatformToggle(platform);
  };

  return (
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
      
      <DateRangePicker 
        onChange={(range) => {
          console.log('Date range changed:', range);
        }}
      />
    </div>
  );
};