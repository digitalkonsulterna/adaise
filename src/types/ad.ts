import { CampaignStatus, DeliveryStatus } from './campaign';
import { Platform } from './platform';

export type AdFormat = 'single_image' | 'carousel' | 'video' | 'collection';

export interface Ad {
  id: string;
  campaignId: string;
  adSetId: string;
  name: string;
  status: CampaignStatus;
  platforms: Platform[];
  delivery: DeliveryStatus;
  results: number;
  reach: number;
  frequency: number;
  costPerResult: number;
  spent: number;
  impressions: number;
  ctr: number;
  format: AdFormat;
  placements: string[];
  relevanceScore: number;
  landingPageViews: number;
  videoMetrics?: {
    views: number;
    viewRate: number;
    avgWatchTime: number;
  };
}