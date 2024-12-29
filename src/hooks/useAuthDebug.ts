import { useState, useCallback } from 'react';

interface LogEntry {
  timestamp: number;
  type: 'info' | 'error' | 'warn';
  message: string;
  data?: any;
}

export const useAuthDebug = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((type: LogEntry['type'], message: string, data?: any) => {
    setLogs(prev => [...prev, {
      timestamp: Date.now(),
      type,
      message,
      data
    }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    addLog,
    clearLogs
  };
};