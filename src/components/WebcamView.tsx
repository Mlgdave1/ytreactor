import React from 'react';
import Webcam from 'react-webcam';
import { WebcamManager } from './webcam/WebcamManager';
import { cn } from '../utils/cn';

interface WebcamViewProps {
  onStream?: (stream: MediaStream) => void;
  autoEnable?: boolean;
  className?: string;
}

export const WebcamView: React.FC<WebcamViewProps> = ({ 
  onStream, 
  autoEnable = false,
  className 
}) => {
  const webcamRef = React.useRef<Webcam>(null);

  const handleStream = (stream: MediaStream) => {
    if (stream && onStream) {
      onStream(stream);
    }
  };

  return (
    <div className={cn("relative w-full h-full bg-black", className)}>
      <Webcam
        ref={webcamRef}
        audio={true}
        mirrored={true}
        className="w-full h-full object-cover"
        videoConstraints={{
          width: 1920,
          height: 1080,
          aspectRatio: 16/9,
          facingMode: "user"
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <WebcamManager onStream={handleStream} autoEnable={autoEnable} />
      </div>
    </div>
  );
};