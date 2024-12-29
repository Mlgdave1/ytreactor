export interface OverlayElement {
  id: string;
  type: 'text' | 'image' | 'lower-third';
  content: string;
  position: { x: number; y: number };
  style: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    opacity?: number;
    width?: number;
    height?: number;
    borderRadius?: number;
    padding?: number;
  };
}

export interface LowerThird {
  id: string;
  title: string;
  subtitle?: string;
  style: {
    backgroundColor: string;
    textColor: string;
    titleSize: number;
    subtitleSize: number;
    animation: 'slide-left' | 'fade' | 'none';
  };
}