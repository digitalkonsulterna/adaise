import { CampaignStatus, DeliveryStatus } from './campaign';
import { Platform } from './platform';

export type BiddingStrategy = 'lowest_cost' | 'target_cost' | 'highest_value' | 'cost_cap';
export type TargetingType = 'interest' | 'lookalike' | 'custom_audience' | 'demographic' | 'behavior';

export interface AdSet {
  id: string;
  campaignId: string;
  name: string;
  status: CampaignStatus;
  platforms: Platform[];
  delivery: DeliveryStatus;
  results: number;
  reach: number;
  frequency: number;
  costPerResult: number;
  budget: number;
  spent: number;
  endDate: string;
  impressions: number;
  ctr: number;
  biddingStrategy: BiddingStrategy;
  targeting: TargetingType[];
  placements: string[];
}