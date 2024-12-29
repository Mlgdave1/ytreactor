import { useState, useCallback } from 'react';
import RecordRTC from 'recordrtc';
import { logger } from '../services/logger';

export const useRecorder = () => {
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(async (stream: MediaStream) => {
    try {
      const newRecorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        bitsPerSecond: 128000
      });

      newRecorder.startRecording();
      setRecorder(newRecorder);
      setIsRecording(true);
      setError(null);
      logger.info('Recorder', 'Recording started');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start recording';
      setError(message);
      logger.error('Recorder', 'Failed to start recording', { error: message });
    }
  }, []);

  const stopRecording = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!recorder) {
        const error = 'No active recorder found';
        logger.error('Recorder', error);
        reject(new Error(error));
        return;
      }

      recorder.stopRecording(() => {
        try {
          const blob = recorder.getBlob();
          recorder.destroy();
          setRecorder(null);
          setIsRecording(false);
          setError(null);
          logger.info('Recorder', 'Recording stopped successfully');
          resolve(blob);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to stop recording';
          setError(message);
          logger.error('Recorder', 'Failed to stop recording', { error: message });
          reject(new Error(message));
        }
      });
    });
  }, [recorder]);

  return {
    isRecording,
    error,
    startRecording,
    stopRecording
  };
};