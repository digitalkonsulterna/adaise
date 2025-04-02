import { Metric } from '../types/metrics';

const generateChartData = (days: number, trend: 'up' | 'down' | 'neutral') => {
  const data = [];
  let value = Math.random() * 1000;
  
  for (let i = 0; i < days; i++) {
    if (trend === 'up') {
      value += Math.random() * 50;
    } else if (trend === 'down') {
      value -= Math.random() * 50;
    } else {
      value += (Math.random() - 0.5) * 50;
    }
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.max(0, value)
    });
  }
  
  return data;
};

export const metrics: Metric[] = [
  {
    id: 'total-spend',
    name: 'Total Spend',
    description: 'Total advertising spend',
    format: 'currency',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 12345,
      change: 12,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'impressions',
    name: 'Impressions',
    description: 'Total number of ad impressions',
    format: 'number',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 1200000,
      change: -2.3,
      trend: 'down',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'down')
    }
  },
  {
    id: 'reach',
    name: 'Reach',
    description: 'Number of unique users who have seen the ad',
    format: 'number',
    platforms: [
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 800000,
      change: 5.7,
      trend: 'up',
      platforms: [
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'clicks',
    name: 'Clicks',
    description: 'Total number of ad clicks',
    format: 'number',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 45200,
      change: 8.1,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'ctr',
    name: 'Click-Through Rate',
    description: 'Percentage of clicks relative to impressions',
    format: 'percentage',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 2.8,
      change: 3.2,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'conversions',
    name: 'Conversions',
    description: 'Number of conversions from ads',
    format: 'number',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 892,
      change: 4.5,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'cpa',
    name: 'Cost Per Conversion',
    description: 'Average cost per conversion',
    format: 'currency',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 13.84,
      change: -2.1,
      trend: 'down',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'down')
    }
  },
  {
    id: 'cpc',
    name: 'Cost Per Click',
    description: 'Average cost per click',
    format: 'currency',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 0.27,
      change: -1.8,
      trend: 'down',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'down')
    }
  },
  {
    id: 'cpm',
    name: 'Cost Per Mille',
    description: 'Cost per 1,000 ad impressions',
    format: 'currency',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 7.52,
      change: 1.2,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'roas',
    name: 'Return on Ad Spend',
    description: 'Return on ad spend',
    format: 'number',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 3.2,
      change: 6.7,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'engagements',
    name: 'Ad Engagements',
    description: 'Total number of interactions (likes, shares, comments)',
    format: 'number',
    platforms: [
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 25600,
      change: 9.3,
      trend: 'up',
      platforms: [
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'bounce-rate',
    name: 'Bounce Rate',
    description: 'Percentage of users who leave the site after clicking the ad',
    format: 'percentage',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' }
    ],
    data: {
      value: 42.3,
      change: -3.1,
      trend: 'down',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' }
      ],
      chartData: generateChartData(30, 'down')
    }
  },
  {
    id: 'video-views',
    name: 'Video Views',
    description: 'Total number of video views from ads',
    format: 'number',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 156000,
      change: 12.4,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'thruplay-rate',
    name: 'ThruPlay Rate',
    description: 'Percentage of users who watched the full video',
    format: 'percentage',
    platforms: [
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 28.7,
      change: 2.8,
      trend: 'up',
      platforms: [
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    description: 'Number of leads generated from ads',
    format: 'number',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 342,
      change: 7.2,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'time-on-site',
    name: 'Time on Site',
    description: 'Average time users spend on the site after clicking an ad',
    format: 'time',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' }
    ],
    data: {
      value: 185,
      change: 4.3,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'conversion-rate',
    name: 'Conversion Rate',
    description: 'Percentage of clicks that lead to conversions',
    format: 'percentage',
    platforms: [
      { id: 'google', name: 'Google Ads' },
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 3.8,
      change: 2.1,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' },
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'quality-score',
    name: 'Quality Score',
    description: 'Google Ads quality score for the ad',
    format: 'rating',
    platforms: [
      { id: 'google', name: 'Google Ads' }
    ],
    data: {
      value: 8.2,
      change: 0.5,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'ad-rank',
    name: 'Ad Rank',
    description: 'The ranking position of the ad in the auction',
    format: 'rating',
    platforms: [
      { id: 'google', name: 'Google Ads' }
    ],
    data: {
      value: 7.8,
      change: 1.2,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  },
  {
    id: 'frequency',
    name: 'Frequency',
    description: 'How often a user sees the ad',
    format: 'number',
    platforms: [
      { id: 'facebook', name: 'Facebook Ads' },
      { id: 'linkedin', name: 'LinkedIn Ads' }
    ],
    data: {
      value: 3.4,
      change: -1.2,
      trend: 'down',
      platforms: [
        { id: 'facebook', name: 'Facebook Ads' },
        { id: 'linkedin', name: 'LinkedIn Ads' }
      ],
      chartData: generateChartData(30, 'down')
    }
  },
  {
    id: 'landing-page-experience',
    name: 'Landing Page Experience',
    description: 'How well users perceive the landing page',
    format: 'rating',
    platforms: [
      { id: 'google', name: 'Google Ads' }
    ],
    data: {
      value: 8.5,
      change: 0.8,
      trend: 'up',
      platforms: [
        { id: 'google', name: 'Google Ads' }
      ],
      chartData: generateChartData(30, 'up')
    }
  }
];

export const demographicData = {
  gender: {
    google: { male: 62, female: 35, other: 3 },
    facebook: { male: 55, female: 42, other: 3 },
    linkedin: { male: 58, female: 39, other: 3 }
  },
  age: {
    google: {
      '18-24': 15,
      '25-34': 35,
      '35-44': 25,
      '45-54': 15,
      '55+': 10
    },
    facebook: {
      '18-24': 22,
      '25-34': 38,
      '35-44': 20,
      '45-54': 12,
      '55+': 8
    },
    linkedin: {
      '18-24': 10,
      '25-34': 42,
      '35-44': 28,
      '45-54': 15,
      '55+': 5
    }
  },
  devices: {
    google: {
      mobile: 68,
      desktop: 27,
      tablet: 5
    },
    facebook: {
      mobile: 75,
      desktop: 20,
      tablet: 5
    },
    linkedin: {
      mobile: 55,
      desktop: 40,
      tablet: 5
    }
  }
};