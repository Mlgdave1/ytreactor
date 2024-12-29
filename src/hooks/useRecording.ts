import { useState, useCallback, useRef } from 'react';
import { logger } from '../services/logger';
import { recordingService } from '../services/recording';

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async (stream: MediaStream) => {
    try {
      logger.info('Recording', 'Starting recording');
      chunksRef.current = [];
      streamRef.current = stream;
      
      // Check if the browser supports the required codecs
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : 'video/webm;codecs=vp8,opus';

      const options = {
        mimeType,
        videoBitsPerSecond: 2500000, // 2.5 Mbps
        audioBitsPerSecond: 128000   // 128 kbps
      };

      const recorder = new MediaRecorder(stream, options);
      
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
          logger.info('Recording', 'Received data chunk', { 
            size: event.data.size,
            chunks: chunksRef.current.length 
          });
        }
      };

      recorder.onstart = () => {
        logger.info('Recording', 'MediaRecorder started');
        setIsRecording(true);
      };

      recorder.onstop = async () => {
        try {
          logger.info('Recording', 'MediaRecorder stopped, processing chunks', { 
            chunks: chunksRef.current.length 
          });

          if (chunksRef.current.length === 0) {
            throw new Error('No data chunks collected during recording');
          }

          const blob = new Blob(chunksRef.current, { type: mimeType });
          
          if (blob.size === 0) {
            throw new Error('Generated blob is empty');
          }

          await recordingService.saveRecording(blob);
          logger.info('Recording', 'Successfully saved recording', { 
            size: blob.size,
            type: blob.type
          });
        } catch (error) {
          logger.error('Recording', 'Failed to save recording', { error });
          throw error;
        } finally {
          chunksRef.current = [];
          setIsRecording(false);
        }
      };

      recorder.onerror = (event) => {
        logger.error('Recording', 'MediaRecorder error', { error: event.error });
        setIsRecording(false);
      };

      mediaRecorder.current = recorder;
      // Start recording with smaller timeslices for more frequent chunks
      recorder.start(500); // Collect data every 500ms
      
      logger.info('Recording', 'Recording started successfully');
    } catch (error) {
      logger.error('Recording', 'Failed to start recording', { error });
      setIsRecording(false);
      throw error;
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!mediaRecorder.current) {
      throw new Error('No active recorder found');
    }

    try {
      logger.info('Recording', 'Stopping recording');
      
      if (mediaRecorder.current.state === 'recording') {
        // Request final data chunk before stopping
        mediaRecorder.current.requestData();
        
        // Small delay to ensure we get the final chunk
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Stop the recorder
        mediaRecorder.current.stop();
        mediaRecorder.current = null;

        // Clean up stream tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      }
    } catch (error) {
      logger.error('Recording', 'Failed to stop recording', { error });
      throw error;
    }
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording
  };
};