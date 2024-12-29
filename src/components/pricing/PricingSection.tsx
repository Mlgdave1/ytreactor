import React from 'react';
import { PRICING_TIERS } from '../../data/subscriptions';
import { PricingCard } from './PricingCard';

export const PricingSection: React.FC = () => {
  const handleSelectTier = (tierId: string) => {
    // TODO: Implement subscription flow
    console.log('Selected tier:', tierId);
  };

  return (
    <section className="py-24 bg-[#0f0f0f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your content creation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              onSelect={handleSelectTier}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};