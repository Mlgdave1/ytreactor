import { Dropbox } from '@dropbox/dropbox-sdk-js';
import { BaseStorageService } from './base';
import { StorageUploadResult } from '../../types/storage';
import { logger } from '../logger';

export class DropboxStorageService extends BaseStorageService {
  private client: Dropbox;

  constructor(token: string) {
    super({ provider: 'dropbox', token });
    this.client = new Dropbox({ accessToken: token });
  }

  async uploadFile(file: Blob, filename: string): Promise<StorageUploadResult> {
    try {
      logger.info('DropboxStorage', 'Starting file upload', { filename });
      const response = await this.client.filesUpload({
        path: `/${filename}`,
        contents: file,
      });

      logger.info('DropboxStorage', 'File uploaded successfully', {
        path: response.result.path_display,
      });

      return {
        url: response.result.path_display || '',
        fileId: response.result.id,
        provider: 'dropbox'
      };
    } catch (error) {
      logger.error('DropboxStorage', 'Upload failed', { error });
      return this.handleError(error);
    }
  }

  async getFileUrl(fileId: string): Promise<string> {
    try {
      const response = await this.client.filesGetTemporaryLink({ path: fileId });
      return response.result.link;
    } catch (error) {
      logger.error('DropboxStorage', 'Failed to get file URL', { error });
      return this.handleError(error);
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.client.filesDeleteV2({ path: fileId });
      logger.info('DropboxStorage', 'File deleted successfully', { fileId });
    } catch (error) {
      logger.error('DropboxStorage', 'Failed to delete file', { error });
      return this.handleError(error);
    }
  }
}