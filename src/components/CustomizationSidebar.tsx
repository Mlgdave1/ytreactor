import React from 'react';
import { useOverlayStore } from '../store/overlayStore';
import { Type, Layout, Plus, Trash2, Move } from 'lucide-react';

export const CustomizationSidebar: React.FC = () => {
  const {
    elements,
    selectedElement,
    addElement,
    removeElement,
  } = useOverlayStore();

  const handleAddText = () => {
    addElement({
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'New Text',
      position: { x: 50, y: 50 },
      style: {
        fontSize: 24,
        color: '#ffffff',
        backgroundColor: 'transparent',
        opacity: 1,
      },
    });
  };

  const handleAddLowerThird = () => {
    addElement({
      id: `lower-third-${Date.now()}`,
      type: 'lower-third',
      content: 'Lower Third Title',
      position: { x: 50, y: 400 },
      style: {
        fontSize: 32,
        color: '#ffffff',
        backgroundColor: '#000000',
        opacity: 0.8,
        padding: 16,
        borderRadius: 8,
        width: 400,
      },
    });
  };

  return (
    <div className="flex-none h-1/2 overflow-y-auto border-b border-[#272727]">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Customization</h2>
        
        <div className="space-y-4">
          {/* Add Elements */}
          <div className="bg-[#272727] rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Add Elements</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddText}
                className="flex items-center justify-center gap-2 p-2 bg-[#323232] hover:bg-[#404040] rounded-md transition-colors"
              >
                <Type size={16} />
                <span className="text-sm">Text</span>
              </button>
              <button
                onClick={handleAddLowerThird}
                className="flex items-center justify-center gap-2 p-2 bg-[#323232] hover:bg-[#404040] rounded-md transition-colors"
              >
                <Layout size={16} />
                <span className="text-sm">Lower Third</span>
              </button>
            </div>
          </div>

          {/* Element List */}
          <div className="bg-[#272727] rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Elements</h3>
            <div className="space-y-2">
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    selectedElement === element.id
                      ? 'bg-blue-500/20 border border-blue-500/50'
                      : 'bg-[#323232] hover:bg-[#404040]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Move size={16} className="text-gray-400 cursor-move" />
                    <span className="text-sm truncate">{element.content}</span>
                  </div>
                  <button
                    onClick={() => removeElement(element.id)}
                    className="p-1 hover:bg-red-500/20 rounded"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};