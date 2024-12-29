export interface StorageConfig {
  provider: 'local';
  saveDirectory?: string;
}

export interface StorageUploadResult {
  url: string;
  fileId: string;
  provider: string;
}

export interface StorageError {
  code: string;
  message: string;
  details?: unknown;
}