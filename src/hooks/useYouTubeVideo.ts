import { useState, useEffect } from 'react';
import { logger } from '../services/logger';

export const useYouTubeVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (url: string): string | null => {
    try {
      // Clean the URL first
      const cleanUrl = url.trim();
      if (!cleanUrl) return null;

      // Handle youtu.be URLs
      if (cleanUrl.includes('youtu.be/')) {
        const id = cleanUrl.split('youtu.be/')[1]?.split(/[#?]/)[0];
        if (id) {
          logger.info('YouTubeVideo', 'Extracted ID from youtu.be URL', { id });
          return id;
        }
      }

      // Handle youtube.com URLs
      if (cleanUrl.includes('youtube.com/watch')) {
        const urlObj = new URL(cleanUrl);
        const id = urlObj.searchParams.get('v');
        if (id) {
          logger.info('YouTubeVideo', 'Extracted ID from youtube.com URL', { id });
          return id;
        }
      }

      // Handle direct video IDs
      if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        logger.info('YouTubeVideo', 'Direct video ID detected', { id: cleanUrl });
        return cleanUrl;
      }

      logger.warn('YouTubeVideo', 'No valid video ID found');
      return null;
    } catch (error) {
      logger.error('YouTubeVideo', 'Error extracting video ID', { error });
      return null;
    }
  };

  useEffect(() => {
    if (!videoUrl) {
      setEmbedUrl('');
      setError(null);
      return;
    }

    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        setError('Invalid YouTube URL. Please enter a valid YouTube video URL or video ID.');
        setEmbedUrl('');
        return;
      }

      setEmbedUrl(videoId);
      setError(null);
      logger.info('YouTubeVideo', 'Video ID processed successfully', { videoId });
    } catch (error) {
      logger.error('YouTubeVideo', 'Error processing URL', { error });
      setError('Failed to process YouTube URL');
      setEmbedUrl('');
    }
  }, [videoUrl]);

  return {
    videoUrl,
    embedUrl,
    error,
    setVideoUrl
  };
};