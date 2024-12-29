export interface RecordingMetadata {
  id: string;
  timestamp: number;
  duration: number;
  youtubeUrl: string;
  storageUrl: string;
  thumbnailUrl?: string;
}

export interface YouTubeUploadMetadata {
  title: string;
  description: string;
  tags: string[];
  category: string;
  visibility: 'private' | 'unlisted' | 'public';
  playlist?: string;
}