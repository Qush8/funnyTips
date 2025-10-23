export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
}

export interface Subscription {
  id: string;
  subscriberId: string;
  creatorId: string;
  creator?: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  price: number;
  stripeSubscriptionId?: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionTier {
  id: string;
  creatorId: string;
  name: string;
  description?: string;
  price: number;
  duration: 'monthly' | 'quarterly' | 'yearly';
  benefits: string[];
  isActive: boolean;
}

