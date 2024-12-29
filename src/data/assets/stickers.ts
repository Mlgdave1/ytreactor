import { Asset } from '../../types/assets';

export const STICKERS: Asset[] = [
  {
    id: 'reaction-pack-1',
    type: 'sticker',
    name: 'Basic Reactions',
    items: [
      {
        id: 'wow',
        name: 'Wow',
        url: 'https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif',
        tags: ['reaction', 'surprise', 'animated']
      },
      {
        id: 'thinking',
        name: 'Thinking',
        url: 'https://media.giphy.com/media/TPl5N4Ci49ZQY/giphy.gif',
        tags: ['reaction', 'thinking', 'animated']
      },
      {
        id: 'laugh',
        name: 'Laugh',
        url: 'https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
        tags: ['reaction', 'laugh', 'animated']
      }
    ],
    tags: ['reactions', 'emotions', 'basic']
  },
  {
    id: 'gaming-emotes',
    type: 'sticker',
    name: 'Gaming Emotes',
    items: [
      {
        id: 'gg',
        name: 'GG',
        url: 'https://media.giphy.com/media/l0HlL6eH6eEew5FpS/giphy.gif',
        tags: ['gaming', 'gg', 'animated']
      },
      {
        id: 'rage',
        name: 'Rage Quit',
        url: 'https://media.giphy.com/media/ZdrUuSEC0LygaFXtNT/giphy.gif',
        tags: ['gaming', 'rage', 'animated']
      }
    ],
    tags: ['gaming', 'emotes', 'reactions']
  }
];