export interface AssetCategory {
  id: string;
  name: string;
  description: string;
}

export interface Asset {
  id: string;
  type: 'font' | 'sticker' | 'overlay' | 'effect';
  name: string;
  url: string;
  thumbnail?: string;
  tags: string[];
  category: string;
  template?: {
    backgroundColor?: string;
    textColor?: string;
    font?: string;
    animation?: string;
    css?: string;
  };
}

export interface FontCombination {
  id: string;
  name: string;
  heading: string;
  body: string;
  tags: string[];
}

export interface AnimationPreset {
  id: string;
  name: string;
  css: string;
  tags: string[];
}