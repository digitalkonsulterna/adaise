import { AdSet } from '../types/adSet';

const generateId = () => Math.random().toString(36).substr(2, 9);

// Initialize with 25 example ad sets
export const mockAdSets: AdSet[] = Array.from({ length: 25 }, (_, index) => ({
  id: generateId(),
  campaignId: generateId(),
  name: `Ad Set ${index + 1}`,
  status: Math.random() > 0.3 ? 'active' : 'completed',
  platforms: ['google', 'facebook', 'linkedin'].slice(0, Math.floor(Math.random() * 3) + 1) as AdSet['platforms'],
  delivery: Math.random() > 0.7 ? 'high_performing' : 'active',
  results: Math.floor(Math.random() * 2000) + 500,
  reach: Math.floor(Math.random() * 100000) + 25000,
  frequency: Number((Math.random() * 3 + 1).toFixed(1)),
  costPerResult: Number((Math.random() * 2 + 0.5).toFixed(2)),
  budget: Math.floor(Math.random() * 3000) + 1000,
  spent: Math.floor(Math.random() * 2500) + 500,
  endDate: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
  impressions: Math.floor(Math.random() * 500000) + 50000,
  ctr: Number((Math.random() * 5 + 1).toFixed(2)),
  biddingStrategy: ['lowest_cost', 'target_cost', 'highest_value', 'cost_cap'][Math.floor(Math.random() * 4)] as AdSet['biddingStrategy'],
  targeting: ['interest', 'lookalike', 'custom_audience', 'demographic', 'behavior'].slice(0, Math.floor(Math.random() * 3) + 1) as AdSet['targeting'],
  placements: ['feed', 'stories', 'right_column', 'reels'].slice(0, Math.floor(Math.random() * 3) + 1)
}));