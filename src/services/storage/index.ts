import { DropboxStorage } from './dropbox';
import { GoogleDriveStorage } from './google-drive';
import { StorageProvider } from '../../types';

export class StorageService {
  private storage: DropboxStorage | GoogleDriveStorage;

  constructor(provider: StorageProvider) {
    if (provider.type === 'dropbox') {
      this.storage = new DropboxStorage(provider.token);
    } else {
      this.storage = new GoogleDriveStorage(provider.token);
    }
  }

  async uploadFile(file: Blob, filename: string): Promise<string> {
    try {
      return await this.storage.uploadFile(file, filename);
    } catch (error) {
      console.error('Storage service error:', error);
      throw error;
    }
  }
}

export type { StorageProvider };