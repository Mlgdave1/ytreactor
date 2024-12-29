import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { GRAPHIC_CATEGORIES } from '../../data/graphics/categories';
import { GRAPHIC_ASSETS } from '../../data/graphics/assets';
import { cn } from '../../utils/cn';

interface GraphicsLibraryProps {
  onSelectGraphic?: (graphic: any) => void;
}

export const GraphicsLibrary: React.FC<GraphicsLibraryProps> = ({ onSelectGraphic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAssets = GRAPHIC_ASSETS.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search graphics..."
            className="w-full pl-9 pr-4 py-2 bg-[#272727] border border-[#323232] rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-2 bg-[#272727] text-gray-400 rounded-md hover:bg-[#323232] transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2">
        {GRAPHIC_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(
              selectedCategory === category.id ? null : category.id
            )}
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

      {/* Graphics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#1a1a1a] rounded-lg border border-[#272727] overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer"
            onClick={() => onSelectGraphic?.(asset)}
          >
            <div className="aspect-square bg-[#272727] relative">
              <img
                src={asset.thumbnail}
                alt={asset.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-white truncate">{asset.name}</h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {asset.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-[#272727] text-gray-400 rounded text-xs"
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
  );
};