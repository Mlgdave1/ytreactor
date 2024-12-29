import React from 'react';
import { Star } from 'lucide-react';

export const Testimonial: React.FC = () => (
  <section className="bg-[#1a1a1a] py-24">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-full h-full bg-red-500/20 rounded-lg transform rotate-3"></div>
                <img
                  src="https://imgur.com/bbb82Jy.jpg"
                  alt="Co-founder"
                  className="relative rounded-lg w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <blockquote className="text-2xl font-medium text-white mb-6">
                "YTReactor revolutionizes how we create reaction videos. Being able to set up your layout and effects before recording is a game-changer for content creators."
              </blockquote>
              <div>
                <p className="text-xl font-semibold text-white">AnnaMia in the Moment</p>
                <p className="text-gray-400">Co-founder - Owner, YTReactor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);