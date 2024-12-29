export interface GraphicAsset {
  id: string;
  name: string;
  category: string;
  url: string;
  thumbnail: string;
  tags: string[];
  style?: {
    width?: number;
    height?: number;
    filter?: string;
    ratio?: number; // For maintaining aspect ratio when scaling
    minWidth?: number;
    maxWidth?: number;
  };
}

export interface GraphicCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface GraphicDimensions {
  width: number;
  height: number;
  ratio: number;
}