import { create } from 'zustand';
import { RecordingMetadata } from '../types';
import { logger } from '../services/logger';
import { downloadBlob, generateFileName } from '../utils/storage';

interface RecordingState {
  recordings: RecordingMetadata[];
  currentRecording: RecordingMetadata | null;
  error: string | null;
  addRecording: (recording: RecordingMetadata) => void;
  saveRecording: (blob: Blob) => Promise<string>;
  setError: (error: string | null) => void;
}

export const useRecordingStore = create<RecordingState>((set, get) => ({
  recordings: [],
  currentRecording: null,
  error: null,

  addRecording: (recording) => 
    set((state) => ({ recordings: [...state.recordings, recording] })),

  saveRecording: async (blob) => {
    try {
      const filename = generateFileName();
      downloadBlob(blob, filename);
      
      const url = URL.createObjectURL(blob);
      logger.info('RecordingStore', 'Recording saved locally', { filename });
      set({ error: null });
      
      return url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save recording';
      set({ error: errorMessage });
      logger.error('RecordingStore', 'Failed to save recording', { error });
      throw error;
    }
  },

  setError: (error) => set({ error })
}));