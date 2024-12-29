export type SubscriptionTier = 'free' | 'pro' | 'business';

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  included: SubscriptionTier[];
}

export interface PricingTier {
  id: SubscriptionTier;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}