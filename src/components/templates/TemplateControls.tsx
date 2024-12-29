import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Type, AlignLeft, Image, Save } from 'lucide-react';
import { FontSelector } from './FontSelector';
import { cn } from '../../utils/cn';
import { ElementEditor } from './ElementEditor';
import { SaveTemplateDialog } from './SaveTemplateDialog';
import { TemplateLibrary } from './TemplateLibrary';
import { GraphicsLibrary } from '../graphics/GraphicsLibrary';

const elementTypes = [
  { id: 'text', label: 'Text', icon: Type },
  { id: 'lower-third', label: 'Lower Third', icon: AlignLeft },
  { id: 'logo', label: 'Logo', icon: Image }
];

export const TemplateControls: React.FC = () => {
  const { elements, selectedElement, updateElement, addElement } = useTemplateStore();
  const [showEditor, setShowEditor] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'elements' | 'library' | 'graphics'>('elements');

  const handleAddElement = (type: string) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      content: type === 'text' ? 'New Text' : type === 'lower-third' ? 'Name • Title' : 'Logo',
      position: { x: 50, y: 50 },
      style: {
        fontSize: type === 'text' ? 24 : 18,
        color: '#ffffff',
        backgroundColor: type === 'lower-third' ? 'rgba(0, 0, 0, 0.8)' : undefined,
        padding: type === 'lower-third' ? '12px 24px' : undefined,
        borderRadius: type === 'lower-third' ? 8 : undefined,
      },
    };

    addElement(newElement);
  };

  const handleAddGraphic = (asset: any) => {
    const newElement = {
      id: `graphic-${Date.now()}`,
      type: 'graphic',
      content: asset.name,
      graphicUrl: asset.url,
      position: { x: 50, y: 50 },
      style: {
        width: asset.style?.width || 200,
        height: asset.style?.height || 200,
      },
    };

    addElement(newElement);
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#272727]">
        <button
          onClick={() => setActiveTab('elements')}
          className={cn(
            "flex-1 p-3 text-sm font-medium transition-colors",
            activeTab === 'elements' ? "text-white bg-[#272727]" : "text-gray-400 hover:bg-[#272727]"
          )}
        >
          Elements
        </button>
        <button
          onClick={() => setActiveTab('graphics')}
          className={cn(
            "flex-1 p-3 text-sm font-medium transition-colors",
            activeTab === 'graphics' ? "text-white bg-[#272727]" : "text-gray-400 hover:bg-[#272727]"
          )}
        >
          Graphics
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={cn(
            "flex-1 p-3 text-sm font-medium transition-colors",
            activeTab === 'library' ? "text-white bg-[#272727]" : "text-gray-400 hover:bg-[#272727]"
          )}
        >
          Templates
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'elements' && (
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-300">Add Elements</h3>
                <button
                  onClick={() => setShowSaveDialog(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  <Save size={16} />
                  Save Template
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {elementTypes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleAddElement(id)}
                    className="flex flex-col items-center gap-2 p-3 bg-[#272727] hover:bg-[#323232] rounded-lg transition-colors"
                  >
                    <Icon size={20} className="text-gray-400" />
                    <span className="text-xs text-gray-300">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Elements</h3>
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={cn(
                    "p-3 rounded-lg transition-colors cursor-pointer",
                    selectedElement === element.id
                      ? "bg-blue-500/20 border border-blue-500/50"
                      : "bg-[#272727] hover:bg-[#323232]"
                  )}
                  onClick={() => setShowEditor(true)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {element.type === 'text' && <Type size={16} className="text-gray-400" />}
                      {element.type === 'lower-third' && <AlignLeft size={16} className="text-gray-400" />}
                      {element.type === 'logo' && <Image size={16} className="text-gray-400" />}
                      <span className="text-sm text-gray-300">{element.content}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'graphics' && (
          <div className="p-4">
            <GraphicsLibrary onSelectGraphic={handleAddGraphic} />
          </div>
        )}

        {activeTab === 'library' && (
          <div className="p-4">
            <TemplateLibrary />
          </div>
        )}
      </div>

      {showEditor && selectedElementData && (
        <ElementEditor
          element={selectedElementData}
          onClose={() => setShowEditor(false)}
          onUpdate={(updates) => {
            updateElement(selectedElementData.id, updates);
          }}
        />
      )}

      {showSaveDialog && (
        <SaveTemplateDialog
          onClose={() => setShowSaveDialog(false)}
          onSaved={() => setShowSaveDialog(false)}
        />
      )}
    </div>
  );
};