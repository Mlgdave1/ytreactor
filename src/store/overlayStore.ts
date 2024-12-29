import { create } from 'zustand';
import { OverlayElement } from '../types/overlay';

interface OverlayState {
  elements: OverlayElement[];
  selectedElement: string | null;
  addElement: (element: OverlayElement) => void;
  updateElement: (id: string, updates: Partial<OverlayElement>) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (id: string | null) => void;
  loadDefaultTemplate: () => void;
}

const defaultTemplate: OverlayElement[] = [
  {
    id: 'lower-third',
    type: 'lower-third',
    content: 'Your Name • Channel',
    position: { x: 40, y: 400 },
    style: {
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 16,
      borderRadius: 8,
      width: 300,
    },
  },
  {
    id: 'title',
    type: 'text',
    content: 'Video Title',
    position: { x: 40, y: 40 },
    style: {
      fontSize: 32,
      color: '#ffffff',
      fontWeight: 'bold',
    },
  },
  {
    id: 'logo',
    type: 'text',
    content: 'LOGO',
    position: { x: 500, y: 40 },
    style: {
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      width: 80,
      height: 80,
      borderRadius: 40,
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
];

export const useOverlayStore = create<OverlayState>((set) => ({
  elements: [],
  selectedElement: null,

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
      selectedElement: element.id,
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElement: state.selectedElement === id ? null : state.selectedElement,
    })),

  setSelectedElement: (id) =>
    set({ selectedElement: id }),

  loadDefaultTemplate: () =>
    set({ elements: defaultTemplate }),
}));