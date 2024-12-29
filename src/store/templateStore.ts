import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TemplateElementType } from '../types/template';

interface Template {
  id: string;
  name: string;
  elements: TemplateElementType[];
  youtubePlayer?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  createdAt: number;
  updatedAt: number;
}

interface TemplateState {
  elements: TemplateElementType[];
  selectedElement: string | null;
  templates: Template[];
  youtubePlayer: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  addElement: (element: TemplateElementType) => void;
  updateElement: (id: string, updates: Partial<TemplateElementType>) => void;
  updateElementPosition: (id: string, position: { x: number; y: number }) => void;
  setSelectedElement: (id: string | null) => void;
  loadDefaultTemplate: () => void;
  saveTemplate: (name: string) => void;
  loadTemplate: (templateId: string) => void;
  updateYouTubePlayer: (updates: Partial<{
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>) => void;
}

const defaultTemplate: TemplateElementType[] = [
  {
    id: 'lower-third',
    type: 'lower-third',
    content: 'Your Name • Channel',
    position: { x: 40, y: 400 },
    style: {
      fontSize: 24,
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '12px 24px',
      borderRadius: 8,
      minWidth: 300,
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
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
  },
  {
    id: 'logo',
    type: 'logo',
    content: 'Logo',
    position: { x: 500, y: 40 },
    style: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
    },
  },
];

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      elements: [],
      selectedElement: null,
      templates: [],
      youtubePlayer: {
        position: { x: 520, y: 20 },
        size: { width: 320, height: 180 },
      },

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

      updateElementPosition: (id, position) =>
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, position } : el
          ),
        })),

      setSelectedElement: (id) =>
        set({ selectedElement: id }),

      loadDefaultTemplate: () =>
        set({ elements: defaultTemplate }),

      saveTemplate: (name) => {
        const { elements, youtubePlayer } = get();
        const template: Template = {
          id: `template-${Date.now()}`,
          name,
          elements,
          youtubePlayer,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          templates: [...state.templates, template],
        }));

        return template.id;
      },

      loadTemplate: (templateId) => {
        const template = get().templates.find((t) => t.id === templateId);
        if (template) {
          set({
            elements: template.elements,
            youtubePlayer: template.youtubePlayer || {
              position: { x: 520, y: 20 },
              size: { width: 320, height: 180 },
            },
          });
        }
      },

      updateYouTubePlayer: (updates) =>
        set((state) => ({
          youtubePlayer: {
            ...state.youtubePlayer,
            ...updates,
          },
        })),
    }),
    {
      name: 'template-storage',
      partialize: (state) => ({
        templates: state.templates,
      }),
    }
  )
);