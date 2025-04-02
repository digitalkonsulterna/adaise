import { Ad } from '../types/ad';

const generateId = () => Math.random().toString(36).substr(2, 9);

// Initialize with 30 example ads
export const mockAds: Ad[] = Array.from({ length: 30 }, (_, index) => ({
  id: generateId(),
  campaignId: generateId(),
  adSetId: generateId(),
  name: `Ad ${index + 1}`,
  status: Math.random() > 0.3 ? 'active' : 'completed',
  platforms: ['google', 'facebook', 'linkedin'].slice(0, Math.floor(Math.random() * 3) + 1) as Ad['platforms'],
  delivery: Math.random() > 0.7 ? 'high_performing' : 'active',
  results: Math.floor(Math.random() * 1000) + 200,
  reach: Math.floor(Math.random() * 50000) + 10000,
  frequency: Number((Math.random() * 3 + 1).toFixed(1)),
  costPerResult: Number((Math.random() * 2 + 0.5).toFixed(2)),
  spent: Math.floor(Math.random() * 1500) + 300,
  impressions: Math.floor(Math.random() * 200000) + 20000,
  ctr: Number((Math.random() * 5 + 1).toFixed(2)),
  format: ['single_image', 'carousel', 'video', 'collection'][Math.floor(Math.random() * 4)] as Ad['format'],
  placements: ['feed', 'stories', 'right_column', 'reels'].slice(0, Math.floor(Math.random() * 3) + 1),
  relevanceScore: Math.floor(Math.random() * 5) + 5,
  landingPageViews: Math.floor(Math.random() * 800) + 200,
  videoMetrics: Math.random() > 0.5 ? {
    views: Math.floor(Math.random() * 10000) + 1000,
    viewRate: Number((Math.random() * 30 + 60).toFixed(1)),
    avgWatchTime: Number((Math.random() * 20 + 5).toFixed(1))
  } : undefined
}));