import { useState, useCallback, useEffect } from 'react';
import { logger } from '../services/logger';
import { getMediaStream } from '../utils/permissions';

interface UseWebcamOptions {
  autoEnable?: boolean;
  onStream?: (stream: MediaStream) => void;
}

export const useWebcam = ({ autoEnable = false, onStream }: UseWebcamOptions = {}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const initializeWebcam = useCallback(async () => {
    if (isInitializing) return;
    
    try {
      setIsInitializing(true);
      setError(null);

      // Stop any existing streams first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const { stream: mediaStream, error: streamError } = await getMediaStream();
      if (!mediaStream) {
        throw new Error(streamError || 'Failed to initialize webcam');
      }

      setStream(mediaStream);
      setIsEnabled(true);
      setIsMicEnabled(true);
      
      if (onStream) {
        onStream(mediaStream);
      }
      
      logger.info('Webcam', 'Successfully initialized webcam and microphone');
    } catch (err: any) {
      setError(err.message);
      setIsEnabled(false);
      setIsMicEnabled(false);
      logger.error('Webcam', 'Initialization error:', { error: err });
    } finally {
      setIsInitializing(false);
    }
  }, [onStream, stream]);

  const toggleWebcam = useCallback(async () => {
    if (!isEnabled) {
      await initializeWebcam();
    } else if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
      setIsEnabled(false);
      setIsMicEnabled(false);
      
      if (onStream) {
        onStream(null);
      }
    }
  }, [isEnabled, stream, initializeWebcam, onStream]);

  const toggleMic = useCallback(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicEnabled(!isMicEnabled);
    }
  }, [stream, isMicEnabled]);

  useEffect(() => {
    if (autoEnable) {
      initializeWebcam();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [autoEnable, initializeWebcam]);

  return {
    stream,
    isEnabled,
    isMicEnabled,
    error,
    isInitializing,
    toggleWebcam,
    toggleMic,
    initializeWebcam
  };
};