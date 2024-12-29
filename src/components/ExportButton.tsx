import React from 'react';
import { Download } from 'lucide-react';
import { exportProjectAsZip } from '../utils/export';

export const ExportButton: React.FC = () => {
  const handleExport = async () => {
    const success = await exportProjectAsZip();
    if (success) {
      // Could add a toast notification here
      console.log('Project exported successfully');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <Download size={16} />
      Export Project
    </button>
  );
};