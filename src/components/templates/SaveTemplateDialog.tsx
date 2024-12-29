import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTemplateStore } from '../../store/templateStore';

interface SaveTemplateDialogProps {
  onClose: () => void;
  onSaved: (templateId: string) => void;
}

export const SaveTemplateDialog: React.FC<SaveTemplateDialogProps> = ({
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState('');
  const saveTemplate = useTemplateStore((state) => state.saveTemplate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const templateId = saveTemplate(name.trim());
      onSaved(templateId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-[#272727]">
          <h3 className="text-lg font-semibold text-white">Save Template</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#272727] rounded-md transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#272727] border border-[#323232] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter template name"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#272727] text-white rounded-md hover:bg-[#323232] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};