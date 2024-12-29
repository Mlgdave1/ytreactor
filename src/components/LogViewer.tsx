import React from 'react';
import { useLogStore } from '../services/logger';
import { X } from 'lucide-react';

export const LogViewer: React.FC = () => {
  const logs = useLogStore((state) => state.logs);
  const clearLogs = useLogStore((state) => state.clearLogs);

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-[#1a1a1a] rounded-lg shadow-xl border border-[#272727] max-h-96 overflow-hidden flex flex-col">
      <div className="p-2 bg-[#272727] flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-200">Debug Logs</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={clearLogs}
            className="px-2 py-1 text-xs bg-[#323232] text-gray-300 rounded hover:bg-[#404040] transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => document.querySelector('.log-viewer')?.remove()}
            className="p-1 hover:bg-[#404040] rounded transition-colors"
          >
            <X size={16} className="text-gray-300" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-2 text-sm font-mono">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              log.type === 'error'
                ? 'bg-red-900/20 text-red-400'
                : log.type === 'warn'
                ? 'bg-yellow-900/20 text-yellow-400'
                : 'bg-[#272727] text-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-medium">[{log.component}]</span>
              <span className="text-xs opacity-50">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1">{log.message}</p>
            {log.data && (
              <pre className="mt-1 text-xs opacity-75 overflow-x-auto">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};