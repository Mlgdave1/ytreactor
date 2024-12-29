import { GraphicAsset } from '../../types/graphics';

export const GRAPHIC_ASSETS: GraphicAsset[] = [
  // Buttons & CTAs
  {
    id: 'subscribe-red',
    name: 'Subscribe Button',
    category: 'buttons',
    url: 'https://imgur.com/U4miQ6X.png',
    thumbnail: 'https://imgur.com/U4miQ6X.png',
    tags: ['subscribe', 'youtube', 'cta', 'button'],
    style: {
      width: 300,
      height: 100,
      ratio: 3,
      minWidth: 150,
      maxWidth: 450
    }
  },
  {
    id: 'like-button',
    name: 'Like Button',
    category: 'buttons',
    url: 'https://imgur.com/like-button.png',
    thumbnail: 'https://imgur.com/like-button.png',
    tags: ['like', 'youtube', 'cta', 'button'],
    style: {
      width: 200,
      height: 80,
      ratio: 2.5,
      minWidth: 120,
      maxWidth: 300
    }
  },
  {
    id: 'notification-bell',
    name: 'Notification Bell',
    category: 'buttons',
    url: 'https://imgur.com/notification-bell.png',
    thumbnail: 'https://imgur.com/notification-bell.png',
    tags: ['notifications', 'youtube', 'bell'],
    style: {
      width: 100,
      height: 100,
      ratio: 1,
      minWidth: 60,
      maxWidth: 200
    }
  }
];