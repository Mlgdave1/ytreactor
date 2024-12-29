import React from 'react';
import { X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface LogEntry {
  timestamp: number;
  type: 'info' | 'error' | 'warn';
  message: string;
  data?: any;
}

interface AuthDebugWindowProps {
  logs: LogEntry[];
  onClear: () => void;
}

export const AuthDebugWindow: React.FC<AuthDebugWindowProps> = ({ logs, onClear }) => {
  const getIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />;
      case 'warn':
        return <AlertTriangle size={16} className="text-yellow-400" />;
      default:
        return <Info size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className="debug-window flex flex-col">
      <div className="p-2 bg-[#272727] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-200">Auth Debug Logs</h3>
          <span className="text-xs text-gray-400">({logs.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="px-2 py-1 text-xs bg-[#323232] text-gray-300 rounded hover:bg-[#404040] transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => document.querySelector('.debug-window')?.remove()}
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
                : 'bg-blue-900/20 text-blue-400'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(log.type)}
                <span className="font-medium">[Auth]</span>
              </div>
              <span className="text-xs opacity-50">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1">{log.message}</p>
            {log.data && (
              <pre className="mt-1 text-xs opacity-75">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};