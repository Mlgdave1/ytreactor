import React, { useEffect } from 'react';
import { FONTS } from '../../data/fonts';
import { cn } from '../../utils/cn';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  // Load fonts when component mounts
  useEffect(() => {
    FONTS.forEach(font => {
      const link = document.createElement('link');
      link.href = font.url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-300">Font Family</h3>
      <select
        value={value || 'Inter'}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-[#272727] border border-[#323232] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {FONTS.map((font) => (
          <option
            key={font.id}
            value={font.name}
            style={{ fontFamily: font.name }}
          >
            {font.name}
          </option>
        ))}
      </select>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        {FONTS.map((font) => (
          <button
            key={font.id}
            onClick={() => onChange(font.name)}
            className={cn(
              'p-2 text-sm rounded-md transition-colors text-left',
              value === font.name
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-[#272727] text-gray-400 hover:bg-[#323232]'
            )}
            style={{ fontFamily: font.name }}
          >
            {font.name}
            <span className="block text-xs opacity-60">{font.category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};