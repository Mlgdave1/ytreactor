import React from 'react';
import { Check } from 'lucide-react';
import { PricingTier } from '../../types/subscription';
import { cn } from '../../utils/cn';

interface PricingCardProps {
  tier: PricingTier;
  onSelect: (tierId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, onSelect }) => {
  return (
    <div
      className={cn(
        'bg-[#1a1a1a] rounded-lg border transition-all',
        tier.highlighted
          ? 'border-red-500 scale-105'
          : 'border-[#272727] hover:border-red-500/50'
      )}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
        <p className="text-gray-400 mb-4">{tier.description}</p>
        
        <div className="mb-6">
          <span className="text-3xl font-bold text-white">${tier.price}</span>
          <span className="text-gray-400">/month</span>
        </div>

        <button
          onClick={() => onSelect(tier.id)}
          className={cn(
            'w-full py-2 px-4 rounded-md font-medium transition-colors',
            tier.highlighted
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-[#272727] text-white hover:bg-[#323232]'
          )}
        >
          {tier.price === 0 ? 'Get Started' : 'Subscribe Now'}
        </button>
      </div>

      <div className="border-t border-[#272727] p-6">
        <ul className="space-y-4">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};