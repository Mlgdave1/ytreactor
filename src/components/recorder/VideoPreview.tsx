import React from 'react';
import { YouTubePreview } from '../YouTubePreview';
import { useYouTubeVideo } from '../../hooks/useYouTubeVideo';
import { OverlayCanvas } from './OverlayCanvas';

export const VideoPreview: React.FC = () => {
  const { videoUrl, embedUrl, setVideoUrl } = useYouTubeVideo();
  
  const handleWebcamStream = (stream: MediaStream) => {
    // Handle webcam stream
  };

  return (
    <div className="relative w-full h-full">
      <YouTubePreview
        embedUrl={embedUrl}
        videoUrl={videoUrl}
        onVideoUrlChange={setVideoUrl}
        onWebcamStream={handleWebcamStream}
      />
      <OverlayCanvas />
    </div>
  );
};