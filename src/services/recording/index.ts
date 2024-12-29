import { logger } from '../logger';
import { saveAs } from 'file-saver';
import { RecordingMetadata } from '../../types/recording';

export class RecordingService {
  private recordings: RecordingMetadata[] = [];

  async saveRecording(blob: Blob): Promise<RecordingMetadata> {
    try {
      if (!blob || blob.size === 0) {
        throw new Error('Invalid recording blob: empty or null');
      }

      // Verify the blob is a valid video
      if (!blob.type.startsWith('video/')) {
        throw new Error(`Invalid blob type: ${blob.type}`);
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `reaction-${timestamp}.webm`;

      logger.info('RecordingService', 'Saving recording', { 
        size: blob.size,
        type: blob.type,
        filename 
      });

      // Create a copy of the blob to ensure it's not modified
      const blobCopy = new Blob([blob], { type: blob.type });

      // Save file locally using file-saver
      saveAs(blobCopy, filename);

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(blobCopy);

      const recording: RecordingMetadata = {
        id: `rec-${Date.now()}`,
        timestamp: Date.now(),
        duration: 0, // Will be calculated from the blob
        storageUrl: objectUrl,
        thumbnailUrl: '', // Will be generated later
        status: 'ready'
      };

      this.recordings.push(recording);
      logger.info('RecordingService', 'Recording saved successfully', { 
        id: recording.id,
        size: blobCopy.size 
      });

      return recording;
    } catch (error) {
      logger.error('RecordingService', 'Failed to save recording', { error });
      throw error;
    }
  }

  getRecordings(): RecordingMetadata[] {
    return this.recordings;
  }

  // Clean up object URLs when recordings are removed
  cleanup() {
    this.recordings.forEach(recording => {
      if (recording.storageUrl) {
        URL.revokeObjectURL(recording.storageUrl);
      }
    });
    this.recordings = [];
  }
}

export const recordingService = new RecordingService();