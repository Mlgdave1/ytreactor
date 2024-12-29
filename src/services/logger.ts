import { create } from 'zustand';

interface LogEntry {
  timestamp: number;
  type: 'info' | 'error' | 'warn';
  component: string;
  message: string;
  data?: any;
}

interface LogStore {
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'timestamp'>) => void;
  clearLogs: () => void;
}

export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (entry) => set((state) => ({
    logs: [...state.logs, { ...entry, timestamp: Date.now() }]
  })),
  clearLogs: () => set({ logs: [] })
}));

export const logger = {
  info: (component: string, message: string, data?: any) => {
    useLogStore.getState().addLog({ type: 'info', component, message, data });
    console.log(`[${component}] ${message}`, data || '');
  },
  error: (component: string, message: string, data?: any) => {
    useLogStore.getState().addLog({ type: 'error', component, message, data });
    console.error(`[${component}] ${message}`, data || '');
  },
  warn: (component: string, message: string, data?: any) => {
    useLogStore.getState().addLog({ type: 'warn', component, message, data });
    console.warn(`[${component}] ${message}`, data || '');
  }
};