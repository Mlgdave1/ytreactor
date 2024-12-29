import React, { useState } from 'react';
import { Search, Plus, GripHorizontal } from 'lucide-react';
import { ASSETS, ASSET_CATEGORIES } from '../data/assets';
import { useOverlayStore } from '../store/overlayStore';

export const AssetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addElement } = useOverlayStore();

  const filteredAssets = ASSETS.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddAsset = (asset: typeof ASSETS[0]) => {
    addElement({
      id: `element-${Date.now()}`,
      type: asset.type,
      content: asset.name,
      position: { x: 50, y: 50 },
      style: {
        ...(asset.template || {}),
        opacity: 1,
      },
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Asset Library</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full pl-9 pr-4 py-2 bg-[#272727] border border-[#323232] rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {ASSET_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#272727] text-gray-300 hover:bg-[#323232]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group relative bg-[#272727] rounded-lg overflow-hidden cursor-move"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(asset));
              }}
            >
              <div className="relative">
                {asset.thumbnail && (
                  <img
                    src={asset.thumbnail}
                    alt={asset.name}
                    className="w-full aspect-video object-cover"
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleAddAsset(asset)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={16} />
                    Add to Scene
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <GripHorizontal size={16} className="text-gray-400" />
                  <h3 className="text-sm font-medium text-white truncate">{asset.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 bg-[#323232] text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};