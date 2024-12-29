import React from 'react';
import { Wand2, Clock, Palette } from 'lucide-react';

export const HeroBanner: React.FC = () => (
  <div className="relative py-20 overflow-hidden">
    {/* Background Image with Overlay */}
    <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />
    </div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">
          Edit First, Record Later
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A revolutionary approach to creating reaction videos. Set up your perfect layout before hitting record.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Wand2 size={24} className="text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Pre-Production Magic</h3>
          <p className="text-gray-300">
            Design your video layout, add overlays, and perfect your setup before recording a single frame.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Clock size={24} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
          <p className="text-gray-300">
            No more post-production hassle. Your video is ready to upload right after recording.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Palette size={24} className="text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Professional Look</h3>
          <p className="text-gray-300">
            Access premium overlays, lower thirds, and effects to make your reactions stand out.
          </p>
        </div>
      </div>
    </div>
  </div>
);