import React, { useRef, useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { WebcamView } from '../components/WebcamView';
import { RecordingControls } from '../components/RecordingControls';
import { useRecording } from '../hooks/useRecording';
import { useYouTubeVideo } from '../hooks/useYouTubeVideo';
import { useRecordingStore } from '../store/recordingStore';

export const LocalRecording: React.FC = () => {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { videoUrl, embedUrl, setVideoUrl } = useYouTubeVideo();
  const webcamRef = useRef<MediaStream | null>(null);
  const [localError, setLocalError] = useState<string>('');
  const { uploadToStorage, error: storeError, setError } = useRecordingStore();

  const handleStartRecording = async () => {
    if (!embedUrl) {
      setLocalError('Please enter a valid YouTube URL first');
      return;
    }
    
    if (webcamRef.current) {
      setLocalError('');
      setError(null);
      await startRecording(webcamRef.current);
    } else {
      setLocalError('Webcam access is required to start recording');
    }
  };

  const handleStopRecording = async () => {
    try {
      const blob = await stopRecording();
      if (blob) {
        const filename = `recording-${Date.now()}.webm`;
        await uploadToStorage(blob, filename);
      }
    } catch (error) {
      setLocalError('Failed to save recording');
      console.error('Recording error:', error);
    }
  };

  const handleWebcamStream = (stream: MediaStream) => {
    webcamRef.current = stream;
  };

  const error = localError || storeError;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">YouTube Video</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Paste YouTube URL here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <VideoPlayer embedUrl={embedUrl} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Reaction</h2>
          <WebcamView onStream={handleWebcamStream} />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="mt-6">
        <RecordingControls
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onUpload={() => {}}
        />
      </div>
    </div>
  );
};