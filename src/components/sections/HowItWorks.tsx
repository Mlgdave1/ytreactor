import React from 'react';
import { Youtube, Edit, Video, Share2, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => (
  <section className="bg-[#1a1a1a] py-24">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
      
      <div className="grid md:grid-cols-5 gap-8">
        <div className="text-center">
          <div className="bg-[#272727] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Youtube size={24} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">1. Add YouTube Video</h3>
          <p className="text-gray-400">Paste any YouTube URL to get started</p>
        </div>

        <div className="text-center">
          <div className="bg-[#272727] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit size={24} className="text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">2. Customize Layout</h3>
          <p className="text-gray-400">Add overlays, text, and effects</p>
        </div>

        <div className="text-center">
          <div className="bg-[#272727] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video size={24} className="text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">3. Record Reaction</h3>
          <p className="text-gray-400">Hit record and react naturally</p>
        </div>

        <div className="text-center">
          <div className="bg-[#272727] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">4. AI Magic</h3>
          <p className="text-gray-400">Our AI automatically creates viral Shorts from your reaction</p>
        </div>

        <div className="text-center">
          <div className="bg-[#272727] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 size={24} className="text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">5. Share</h3>
          <p className="text-gray-400">Upload directly to YouTube</p>
        </div>
      </div>
    </div>
  </section>
);