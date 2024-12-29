import { google } from 'googleapis';
import { BaseStorageService } from './base';
import { StorageUploadResult } from '../../types/storage';
import { logger } from '../logger';

export class GoogleDriveStorageService extends BaseStorageService {
  private drive;

  constructor(token: string) {
    super({ provider: 'google-drive', token });
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFile(file: Blob, filename: string): Promise<StorageUploadResult> {
    try {
      logger.info('GoogleDriveStorage', 'Starting file upload', { filename });
      
      const response = await this.drive.files.create({
        requestBody: {
          name: filename,
          mimeType: 'video/webm',
        },
        media: {
          mimeType: 'video/webm',
          body: file,
        },
      });

      logger.info('GoogleDriveStorage', 'File uploaded successfully', {
        fileId: response.data.id,
      });

      return {
        url: `https://drive.google.com/file/d/${response.data.id}/view`,
        fileId: response.data.id,
        provider: 'google-drive'
      };
    } catch (error) {
      logger.error('GoogleDriveStorage', 'Upload failed', { error });
      return this.handleError(error);
    }
  }

  async getFileUrl(fileId: string): Promise<string> {
    try {
      await this.drive.files.get({
        fileId,
        fields: 'webViewLink',
      });
      return `https://drive.google.com/file/d/${fileId}/view`;
    } catch (error) {
      logger.error('GoogleDriveStorage', 'Failed to get file URL', { error });
      return this.handleError(error);
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({ fileId });
      logger.info('GoogleDriveStorage', 'File deleted successfully', { fileId });
    } catch (error) {
      logger.error('GoogleDriveStorage', 'Failed to delete file', { error });
      return this.handleError(error);
    }
  }
}