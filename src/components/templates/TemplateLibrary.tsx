import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemplateStore } from '../../store/templateStore';
import { Play } from 'lucide-react';

export const TemplateLibrary: React.FC = () => {
  const templates = useTemplateStore((state) => state.templates);
  const navigate = useNavigate();

  const handleUseTemplate = (templateId: string) => {
    navigate(`/recorder?template=${templateId}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-[#1a1a1a] rounded-lg border border-[#272727] overflow-hidden group"
          >
            <div className="aspect-video bg-[#272727] relative">
              {/* Template Preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">Template Preview</span>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Play size={20} />
                  Use in Recording
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-white font-medium truncate">{template.name}</h3>
              <p className="text-sm text-gray-400">
                {new Date(template.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};