import { Campaign } from '../types/campaign';

const generateId = () => Math.random().toString(36).substr(2, 9);

// Initialize with 15 example campaigns
export const mockCampaigns: Campaign[] = Array.from({ length: 15 }, (_, index) => ({
  id: generateId(),
  name: `Campaign ${index + 1}`,
  status: Math.random() > 0.3 ? 'active' : 'completed',
  platforms: ['google', 'facebook', 'linkedin'].slice(0, Math.floor(Math.random() * 3) + 1) as Campaign['platforms'],
  delivery: Math.random() > 0.7 ? 'high_performing' : 'active',
  attribution: '7-day click',
  results: Math.floor(Math.random() * 5000) + 1000,
  reach: Math.floor(Math.random() * 200000) + 50000,
  frequency: Number((Math.random() * 3 + 1).toFixed(1)),
  costPerResult: Number((Math.random() * 2 + 0.5).toFixed(2)),
  budget: Math.floor(Math.random() * 5000) + 2000,
  spent: Math.floor(Math.random() * 4000) + 1000,
  endDate: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
  impressions: Math.floor(Math.random() * 1000000) + 100000,
  ctr: Number((Math.random() * 5 + 1).toFixed(2)),
  roas: Number((Math.random() * 4 + 1).toFixed(2))
}));