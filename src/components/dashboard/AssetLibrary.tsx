import React, { useState } from 'react';
import { Search, Filter, Grid } from 'lucide-react';
import { FONTS, STICKERS, OVERLAYS, EFFECTS, ASSET_CATEGORIES } from '../../data/assets';
import { cn } from '../../utils/cn';

type AssetCategory = 'fonts' | 'stickers' | 'overlays' | 'effects';

export const AssetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | null>(null);

  const getFilteredAssets = () => {
    if (!selectedCategory) return [];
    
    const query = searchQuery.toLowerCase();
    
    switch (selectedCategory) {
      case 'fonts':
        return FONTS?.filter(font => 
          font.name.toLowerCase().includes(query) ||
          font.tags.some(tag => tag.toLowerCase().includes(query))
        ) || [];
      case 'stickers':
        return STICKERS?.filter(pack => 
          pack.name.toLowerCase().includes(query) ||
          pack.items?.some(item => item.name.toLowerCase().includes(query))
        ) || [];
      case 'overlays':
        return OVERLAYS?.filter(pack => 
          pack.name.toLowerCase().includes(query) ||
          pack.items?.some(item => item.name.toLowerCase().includes(query))
        ) || [];
      case 'effects':
        return EFFECTS?.filter(pack => 
          pack.name.toLowerCase().includes(query) ||
          pack.items?.some(item => item.name.toLowerCase().includes(query))
        ) || [];
      default:
        return [];
    }
  };

  const renderAssetGrid = () => {
    if (!selectedCategory) {
      return (
        <div className="text-center py-12">
          <Grid className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-white">Select a Category</h3>
          <p className="mt-2 text-sm text-gray-400">
            Choose a category from above to browse available assets
          </p>
        </div>
      );
    }

    const filteredAssets = getFilteredAssets();

    if (!filteredAssets?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400">No assets found matching your search.</p>
        </div>
      );
    }

    switch (selectedCategory) {
      case 'fonts':
        return (
          <div className="grid grid-cols-2 gap-4">
            {filteredAssets.map((font) => (
              <div
                key={font.id}
                className="bg-[#272727] rounded-lg p-4 hover:bg-[#323232] transition-colors"
              >
                <h3 
                  className="text-lg text-white mb-2"
                  style={{ fontFamily: font.name }}
                >
                  {font.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {font.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#1a1a1a] rounded text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'stickers':
        return (
          <div className="grid grid-cols-3 gap-4">
            {filteredAssets.map((pack) => (
              <div key={pack.id} className="space-y-4">
                <h3 className="text-lg text-white">{pack.name}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {pack.items?.map((sticker) => (
                    <div
                      key={sticker.id}
                      className="aspect-square bg-[#272727] rounded-lg overflow-hidden hover:bg-[#323232] transition-colors"
                    >
                      <img
                        src={sticker.url}
                        alt={sticker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'overlays':
        return (
          <div className="grid grid-cols-2 gap-4">
            {filteredAssets.map((pack) => (
              <div
                key={pack.id}
                className="bg-[#272727] rounded-lg p-4 hover:bg-[#323232] transition-colors"
              >
                <h3 className="text-lg text-white mb-4">{pack.name}</h3>
                <div className="space-y-2">
                  {pack.items?.map((overlay) => (
                    <div
                      key={overlay.id}
                      className="aspect-video bg-[#1a1a1a] rounded-lg p-2"
                      style={{ cssText: overlay.css }}
                    >
                      <div className="w-full h-full bg-[#323232] rounded">
                        <span className="text-xs text-gray-400">{overlay.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'effects':
        return (
          <div className="grid grid-cols-2 gap-4">
            {filteredAssets.map((pack) => (
              <div
                key={pack.id}
                className="bg-[#272727] rounded-lg p-4 hover:bg-[#323232] transition-colors"
              >
                <h3 className="text-lg text-white mb-4">{pack.name}</h3>
                <div className="space-y-2">
                  {pack.items?.map((effect) => (
                    <div
                      key={effect.id}
                      className="p-4 bg-[#1a1a1a] rounded-lg"
                    >
                      <span className="text-white">{effect.name}</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {effect.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[#272727] rounded text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Asset Library</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-64 pl-9 pr-4 py-2 bg-[#272727] border border-[#323232] rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 bg-[#272727] text-gray-400 rounded-md hover:bg-[#323232] transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2">
        {ASSET_CATEGORIES?.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as AssetCategory)}
            className={cn(
              "px-4 py-2 rounded-md text-sm transition-colors",
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-[#272727] text-gray-400 hover:bg-[#323232]"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-6">
        {renderAssetGrid()}
      </div>
    </div>
  );
};