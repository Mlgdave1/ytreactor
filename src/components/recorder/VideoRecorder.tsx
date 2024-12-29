import React from 'react';
import { VideoPreview } from './VideoPreview';
import { AssetPanel } from './AssetPanel';
import { RecordingControls } from './RecordingControls';
import { useRecording } from '../../hooks/useRecording';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../templates/TemplateElement';

export const VideoRecorder: React.FC = () => {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { elements, youtubePlayer } = useTemplateStore();

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Preview Area */}
      <div className="flex-1 bg-black relative">
        <VideoPreview
          defaultPosition={youtubePlayer.position}
          defaultSize={youtubePlayer.size}
        />
        
        {/* Template Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {elements.map((element) => (
            <TemplateElement
              key={element.id}
              element={element}
              className="pointer-events-auto"
            />
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 bg-[#1a1a1a] border-l border-[#272727] flex flex-col">
        <AssetPanel />
        <div className="p-4 border-t border-[#272727]">
          <RecordingControls
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />
        </div>
      </div>
    </div>
  );
};