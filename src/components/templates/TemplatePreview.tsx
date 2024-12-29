import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { TemplateElement } from './TemplateElement';
import { YouTubePreview } from '../YouTubePreview';
import { useYouTubeVideo } from '../../hooks/useYouTubeVideo';
import { Layout } from 'lucide-react';
import { WebcamView } from '../WebcamView';
import { WebcamManager } from '../webcam/WebcamManager';

export const TemplatePreview: React.FC = () => {
  const { elements, updateElementPosition } = useTemplateStore();
  const { videoUrl, embedUrl, setVideoUrl } = useYouTubeVideo();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const element = elements.find(el => el.id === active.id);
    
    if (element) {
      updateElementPosition(element.id, {
        x: element.position.x + delta.x,
        y: element.position.y + delta.y,
      });
    }
  };

  const handleWebcamStream = (stream: MediaStream) => {
    // Will be used later for recording
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0f0f0f]">
        {/* Background Layer */}
        {!embedUrl ? (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              backgroundImage: 'url(https://imgur.com/RPKpQiU.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Layout size={48} className="text-white/50 mb-4" />
            <p className="text-xl text-white/70">Position player and add elements</p>
          </div>
        ) : (
          <div className="absolute inset-0">
            <WebcamView onStream={handleWebcamStream} autoEnable={false} />
          </div>
        )}

        {/* YouTube Player Layer */}
        <YouTubePreview
          embedUrl={embedUrl}
          videoUrl={videoUrl}
          onVideoUrlChange={setVideoUrl}
          onWebcamStream={handleWebcamStream}
          defaultPosition={{ x: 520, y: 20 }}
          defaultSize={{ width: 320, height: 180 }}
        />

        {/* Template Elements Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {elements.map((element) => (
              <TemplateElement 
                key={element.id} 
                element={element}
                className="pointer-events-auto"
              />
            ))}
          </div>
        </div>

        {/* Webcam Controls */}
        <WebcamManager onStream={handleWebcamStream} />
      </div>
    </DndContext>
  );
};