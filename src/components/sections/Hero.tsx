import React from 'react';
import { Wand2, Clock, Palette } from 'lucide-react';

export const Hero: React.FC = () => (
  <section className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Edit First, Record Later
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A revolutionary approach to creating reaction videos. Set up your perfect layout before hitting record.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#272727] rounded-lg p-6 transform hover:scale-105 transition-transform">
          <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Wand2 size={24} className="text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Pre-Production Magic</h3>
          <p className="text-gray-400">
            Design your video layout, add overlays, and perfect your setup before recording a single frame.
          </p>
        </div>

        <div className="bg-[#272727] rounded-lg p-6 transform hover:scale-105 transition-transform">
          <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Clock size={24} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
          <p className="text-gray-400">
            No more post-production hassle. Your video is ready to upload right after recording.
          </p>
        </div>

        <div className="bg-[#272727] rounded-lg p-6 transform hover:scale-105 transition-transform">
          <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Palette size={24} className="text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Professional Look</h3>
          <p className="text-gray-400">
            Access premium overlays, lower thirds, and effects to make your reactions stand out.
          </p>
        </div>
      </div>
    </div>
  </section>
);