export interface Platform {
  id: 'google' | 'facebook' | 'linkedin';
  name: string;
}

export interface MetricData {
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  platforms: Platform[];
  chartData?: ChartDataPoint[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  data: MetricData;
  format: 'currency' | 'number' | 'percentage' | 'time' | 'rating';
  platforms: Platform[];
}