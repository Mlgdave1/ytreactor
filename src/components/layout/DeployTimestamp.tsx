import React from 'react';
import { Clock } from 'lucide-react';

export const DeployTimestamp: React.FC = () => {
  const buildTime = import.meta.env.VITE_BUILD_TIME;
  
  if (!buildTime) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-md border border-yellow-500/20">
      <Clock size={14} className="text-yellow-500" />
      <span className="text-xs text-yellow-500">
        Built: {new Date(buildTime).toLocaleString()}
      </span>
    </div>
  );
};