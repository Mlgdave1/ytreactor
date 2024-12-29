import React, { useState } from 'react';
import { Layers, Type, Sticker, Image, Palette } from 'lucide-react';
import { cn } from '../../utils/cn';

type AssetTab = 'overlays' | 'text' | 'stickers' | 'backgrounds' | 'effects';

export const AssetPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AssetTab>('overlays');

  const tabs = [
    { id: 'overlays', icon: Layers, label: 'Overlays' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'stickers', icon: Sticker, label: 'Stickers' },
    { id: 'backgrounds', icon: Image, label: 'Backgrounds' },
    { id: 'effects', icon: Palette, label: 'Effects' }
  ] as const;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-[#272727]">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex-1 p-3 text-sm font-medium transition-colors hover:bg-[#272727]',
              activeTab === id ? 'text-white bg-[#272727]' : 'text-gray-400'
            )}
          >
            <Icon size={20} className="mx-auto mb-1" />
            <span className="block text-xs">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overlays' && <div>Overlay assets</div>}
        {activeTab === 'text' && <div>Text templates</div>}
        {activeTab === 'stickers' && <div>Sticker packs</div>}
        {activeTab === 'backgrounds' && <div>Background templates</div>}
        {activeTab === 'effects' && <div>Visual effects</div>}
      </div>
    </div>
  );
};