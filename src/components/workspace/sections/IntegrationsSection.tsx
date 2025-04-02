import React from 'react';
import { 
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { FacebookIcon } from '../../icons/FacebookIcon';
import { LinkedInIcon } from '../../icons/LinkedInIcon';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'connected' | 'expired' | 'not_connected';
  lastSync?: string;
  account?: string;
}

interface IntegrationsSectionProps {
  onBack: () => void;
}

const platforms: Platform[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    icon: <GoogleIcon className="w-6 h-6" />,
    status: 'connected',
    lastSync: '2024-03-15T10:30:00Z',
    account: 'ads@company.com'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    icon: <GoogleIcon className="w-6 h-6" />,
    status: 'connected',
    lastSync: '2024-03-15T10:30:00Z',
    account: 'analytics@company.com'
  },
  {
    id: 'google-search-console',
    name: 'Google Search Console',
    icon: <GoogleIcon className="w-6 h-6" />,
    status: 'expired',
    lastSync: '2024-03-10T15:45:00Z',
    account: 'search@company.com'
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    icon: <FacebookIcon className="w-6 h-6" />,
    status: 'connected',
    lastSync: '2024-03-15T11:20:00Z',
    account: 'meta@company.com'
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    icon: <LinkedInIcon className="w-6 h-6" />,
    status: 'not_connected'
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z" fill="currentColor"/>
      </svg>
    ),
    status: 'not_connected'
  }
];

const StatusBadge: React.FC<{ status: Platform['status'] }> = ({ status }) => {
  const statusConfig = {
    connected: {
      icon: CheckCircle2,
      text: 'Connected',
      className: 'text-green-600 bg-green-50 border-green-200'
    },
    expired: {
      icon: AlertCircle,
      text: 'Expired',
      className: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    not_connected: {
      icon: XCircle,
      text: 'Not Connected',
      className: 'text-gray-600 bg-gray-50 border-gray-200'
    }
  };

  const { icon: Icon, text, className } = statusConfig[status];

  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  );
};

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = () => {
  const handleConnect = (platformId: string) => {
    console.log('Connecting to platform:', platformId);
  };

  const handleReauthorize = (platformId: string) => {
    console.log('Reauthorizing platform:', platformId);
  };

  const handleRemove = (platformId: string) => {
    console.log('Removing platform:', platformId);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
                {platform.icon}
              </div>
              <div>
                <h3 className="text-[var(--color-text-primary)] font-medium">
                  {platform.name}
                </h3>
                {platform.account && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {platform.account}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StatusBadge status={platform.status} />
              
              {platform.status === 'connected' && (
                <>
                  <button
                    onClick={() => handleReauthorize(platform.id)}
                    className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
                    title="Reauthorize"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(platform.id)}
                    className="p-2 text-[var(--color-text-secondary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove integration"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}

              {(platform.status === 'expired' || platform.status === 'not_connected') && (
                <button
                  onClick={() => handleConnect(platform.id)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors text-sm font-medium"
                >
                  {platform.status === 'expired' ? 'Reconnect' : 'Connect'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Integration Button */}
      <button
        className="mt-4 w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add New Integration</span>
      </button>
    </div>
  );
};