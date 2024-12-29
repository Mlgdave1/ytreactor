import React from 'react';
import { Circle, Square, Upload } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RecordingControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  return (
    <div className="space-y-4">
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={cn(
          'w-full px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2',
          isRecording
            ? 'bg-[#272727] text-white hover:bg-[#323232]'
            : 'bg-red-500 text-white hover:bg-red-600'
        )}
      >
        {isRecording ? (
          <>
            <Square size={20} />
            Stop Recording
          </>
        ) : (
          <>
            <Circle size={20} className="fill-current" />
            Start Recording
          </>
        )}
      </button>

      <button
        disabled={isRecording}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-md font-medium transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Upload size={20} />
        Upload to YouTube
      </button>
    </div>
  );
};