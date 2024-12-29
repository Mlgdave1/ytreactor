import { Asset } from '../../types/assets';

export const EFFECTS: Asset[] = [
  {
    id: 'transitions',
    type: 'effect',
    name: 'Transitions',
    items: [
      {
        id: 'fade',
        name: 'Fade',
        css: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `,
        duration: 500,
        tags: ['transition', 'fade', 'smooth']
      },
      {
        id: 'slide-up',
        name: 'Slide Up',
        css: `
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `,
        duration: 600,
        tags: ['transition', 'slide', 'dynamic']
      }
    ],
    tags: ['transitions', 'animations', 'effects']
  },
  {
    id: 'text-effects',
    type: 'effect',
    name: 'Text Effects',
    items: [
      {
        id: 'glow',
        name: 'Glow',
        css: `text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);`,
        tags: ['text', 'glow', 'highlight']
      },
      {
        id: 'neon',
        name: 'Neon',
        css: `text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;`,
        tags: ['text', 'neon', 'bright']
      }
    ],
    tags: ['text', 'effects', 'styles']
  }
];