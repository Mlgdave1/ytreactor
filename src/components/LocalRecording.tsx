import React, { useRef, useState } from 'react';
import { WebcamView } from './WebcamView';
import { RecordingControls } from './RecordingControls';
import { useRecording } from '../hooks/useRecording';
import { useYouTubeVideo } from '../hooks/useYouTubeVideo';
import { WebcamManager } from './webcam/WebcamManager';
import { Watermark } from './Watermark';
import { logger } from '../services/logger';
import { YouTubePreview } from './YouTubePreview';

export const LocalRecording: React.FC = () => {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { videoUrl, embedUrl, setVideoUrl } = useYouTubeVideo();
  const webcamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartRecording = async () => {
    if (!embedUrl) {
      setError('Please enter a valid YouTube URL first');
      return;
    }
    
    if (!webcamRef.current) {
      setError('Please enable your camera first');
      return;
    }

    try {
      setError(null);
      await startRecording(webcamRef.current);
      logger.info('LocalRecording', 'Started recording successfully');
    } catch (err) {
      setError('Failed to start recording. Please try again.');
      logger.error('LocalRecording', 'Start recording error', { error: err });
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopRecording();
      setError(null);
    } catch (error) {
      setError('Failed to save recording. Please try again.');
      logger.error('LocalRecording', 'Stop recording error', { error });
    }
  };

  const handleWebcamStream = (stream: MediaStream | null) => {
    webcamRef.current = stream;
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-[#121212] rounded-lg shadow-xl overflow-hidden border border-[#272727]">
        <div className="p-4 border-b border-[#272727]">
          <h2 className="text-lg font-semibold text-white">Record Your Reaction</h2>
        </div>

        <div className="aspect-video relative">
          {/* Webcam Background */}
          <div className="absolute inset-0">
            <WebcamView onStream={handleWebcamStream} />
          </div>

          {/* YouTube Player */}
          <YouTubePreview
            embedUrl={embedUrl}
            videoUrl={videoUrl}
            onVideoUrlChange={setVideoUrl}
            onWebcamStream={handleWebcamStream}
            defaultPosition={{ x: 20, y: 20 }}
            defaultSize={{ width: 480, height: 270 }}
          />

          {/* Controls */}
          <WebcamManager onStream={handleWebcamStream} />
          <Watermark />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500/20 rounded-md">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="mt-6">
        <RecordingControls
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      </div>
    </div>
  );
};