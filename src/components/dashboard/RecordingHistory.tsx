import React from 'react';
import { RECORDINGS } from '../../data/recordings';
import { formatDuration, formatDate } from '../../utils/format';
import { Play, Download, Upload, Trash2 } from 'lucide-react';

export const RecordingHistory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Recording History</h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {RECORDINGS.map((recording) => (
          <div
            key={recording.id}
            className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-4 flex items-center gap-4"
          >
            <div className="w-48 aspect-video bg-[#272727] rounded relative flex-shrink-0">
              <img
                src={recording.thumbnailUrl}
                alt="Recording thumbnail"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                {formatDuration(recording.duration)}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-white font-medium">Recording {recording.id}</h3>
                <span className="text-sm text-gray-400">
                  {formatDate(recording.timestamp)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#272727] text-white rounded hover:bg-[#323232] transition-colors">
                  <Play size={16} />
                  Play
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#272727] text-white rounded hover:bg-[#323232] transition-colors">
                  <Download size={16} />
                  Download
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  <Upload size={16} />
                  Upload to YouTube
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};