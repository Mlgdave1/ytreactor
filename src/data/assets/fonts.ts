import { Font } from '../../types/assets';

export const FONTS: Font[] = [
  {
    id: 'inter',
    name: 'Inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    category: 'sans-serif',
    weights: [400, 500, 600, 700],
    tags: ['modern', 'clean', 'professional']
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
    category: 'sans-serif',
    weights: [400, 500, 600, 700],
    tags: ['elegant', 'modern', 'versatile']
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
    category: 'serif',
    weights: [400, 600, 700],
    tags: ['elegant', 'classic', 'editorial']
  },
  {
    id: 'fira-code',
    name: 'Fira Code',
    url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap',
    category: 'monospace',
    weights: [400, 500],
    tags: ['code', 'technical', 'clean']
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    url: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
    category: 'display',
    weights: [400],
    tags: ['bold', 'impact', 'headlines']
  }
];