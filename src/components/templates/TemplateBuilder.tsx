import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { TemplatePreview } from './TemplatePreview';
import { TemplateControls } from './TemplateControls';
import { Save, Layout } from 'lucide-react';

export const TemplateBuilder: React.FC = () => {
  const { saveTemplate, loadDefaultTemplate } = useTemplateStore();

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Preview Area */}
      <div className="flex-1 bg-[#0f0f0f] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Template Builder</h2>
            <p className="text-sm text-gray-400">Design your layout before recording</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadDefaultTemplate}
              className="px-4 py-2 bg-[#272727] text-white rounded-md hover:bg-[#323232] transition-colors flex items-center gap-2"
            >
              <Layout size={16} />
              Load Default
            </button>
            <button
              onClick={saveTemplate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Save Template
            </button>
          </div>
        </div>
        <TemplatePreview />
      </div>

      {/* Right Panel */}
      <div className="w-80 bg-[#1a1a1a] border-l border-[#272727]">
        <TemplateControls />
      </div>
    </div>
  );
};