import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { HelpCircle } from 'lucide-react';
import { Metric } from '../types/metrics';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { useTheme } from '../contexts/ThemeContext';
import { clsx } from 'clsx';

interface MetricCardProps {
  metric: Metric;
}

const formatValue = (value: number | string, format: string): string => {
  const num = Number(value);
  
  switch (format) {
    case 'currency':
      if (num >= 1000000) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1 })
          .format(num / 1000000) + 'M';
      } else if (num >= 1000) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1 })
          .format(num / 1000) + 'K';
      }
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    case 'percentage':
      return `${Number(value).toFixed(1)}%`;
    case 'time':
      return `${value}s`;
    case 'rating':
      return `${Number(value).toFixed(1)}/10`;
    default:
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toLocaleString();
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { theme } = useTheme();

  const trendColor = metric.data.trend === 'up' 
    ? 'text-[var(--color-success)]'
    : metric.data.trend === 'down' 
    ? 'text-[var(--color-error)]'
    : 'text-[var(--color-text-tertiary)]';

  const chartColors = {
    background: theme === 'light' ? '#FFFFFF' : '#1E1E1E',
    grid: theme === 'light' ? '#E5E7EB' : '#374151',
    text: theme === 'light' ? '#6B7280' : '#9CA3AF',
  };

  // Only show platforms that have data
  const activePlatforms = metric.data.platforms;

  return (
    <div 
      className="bg-[var(--color-card)] rounded-xl p-6 shadow-sm relative group transition-colors duration-200"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[var(--color-text-secondary)]">{metric.name}</h3>
          <div className="relative">
            <button
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
              onMouseEnter={() => setShowDescription(true)}
              onMouseLeave={() => setShowDescription(false)}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            {showDescription && (
              <div className="absolute z-20 w-64 p-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg shadow-lg -left-2 top-6">
                <p className="text-sm">{metric.description}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {activePlatforms.map(platform => (
            <div key={platform.id} className="w-4 h-4">
              {platform.id === 'google' && <GoogleIcon />}
              {platform.id === 'facebook' && <FacebookIcon />}
              {platform.id === 'linkedin' && <LinkedInIcon />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-[var(--color-text-primary)]">
          {formatValue(metric.data.value, metric.format)}
        </span>
        <span className={clsx('flex items-center', trendColor)}>
          <span className="text-lg">
            {metric.data.trend === 'up' ? '↗' : metric.data.trend === 'down' ? '↘' : '→'}
          </span>
          {' '}
          {Math.abs(metric.data.change)}%
        </span>
      </div>

      {metric.data.chartData && (
        <div className="h-16 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={metric.data.chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={
                      metric.data.trend === 'up'
                        ? 'var(--color-success)'
                        : metric.data.trend === 'down'
                        ? 'var(--color-error)'
                        : 'var(--color-text-tertiary)'
                    }
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      metric.data.trend === 'up'
                        ? 'var(--color-success)'
                        : metric.data.trend === 'down'
                        ? 'var(--color-error)'
                        : 'var(--color-text-tertiary)'
                    }
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                stroke={chartColors.grid} 
                strokeDasharray="3 3" 
                vertical={false} 
              />
              <XAxis 
                dataKey="date" 
                hide={true}
              />
              <YAxis 
                hide={true}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={
                  metric.data.trend === 'up'
                    ? 'var(--color-success)'
                    : metric.data.trend === 'down'
                    ? 'var(--color-error)'
                    : 'var(--color-text-tertiary)'
                }
                fill={`url(#gradient-${metric.id})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {showTooltip && activePlatforms.length > 0 && (
        <div className="absolute z-10 w-64 p-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg shadow-lg -top-2 left-full ml-2">
          <h4 className="font-semibold mb-2">{metric.name} by Platform</h4>
          {activePlatforms.map(platform => (
            <div key={platform.id} className="flex items-center justify-between mb-1">
              <span className="capitalize">{platform.name}</span>
              <span>{formatValue(metric.data.value / activePlatforms.length, metric.format)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};