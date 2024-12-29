import React from 'react';
import { Rocket } from 'lucide-react';

export const CallToAction: React.FC = () => (
  <section className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] py-24">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to Transform Your Reaction Videos?
      </h2>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Join the next generation of content creators who edit first and record later.
      </p>
      <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
        <Rocket size={20} />
        Get Started Now
      </button>
    </div>
  </section>
);