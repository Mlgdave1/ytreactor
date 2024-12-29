export interface Font {
  id: string;
  name: string;
  url: string;
  category: 'sans-serif' | 'serif' | 'monospace';
  weights: number[];
}

export interface TemplateElementType {
  id: string;
  type: 'text' | 'lower-third' | 'logo' | 'graphic';
  content: string;
  position: {
    x: number;
    y: number;
  };
  style: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number | string;
    color?: string;
    backgroundColor?: string;
    padding?: string | number;
    borderRadius?: number;
    width?: number;
    height?: number;
    fontStyle?: string;
    textShadow?: string;
    minWidth?: number;
    display?: string;
    alignItems?: string;
    justifyContent?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
  };
  graphicUrl?: string;
}

export interface Template {
  id: string;
  name: string;
  elements: TemplateElementType[];
  createdAt: number;
  updatedAt: number;
}