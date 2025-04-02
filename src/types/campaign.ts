import { Platform } from './platform';

export type CampaignStatus = 'active' | 'completed' | 'off';
export type DeliveryStatus = 'active' | 'completed' | 'off' | 'high_performing';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  platforms: Platform[];
  delivery: DeliveryStatus;
  attribution: string;
  results: number;
  reach: number;
  frequency: number;
  costPerResult: number;
  budget: number;
  spent: number;
  endDate: string;
  impressions: number;
  ctr: number;
  roas: number;
}