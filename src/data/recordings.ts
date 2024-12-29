import { RecordingMetadata } from '../types/recording';

export const RECORDINGS: RecordingMetadata[] = [
  {
    id: 'rec-1',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    duration: 325,
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    storageUrl: 'https://storage.ytreactor.com/recordings/rec-1.webm',
    thumbnailUrl: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
  },
  {
    id: 'rec-2',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    duration: 245,
    youtubeUrl: 'https://youtube.com/watch?v=jNQXAC9IVRw',
    storageUrl: 'https://storage.ytreactor.com/recordings/rec-2.webm',
    thumbnailUrl: 'https://i3.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg'
  },
  {
    id: 'rec-3',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    duration: 180,
    youtubeUrl: 'https://youtube.com/watch?v=9bZkp7q19f0',
    storageUrl: 'https://storage.ytreactor.com/recordings/rec-3.webm',
    thumbnailUrl: 'https://i3.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg'
  }
];