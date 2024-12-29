import { Asset } from '../../types/assets';

export const OVERLAYS: Asset[] = [
  {
    id: 'minimal-frames',
    type: 'overlay',
    name: 'Minimal Frames',
    items: [
      {
        id: 'clean-border',
        name: 'Clean Border',
        url: 'https://i.imgur.com/1234567.png',
        css: `
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 16px;
        `,
        tags: ['minimal', 'border', 'clean']
      },
      {
        id: 'gradient-frame',
        name: 'Gradient Frame',
        url: 'https://i.imgur.com/2345678.png',
        css: `
          background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          border-radius: 12px;
          padding: 20px;
        `,
        tags: ['gradient', 'modern', 'frame']
      }
    ],
    tags: ['frames', 'minimal', 'clean']
  },
  {
    id: 'gaming-overlays',
    type: 'overlay',
    name: 'Gaming Overlays',
    items: [
      {
        id: 'esports-frame',
        name: 'Esports Frame',
        url: 'https://i.imgur.com/3456789.png',
        css: `
          border: 3px solid rgba(255, 0, 0, 0.3);
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
          border-radius: 4px;
          padding: 12px;
        `,
        tags: ['gaming', 'esports', 'frame']
      }
    ],
    tags: ['gaming', 'esports', 'stream']
  }
];