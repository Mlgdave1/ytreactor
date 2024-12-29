import { Asset, AssetCategory } from '../types/assets';

// Asset Categories
export const ASSET_CATEGORIES: AssetCategory[] = [
  {
    id: 'fonts',
    name: 'Fonts',
    description: 'Typography and text styles'
  },
  {
    id: 'stickers',
    name: 'Stickers',
    description: 'Animated reactions and emotes'
  },
  {
    id: 'overlays',
    name: 'Overlays',
    description: 'Stream frames and borders'
  },
  {
    id: 'effects',
    name: 'Effects',
    description: 'Transitions and animations'
  }
];

// Fonts
export const FONTS: Asset[] = [
  {
    id: 'inter',
    type: 'font',
    name: 'Inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    tags: ['modern', 'clean', 'professional'],
    category: 'fonts'
  },
  {
    id: 'montserrat',
    type: 'font',
    name: 'Montserrat',
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
    tags: ['elegant', 'modern', 'versatile'],
    category: 'fonts'
  }
];

// Stickers
export const STICKERS: Asset[] = [
  {
    id: 'reaction-pack-1',
    type: 'sticker',
    name: 'Basic Reactions',
    url: 'https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif',
    thumbnail: 'https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy_s.gif',
    tags: ['reaction', 'surprise', 'animated'],
    category: 'stickers'
  },
  {
    id: 'reaction-pack-2',
    type: 'sticker',
    name: 'Gaming Reactions',
    url: 'https://media.giphy.com/media/l0HlL6eH6eEew5FpS/giphy.gif',
    thumbnail: 'https://media.giphy.com/media/l0HlL6eH6eEew5FpS/giphy_s.gif',
    tags: ['gaming', 'reaction', 'animated'],
    category: 'stickers'
  }
];

// Overlays
export const OVERLAYS: Asset[] = [
  {
    id: 'minimal-frame',
    type: 'overlay',
    name: 'Minimal Frame',
    url: 'https://example.com/minimal-frame.png',
    thumbnail: 'https://example.com/minimal-frame-thumb.png',
    tags: ['minimal', 'clean', 'modern'],
    category: 'overlays',
    template: {
      css: `
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 16px;
      `
    }
  },
  {
    id: 'gaming-frame',
    type: 'overlay',
    name: 'Gaming Frame',
    url: 'https://example.com/gaming-frame.png',
    thumbnail: 'https://example.com/gaming-frame-thumb.png',
    tags: ['gaming', 'esports', 'stream'],
    category: 'overlays',
    template: {
      css: `
        border: 3px solid rgba(255, 0, 0, 0.3);
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
        border-radius: 4px;
      `
    }
  }
];

// Effects
export const EFFECTS: Asset[] = [
  {
    id: 'fade',
    type: 'effect',
    name: 'Fade',
    url: '#',
    thumbnail: '#',
    tags: ['transition', 'fade', 'smooth'],
    category: 'effects',
    template: {
      css: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `
    }
  },
  {
    id: 'slide',
    type: 'effect',
    name: 'Slide Up',
    url: '#',
    thumbnail: '#',
    tags: ['transition', 'slide', 'dynamic'],
    category: 'effects',
    template: {
      css: `
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `
    }
  }
];