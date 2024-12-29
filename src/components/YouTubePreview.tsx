import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { VideoPlayer } from './VideoPlayer';
import { Maximize2, Minimize2, Link, ArrowRight, GripHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';
import 'react-resizable/css/styles.css';

interface YouTubePreviewProps {
  embedUrl: string;
  videoUrl: string;
  onVideoUrlChange: (url: string) => void;
  onWebcamStream: (stream: MediaStream) => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

export const YouTubePreview: React.FC<YouTubePreviewProps> = ({
  embedUrl,
  videoUrl,
  onVideoUrlChange,
  onWebcamStream,
  defaultPosition = { x: 20, y: 20 },
  defaultSize = { width: 480, height: 270 },
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const [inputValue, setInputValue] = useState(videoUrl);
  const nodeRef = useRef(null);

  const toggleSize = () => {
    const newSize = isMinimized
      ? defaultSize
      : { width: 240, height: 135 };
    
    setSize(newSize);
    setIsMinimized(!isMinimized);
  };

  const handleResize = (_: any, { size: newSize }: { size: { width: number; height: number } }) => {
    // Maintain 16:9 aspect ratio
    const aspectRatio = 16 / 9;
    const width = Math.max(240, Math.min(960, newSize.width));
    const height = Math.round(width / aspectRatio);
    setSize({ width, height });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onVideoUrlChange(inputValue.trim());
    }
  };

  return (
    <Draggable 
      handle=".handle" 
      bounds="parent" 
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
    >
      <div ref={nodeRef} className="absolute" style={{ zIndex: 50 }}>
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[240, 135]}
          maxConstraints={[960, 540]}
          onResize={handleResize}
          resizeHandles={['se', 'sw', 'nw', 'ne']}
          lockAspectRatio={true}
          className="group"
        >
          <div className="h-full bg-[#0f0f0f] rounded-lg overflow-hidden border border-[#272727] shadow-2xl flex flex-col">
            {/* Header - Always visible */}
            <div className="handle bg-[#272727] px-4 py-2 cursor-move flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <GripHorizontal size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">YouTube Video</span>
              </div>
              <button
                onClick={toggleSize}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                type="button"
              >
                {isMinimized ? (
                  <Maximize2 size={16} className="text-gray-300" />
                ) : (
                  <Minimize2 size={16} className="text-gray-300" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1">
              {!embedUrl ? (
                <div className="h-full flex items-center px-4 py-3">
                  <form onSubmit={handleSubmit} className="w-full flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link className="text-gray-400" size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Paste YouTube URL here"
                        className="w-full pl-9 pr-4 py-1.5 bg-[#121212] border border-[#272727] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Load</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="relative h-full">
                  <VideoPlayer embedUrl={embedUrl} />
                </div>
              )}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};