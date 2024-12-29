import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useOverlayStore } from '../../store/overlayStore';
import { OverlayElement } from '../OverlayElement';

export const OverlayCanvas: React.FC = () => {
  const { elements, updateElement } = useOverlayStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const element = elements.find(el => el.id === active.id);
    
    if (element) {
      updateElement(element.id, {
        position: {
          x: element.position.x + delta.x,
          y: element.position.y + delta.y,
        },
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {elements.map((element) => (
            <OverlayElement 
              key={element.id} 
              element={element}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};