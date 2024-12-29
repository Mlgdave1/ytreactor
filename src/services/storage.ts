import { Dropbox } from 'dropbox';
import { google } from 'googleapis';
import { StorageProvider } from '../types';

export class StorageService {
  private dropboxClient?: Dropbox;
  private googleDriveClient?: any;

  constructor(provider: StorageProvider) {
    if (provider.type === 'dropbox') {
      this.dropboxClient = new Dropbox({ accessToken: provider.token });
    } else {
      this.googleDriveClient = google.drive({ version: 'v3', auth: provider.token });
    }
  }

  async uploadFile(file: Blob, filename: string): Promise<string> {
    if (this.dropboxClient) {
      const response = await this.dropboxClient.filesUpload({
        path: `/${filename}`,
        contents: file
      });
      return response.result.path_display;
    } else if (this.googleDriveClient) {
      const response = await this.googleDriveClient.files.create({
        requestBody: {
          name: filename,
          mimeType: 'video/webm',
        },
        media: {
          mimeType: 'video/webm',
          body: file,
        },
      });
      return response.data.id;
    }
    throw new Error('No storage provider configured');
  }
}