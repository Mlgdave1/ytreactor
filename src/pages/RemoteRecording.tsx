import React, { useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { WebcamView } from '../components/WebcamView';
import { RecordingControls } from '../components/RecordingControls';
import { Users } from 'lucide-react';
import { useYouTubeVideo } from '../hooks/useYouTubeVideo';

export const RemoteRecording: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { videoUrl, embedUrl, setVideoUrl } = useYouTubeVideo();
  const [participants, setParticipants] = useState<string[]>(['host']);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleUpload = () => {
    // Implement upload logic
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">YouTube Video</h2>
          <VideoPlayer embedUrl={embedUrl} />
          <input
            type="text"
            placeholder="Enter YouTube URL"
            className="w-full mt-4 p-2 border rounded"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} />
              <h3 className="font-semibold">Participants</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {participants.map((participant, index) => (
                <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <WebcamView />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <RecordingControls
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
};