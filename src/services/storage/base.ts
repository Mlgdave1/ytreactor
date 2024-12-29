import { StorageConfig, StorageUploadResult, StorageError } from '../../types/storage';

export abstract class BaseStorageService {
  protected config: StorageConfig;

  constructor(config: StorageConfig) {
    this.config = config;
  }

  abstract uploadFile(file: Blob, filename: string): Promise<StorageUploadResult>;
  abstract getFileUrl(fileId: string): Promise<string>;
  abstract deleteFile(fileId: string): Promise<void>;

  protected handleError(error: unknown): never {
    const storageError: StorageError = {
      code: 'STORAGE_ERROR',
      message: 'An unknown error occurred',
      details: error
    };

    if (error instanceof Error) {
      storageError.message = error.message;
    }

    throw storageError;
  }
}