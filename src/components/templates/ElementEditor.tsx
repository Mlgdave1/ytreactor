import React from 'react';
import { X } from 'lucide-react';
import { TemplateElementType } from '../../types/template';
import { FontSelector } from './FontSelector';

interface ElementEditorProps {
  element: TemplateElementType;
  onClose: () => void;
  onUpdate: (updates: Partial<TemplateElementType>) => void;
}

export const ElementEditor: React.FC<ElementEditorProps> = ({
  element,
  onClose,
  onUpdate,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-[#272727]">
          <h3 className="text-lg font-semibold text-white">
            Edit {element.type === 'lower-third' ? 'Lower Third' : element.type}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#272727] rounded-md transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Content
            </label>
            <input
              type="text"
              value={element.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full px-3 py-2 bg-[#272727] border border-[#323232] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <FontSelector
            value={element.style.fontFamily || 'Inter'}
            onChange={(font) => onUpdate({ 
              style: { ...element.style, fontFamily: font }
            })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Font Size
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="12"
                max="72"
                value={element.style.fontSize || 16}
                onChange={(e) => onUpdate({
                  style: { ...element.style, fontSize: Number(e.target.value) }
                })}
                className="flex-1"
              />
              <span className="text-sm text-gray-400 w-12 text-right">
                {element.style.fontSize || 16}px
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Text Color
            </label>
            <input
              type="color"
              value={element.style.color || '#ffffff'}
              onChange={(e) => onUpdate({
                style: { ...element.style, color: e.target.value }
              })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          {element.type === 'lower-third' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={element.style.backgroundColor?.toString().replace(/[^#\d]/g, '') || '#000000'}
                onChange={(e) => onUpdate({
                  style: { ...element.style, backgroundColor: `${e.target.value}cc` }
                })}
                className="w-full h-10 rounded-md cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-[#272727]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#272727] text-white rounded-md hover:bg-[#323232] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};