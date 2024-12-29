import React from 'react';
import { Camera, CameraOff, Mic, MicOff, Loader } from 'lucide-react';
import { useWebcam } from '../../hooks/useWebcam';
import { cn } from '../../utils/cn';

interface WebcamManagerProps {
  onStream?: (stream: MediaStream) => void;
  autoEnable?: boolean;
}

export const WebcamManager: React.FC<WebcamManagerProps> = ({ onStream, autoEnable = false }) => {
  const {
    stream,
    isEnabled,
    isMicEnabled,
    error,
    isInitializing,
    toggleWebcam,
    toggleMic,
    initializeWebcam
  } = useWebcam({ 
    autoEnable,
    onStream 
  });

  return (
    <div className="absolute bottom-4 right-4 flex gap-2 z-50">
      {isInitializing ? (
        <div className="p-3 bg-black/50 rounded-full backdrop-blur-sm">
          <Loader size={24} className="text-white animate-spin" />
        </div>
      ) : (
        <>
          <button
            onClick={toggleMic}
            className={cn(
              "p-3 rounded-full transition-colors backdrop-blur-sm group",
              isEnabled ? "bg-black/50 hover:bg-black/70" : "bg-black/30 cursor-not-allowed"
            )}
            title={isMicEnabled ? "Mute microphone" : "Unmute microphone"}
            disabled={!isEnabled}
          >
            {isMicEnabled ? (
              <Mic size={24} className="text-white group-hover:text-red-400 transition-colors" />
            ) : (
              <MicOff size={24} className="text-white/70 group-hover:text-white transition-colors" />
            )}
          </button>
          <button
            onClick={toggleWebcam}
            className="p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm group"
            title={isEnabled ? "Disable camera" : "Enable camera"}
          >
            {isEnabled && !error ? (
              <Camera size={24} className="text-white group-hover:text-red-400 transition-colors" />
            ) : (
              <CameraOff size={24} className="text-white/70 group-hover:text-white transition-colors" />
            )}
          </button>
        </>
      )}
    </div>
  );
};