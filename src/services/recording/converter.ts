import { FFmpeg } from '@ffmpeg/ffmpeg';
import { logger } from '../logger';

interface ConversionOptions {
  video: {
    codec: string;
    width: number;
    height: number;
    frameRate: number;
    bitrate: string;
  };
  audio: {
    codec: string;
    sampleRate: number;
    bitrate: string;
  };
}

export async function convertToMP4(blob: Blob, options: ConversionOptions): Promise<Blob> {
  try {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    const inputBuffer = await blob.arrayBuffer();
    ffmpeg.writeFile('input.webm', new Uint8Array(inputBuffer));

    // Set up conversion command with high-quality settings
    await ffmpeg.exec([
      '-i', 'input.webm',
      '-c:v', 'libx264', // H.264 video codec
      '-preset', 'medium', // Balance between quality and encoding speed
      '-crf', '23', // Constant Rate Factor (18-28 is visually lossless)
      '-c:a', 'aac', // AAC audio codec
      '-b:a', options.audio.bitrate,
      '-ar', options.audio.sampleRate.toString(),
      '-r', options.video.frameRate.toString(),
      '-s', `${options.video.width}x${options.video.height}`,
      '-movflags', '+faststart', // Enable fast start for web playback
      'output.mp4'
    ]);

    const outputData = await ffmpeg.readFile('output.mp4');
    const mp4Blob = new Blob([outputData], { type: 'video/mp4' });

    logger.info('VideoConverter', 'Conversion completed successfully', {
      inputSize: blob.size,
      outputSize: mp4Blob.size,
      ...options
    });

    return mp4Blob;
  } catch (error) {
    logger.error('VideoConverter', 'Conversion failed', { error });
    throw error;
  }
}