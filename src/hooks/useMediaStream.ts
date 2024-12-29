import { useState, useEffect, useCallback } from 'react';
import { logger } from '../services/logger';

interface MediaStreamOptions {
  video: boolean;
  audio: boolean;
}

export const useMediaStream = (options: MediaStreamOptions = { video: true, audio: true }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(options);
      setStream(mediaStream);
      setError(null);
      logger.info('MediaStream', 'Stream initialized successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access media devices';
      setError(message);
      logger.error('MediaStream', 'Failed to initialize stream', { error: message });
    }
  }, [options]);

  useEffect(() => {
    initStream();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [initStream]);

  return { stream, error, initStream };
};