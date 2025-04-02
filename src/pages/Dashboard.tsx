import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { ComparativeOverview } from '../components/ComparativeOverview';
import { MetricCard } from '../components/MetricCard';
import { metrics } from '../data/mockData';
import { Metric } from '../types/metrics';
import { LayoutDashboard, ImageIcon, Wallet, HelpCircle } from 'lucide-react';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { clsx } from 'clsx';
import { DemographicCard } from '../components/DemographicCard';
import { demographicData } from '../data/mockData';
import { KeywordsCard } from '../components/KeywordsCard';

interface PlatformData {
  id: 'google' | 'facebook' | 'linkedin';
  name: string;
  icon: React.ReactNode;
  value: number;
  color: string;
  budgetUsage: number;
}

const platformData: Record<string, PlatformData> = {
  google: {
    id: 'google',
    name: 'Google Ads',
    icon: <GoogleIcon className="w-4 h-4" />,
    value: 35,
    color: '#4285F4',
    budgetUsage: 59
  },
  facebook: {
    id: 'facebook',
    name: 'Meta Ads',
    icon: <FacebookIcon className="w-4 h-4" />,
    value: 30,
    color: '#1877F2',
    budgetUsage: 68
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    icon: <LinkedInIcon className="w-4 h-4" />,
    value: 24,
    color: '#0A66C2',
    budgetUsage: 83
  }
};

const adData: Record<string, number> = {
  google: 430,
  facebook: 370,
  linkedin: 200
};

const budgetData: Record<string, number> = {
  google: 2800,
  facebook: 2700,
  linkedin: 2000
};

interface SummaryCardProps {
  title: string;
  value: string | number;
  tooltipDescription: string;
  icon: React.ElementType;
  color: string;
  selectedPlatforms: string[];
  platformValues: Record<string, number>;
  formatValue?: (value: number) => string;
  progress?: number;
  progressTooltip?: string;
}

interface BudgetProgressBarProps {
  progress: number;
  progressTooltip: string;
}

interface TooltipProps {
  children: React.ReactNode;
  mouseX: number;
  mouseY: number;
}

const Tooltip: React.FC<TooltipProps> = ({ children, mouseX, mouseY }) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Ensure tooltip stays within viewport bounds
      let x = mouseX - rect.width / 2;
      x = Math.max(10, Math.min(x, viewportWidth - rect.width - 10));
      
      setPosition({
        x,
        y: mouseY - rect.height - 10
      });
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border border-[var(--color-border)] transition-opacity duration-150"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translateY(-100%)',
        opacity: 1
      }}
    >
      {children}
    </div>
  );
};

