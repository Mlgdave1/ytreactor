import React from 'react';

export const Watermark: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg z-40">
      <img 
        src="https://imgur.com/5LjJnvO.jpg" 
        alt="YTReactor Logo"
        className="w-6 h-6 rounded"
      />
      <span className="text-white/70 text-sm font-medium">
        YouTube Reactor
      </span>
    </div>
  );
};