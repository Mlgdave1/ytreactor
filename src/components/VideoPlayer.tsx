import React, { useEffect, useRef } from 'react';
import { Video } from 'lucide-react';

interface VideoPlayerProps {
  embedUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ embedUrl }) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedUrl || !playerContainerRef.current) return;

    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = `https://www.youtube.com/embed/${embedUrl}?autoplay=0&enablejsapi=1&origin=${window.location.origin}&modestbranding=1&rel=0`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.border = 'none';
      
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
        playerContainerRef.current.appendChild(iframe);
      }
    } catch (err) {
      console.error('Failed to load video:', err);
    }
  }, [embedUrl]);

  return (
    <div className="w-full h-full bg-[#0f0f0f] rounded-lg overflow-hidden">
      {embedUrl ? (
        <div className="relative w-full h-full" style={{ paddingBottom: '56.25%' }}>
          <div ref={playerContainerRef} className="absolute inset-0" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 p-4">
          <Video size={48} />
          <p className="text-lg text-center">Enter a YouTube URL to load the video</p>
          <p className="text-sm text-gray-500 text-center">
            Supports youtube.com/watch, youtu.be, and video IDs
          </p>
        </div>
      )}
    </div>
  );
};