const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({ progress, progressTooltip }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showUsedTooltip, setShowUsedTooltip] = useState(false);
  const [showRemainingTooltip, setShowRemainingTooltip] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className="mt-4 relative">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
        <div 
          className="h-full bg-green-500 rounded-l-full transition-all duration-200 relative cursor-pointer"
          style={{ width: `${progress}%` }}
          onMouseEnter={() => setShowUsedTooltip(true)}
          onMouseLeave={() => setShowUsedTooltip(false)}
          onMouseMove={handleMouseMove}
        />
        <div 
          className="h-full bg-gray-200 flex-1 rounded-r-full transition-all duration-200 relative cursor-pointer"
          onMouseEnter={() => setShowRemainingTooltip(true)}
          onMouseLeave={() => setShowRemainingTooltip(false)}
          onMouseMove={handleMouseMove}
        />
      </div>

      {showUsedTooltip && (
        <Tooltip mouseX={mousePosition.x} mouseY={mousePosition.y}>
          {progressTooltip}
        </Tooltip>
      )}

      {showRemainingTooltip && (
        <Tooltip mouseX={mousePosition.x} mouseY={mousePosition.y}>
          {`Remaining: ${(100 - progress).toFixed(1)}%`}
        </Tooltip>
      )}
    </div>
  );
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  tooltipDescription,
  icon: Icon,
  color,
  selectedPlatforms,
  platformValues,
  formatValue = (v) => v.toString(),
  progress,
  progressTooltip
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-[var(--color-card)] rounded-xl p-6 shadow-sm relative group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-100 text-${color}-600`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-secondary)] font-medium">
              {title}
            </span>
            <button
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
        {value}
      </div>

      <div className="flex flex-col gap-2">
        {selectedPlatforms.map(platform => (
          <div key={platform} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={clsx(
                'w-6 h-6 rounded flex items-center justify-center',
                `bg-[${platformData[platform].color}]10`
              )}>
                {platformData[platform].icon}
              </div>
              <span className="text-[var(--color-text-secondary)]">
                {platformData[platform].name}
              </span>
            </div>
            <span className="font-medium text-[var(--color-text-primary)]">
              {formatValue(platformValues[platform])}
            </span>
          </div>
        ))}
      </div>

      {progress !== undefined && progressTooltip && (
        <BudgetProgressBar progress={progress} progressTooltip={progressTooltip} />
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 w-64 p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg shadow-lg -top-2 left-full ml-2">
          <p className="text-sm">{tooltipDescription}</p>
        </div>
      )}
    </div>
  );
};

export const Dashboard = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google', 'facebook', 'linkedin']);

  const filteredMetrics = metrics.map(metric => ({
    ...metric,
    data: {
      ...metric.data,
      value: metric.data.platforms
        .filter(p => selectedPlatforms.includes(p.id))
        .reduce((sum, p) => sum + (metric.data.value as number) / metric.data.platforms.length, 0),
      platforms: metric.data.platforms.filter(p => selectedPlatforms.includes(p.id))
    }
  })).filter(metric => metric.data.platforms.length > 0);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const totalCampaigns = selectedPlatforms.reduce((sum, platform) => 
    sum + platformData[platform].value, 0
  );

  const totalAds = selectedPlatforms.reduce((sum, platform) => 
    sum + adData[platform], 0
  );

  const totalBudget = selectedPlatforms.reduce((sum, platform) => 
    sum + budgetData[platform], 0
  );

  const averageBudgetUsage = selectedPlatforms.reduce((sum, platform) => 
    sum + platformData[platform].budgetUsage, 0
  ) / selectedPlatforms.length;

  const budgetUsageTooltip = `Average usage of selected platforms: ${averageBudgetUsage.toFixed(1)}% used`;

  return (
    <div className="flex-1 bg-[var(--color-bg-primary)] flex flex-col min-h-[calc(100vh-48px)]">
      {/* Top Bar with Filters */}
      <div className="sticky top-[5px] z-40 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <TopBar
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={handlePlatformToggle}
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SummaryCard
              title="Total Campaigns"
              value={totalCampaigns}
              tooltipDescription="Number of active campaigns for the selected ad platforms."
              icon={LayoutDashboard}
              color="blue"
              selectedPlatforms={selectedPlatforms}
              platformValues={Object.fromEntries(
                selectedPlatforms.map(p => [p, platformData[p].value])
              )}
            />
            <SummaryCard
              title="Total Ads"
              value={totalAds.toLocaleString()}
              tooltipDescription="Total individual ads running across the selected platforms."
              icon={ImageIcon}
              color="green"
              selectedPlatforms={selectedPlatforms}
              platformValues={adData}
              formatValue={(v) => v.toLocaleString()}
            />
            <SummaryCard
              title="Total Budget"
              value={`${totalBudget.toLocaleString()} SEK`}
              tooltipDescription="Monthly total ad spend for selected platforms and how much of it is used."
              icon={Wallet}
              color="orange"
              selectedPlatforms={selectedPlatforms}
              platformValues={budgetData}
              formatValue={(v) => `${v.toLocaleString()} SEK`}
              progress={averageBudgetUsage}
              progressTooltip={budgetUsageTooltip}
            />
          </div>

          {/* Comparative Overview Section */}
          <div className="mb-6">
            <ComparativeOverview 
              metrics={filteredMetrics}
              platforms={[
                { id: 'google', name: 'Google Ads' },
                { id: 'facebook', name: 'Facebook Ads' },
                { id: 'linkedin', name: 'LinkedIn Ads' }
              ].filter(p => selectedPlatforms.includes(p.id))}
            />
          </div>

          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {filteredMetrics.slice(0, 4).map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Demographic Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <DemographicCard
              title="Gender"
              type="gender"
              data={selectedPlatforms.reduce((acc, platform) => {
                const platformData = demographicData.gender[platform];
                return {
                  male: (acc.male || 0) + platformData.male / selectedPlatforms.length,
                  female: (acc.female || 0) + platformData.female / selectedPlatforms.length,
                  other: (acc.other || 0) + platformData.other / selectedPlatforms.length
                };
              }, {})}
              tooltipDescription="Gender distribution of audience across selected platforms"
              selectedPlatforms={selectedPlatforms}
            />
            <DemographicCard
              title="Age"
              type="age"
              data={selectedPlatforms.reduce((acc, platform) => {
                const platformData = demographicData.age[platform];
                return Object.entries(platformData).reduce((ageAcc, [range, value]) => ({
                  ...ageAcc,
                  [range]: (ageAcc[range] || 0) + value / selectedPlatforms.length
                }), acc);
              }, {})}
              tooltipDescription="Age distribution of audience across selected platforms"
              selectedPlatforms={selectedPlatforms}
            />
            <DemographicCard
              title="Devices"
              type="devices"
              data={selectedPlatforms.reduce((acc, platform) => {
                const platformData = demographicData.devices[platform];
                return Object.entries(platformData).reduce((deviceAcc, [device, value]) => ({
                  ...deviceAcc,
                  [device]: (deviceAcc[device] || 0) + value / selectedPlatforms.length
                }), acc);
              }, {})}
              tooltipDescription="Device distribution of audience across selected platforms"
              selectedPlatforms={selectedPlatforms}
            />
          </div>

          {/* Keywords Card */}
          <div className="mb-6">
            <KeywordsCard />
          </div>
          
          {/* Remaining Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMetrics.slice(4).map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};