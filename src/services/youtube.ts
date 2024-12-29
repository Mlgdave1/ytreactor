import { google } from 'googleapis';
import { YouTubeMetadata } from '../types';

export class YouTubeService {
  private youtube;

  constructor(authToken: string) {
    this.youtube = google.youtube({
      version: 'v3',
      auth: authToken
    });
  }

  async uploadVideo(videoFile: Blob, metadata: YouTubeMetadata) {
    const response = await this.youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: metadata.title,
          description: metadata.description,
          tags: metadata.tags,
          categoryId: metadata.category
        },
        status: {
          privacyStatus: metadata.visibility
        }
      },
      media: {
        body: videoFile
      }
    });

    return response.data;
  }
}