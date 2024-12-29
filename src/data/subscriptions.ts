import { PricingTier, SubscriptionFeature } from '../types/subscription';

export const FEATURES: SubscriptionFeature[] = [
  {
    id: 'recording',
    name: 'Video Recording',
    description: 'Record reaction videos with custom layouts',
    included: ['free', 'pro', 'business']
  },
  {
    id: 'quality-720p',
    name: '720p Video Quality',
    description: 'HD video recording',
    included: ['free', 'pro', 'business']
  },
  {
    id: 'quality-1080p',
    name: '1080p/4K Video Quality',
    description: 'Full HD and 4K recording',
    included: ['pro', 'business']
  },
  {
    id: 'templates-basic',
    name: 'Basic Templates',
    description: 'Access to basic overlay templates',
    included: ['free', 'pro', 'business']
  },
  {
    id: 'templates-advanced',
    name: 'Advanced Templates',
    description: 'Premium overlay templates and effects',
    included: ['pro', 'business']
  },
  {
    id: 'ai-captions',
    name: 'AI Auto-Captions',
    description: 'Automatic caption generation',
    included: ['pro', 'business']
  },
  {
    id: 'ai-shorts',
    name: 'AI Shorts Generator',
    description: 'Automatically create viral shorts',
    included: ['business']
  },
  {
    id: 'analytics-basic',
    name: 'Basic Analytics',
    description: 'View basic performance metrics',
    included: ['free', 'pro', 'business']
  },
  {
    id: 'analytics-advanced',
    name: 'Advanced Analytics',
    description: 'In-depth performance and audience analysis',
    included: ['business']
  },
  {
    id: 'video-limit',
    name: 'Monthly Videos',
    description: '3 videos per month',
    included: ['free']
  },
  {
    id: 'video-unlimited',
    name: 'Unlimited Videos',
    description: 'Create unlimited videos',
    included: ['pro', 'business']
  },
  {
    id: 'watermark',
    name: 'Custom Watermark',
    description: 'Add your own watermark',
    included: ['pro', 'business']
  },
  {
    id: 'team',
    name: 'Team Features',
    description: 'Collaborate with team members',
    included: ['business']
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '720p video quality',
      '3 videos per month',
      'Basic templates',
      'Basic analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    description: 'For serious content creators',
    highlighted: true,
    features: [
      '1080p/4K video quality',
      'Unlimited videos',
      'Advanced templates',
      'AI auto-captions',
      'Custom watermark',
      'Priority support'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    price: 24.99,
    description: 'For teams and professionals',
    features: [
      'Everything in Pro',
      'AI shorts generator',
      'Advanced analytics',
      'Team collaboration',
      'API access',
      'Custom branding'
    ]
  }
];