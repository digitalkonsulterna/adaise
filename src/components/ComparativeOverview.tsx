import React, { useState, useEffect } from 'react';
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { useTheme } from '../contexts/ThemeContext';
import { Metric, Platform } from '../types/metrics';
import clsx from 'clsx';

interface ComparativeOverviewProps {
  metrics: Metric[];
  platforms: Platform[];
}

const metricColors = {
  clicks: '#1A73E8',
  impressions: '#D93025',
  cpc: '#188038',
  'total-spend': '#F9AB00',
  conversions: '#9334E6',
  'conversion-rate': '#EA4335',
  'bounce-rate': '#34A853',
  'time-on-site': '#FBBC04'
};

const formatValue = (value: number, metricId: string) => {
  const num = Number(value);
  
  if (metricId === 'clicks' || metricId === 'impressions') {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  }
  if (metricId === 'cpc') {
    return `kr${num.toFixed(2)}`;
  }
  if (metricId === 'total-spend') {
    if (num >= 1000000) {
      return `kr${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `kr${(num / 1000).toFixed(1)}K`;
    }
    return `kr${num.toFixed(2)}`;
  }
  return num.toString();
};

export const ComparativeOverview: React.FC<ComparativeOverviewProps> = ({ metrics, platforms }) => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['clicks', 'impressions', 'cpc', 'total-spend']);
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['clicks', 'impressions', 'cpc', 'total-spend']);
  const { theme } = useTheme();

  // Reset selected metrics when available metrics change
  useEffect(() => {
    const availableMetrics = metrics.map(m => m.id);
    setSelectedMetrics(prev => prev.filter(id => availableMetrics.includes(id)));
    setActiveMetrics(prev => prev.filter(id => availableMetrics.includes(id)));
  }, [metrics]);

  const chartColors = {
    background: theme === 'light' ? '#FFFFFF' : '#1E1E1E',
    grid: theme === 'light' ? '#E5E7EB' : '#374151',
    text: theme === 'light' ? '#6B7280' : '#9CA3AF',
  };

  const toggleMetricVisibility = (metricId: string) => {
    setActiveMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const selectedMetricsData = metrics.filter(metric => 
    selectedMetrics.includes(metric.id) && activeMetrics.includes(metric.id)
  );

  const MetricSelector = ({ position }: { position: number }) => {
    const currentMetric = metrics.find(m => m.id === selectedMetrics[position]);
    const metricColor = metricColors[currentMetric?.id as keyof typeof metricColors] || '#6B7280';
    
    return (
      <div className="relative">
        <div 
          className="p-4 w-full transition-colors hover:bg-[var(--color-bg-tertiary)]"
          onClick={() => currentMetric && toggleMetricVisibility(currentMetric.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <Menu>
                <div className="flex items-center gap-1 mb-1">
                  <Menu.Button 
                    className="text-sm font-medium text-[var(--color-text-secondary)] flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {currentMetric?.name || 'Select Metric'}
                    <ChevronDown className="w-3 h-3 text-[var(--color-text-tertiary)] ml-0.5" />
                  </Menu.Button>
                  <div 
                    className="w-3 h-3 rounded-full ml-2 transition-colors"
                    style={{
                      backgroundColor: currentMetric && activeMetrics.includes(currentMetric.id)
                        ? metricColor
                        : 'var(--color-text-tertiary)'
                    }}
                  />
                </div>
                <Menu.Items className="absolute z-50 w-64 mt-1 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)]">
                  {metrics.map((metric) => (
                    <Menu.Item key={metric.id}>
                      {({ active }) => (
                        <button
                          className={clsx(
                            'w-full text-left px-4 py-2 text-sm',
                            active ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            const newMetrics = [...selectedMetrics];
                            newMetrics[position] = metric.id;
                            setSelectedMetrics(newMetrics);
                            if (!activeMetrics.includes(metric.id)) {
                              setActiveMetrics(prev => [...prev, metric.id]);
                            }
                          }}
                        >
                          {metric.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              <div className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {currentMetric ? formatValue(Number(currentMetric.data.value), currentMetric.id) : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(
      'rounded-lg shadow-sm',
      theme === 'light' ? 'bg-white' : 'bg-[var(--color-card)]'
    )}>
      {/* Metric Cards */}
      <div className="grid grid-cols-4 divide-x divide-[var(--color-border)]">
        {[0, 1, 2, 3].map((position) => (
          <MetricSelector key={position} position={position} />
        ))}
      </div>

      {/* Chart */}
      <div className="h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid 
              stroke={chartColors.grid} 
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke={chartColors.text}
              tickLine={false}
              axisLine={false}
              dy={10}
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis 
              stroke={chartColors.text}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartColors.background,
                border: `1px solid ${chartColors.grid}`,
                borderRadius: '4px',
                padding: '8px',
              }}
            />
            <Legend />
            {selectedMetricsData.map((metric) => (
              <Line
                key={metric.id}
                type="monotone"
                data={metric.data.chartData}
                dataKey="value"
                name={metric.name}
                stroke={metricColors[metric.id as keyof typeof metricColors] || '#6B7280'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};