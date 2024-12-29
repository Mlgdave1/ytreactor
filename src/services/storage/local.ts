import { BaseStorageService } from './base';
import { StorageUploadResult } from '../../types/storage';
import { logger } from '../logger';
import { downloadBlob } from '../../utils/storage';

export class LocalStorageService extends BaseStorageService {
  constructor() {
    super({ provider: 'local' });
  }

  async uploadFile(file: Blob, filename: string): Promise<StorageUploadResult> {
    try {
      logger.info('LocalStorage', 'Starting file download', { filename });
      
      // Trigger file download
      downloadBlob(file, filename);

      logger.info('LocalStorage', 'File downloaded successfully');

      return {
        url: URL.createObjectURL(file),
        fileId: filename,
        provider: 'local'
      };
    } catch (error) {
      logger.error('LocalStorage', 'Download failed', { error });
      return this.handleError(error);
    }
  }

  async getFileUrl(fileId: string): Promise<string> {
    return fileId;
  }

  async deleteFile(): Promise<void> {
    // No-op for local storage
    return Promise.resolve();
  }
}