import React from 'react';
import { Circle, Square } from 'lucide-react';
import { useRecordingTimer } from '../hooks/useRecordingTimer';
import { cn } from '../utils/cn';

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
  const { formattedTime } = useRecordingTimer(isRecording);

  return (
    <div className="flex items-center gap-4 p-4 bg-[#121212] rounded-lg shadow-xl border border-[#272727]">
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
          isRecording
            ? "bg-[#272727] text-white hover:bg-[#323232]"
            : "bg-red-600 text-white hover:bg-red-700"
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

      {isRecording && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white font-mono">{formattedTime}</span>
        </div>
      )}
    </div>
  );
};