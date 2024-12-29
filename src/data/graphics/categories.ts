import { GraphicCategory } from '../../types/graphics';

export const GRAPHIC_CATEGORIES: GraphicCategory[] = [
  {
    id: 'buttons',
    name: 'Buttons & CTAs',
    description: 'Subscribe, like, and social media buttons',
    icon: 'button'
  },
  {
    id: 'callouts',
    name: 'Callouts',
    description: 'Speech bubbles and annotation elements',
    icon: 'message-circle'
  },
  {
    id: 'emotes',
    name: 'Emotes & Reactions',
    description: 'Reaction faces and emoji-style graphics',
    icon: 'smile'
  },
  {
    id: 'frames',
    name: 'Frames & Borders',
    description: 'Decorative frames and borders',
    icon: 'square'
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Platform logos and social icons',
    icon: 'share2'
  }
];