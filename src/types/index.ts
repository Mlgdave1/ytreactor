export interface RecordingMetadata {
  id: string;
  timestamp: number;
  duration: number;
  youtubeUrl: string;
  localUrl: string;
  thumbnailUrl?: string;
}

export interface StorageError {
  code: string;
  message: string;
  details?: unknown;
}