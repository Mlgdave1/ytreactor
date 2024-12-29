import React from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useOverlayStore } from '../store/overlayStore';
import { OverlayElement } from './OverlayElement';

export const PreviewCanvas: React.FC = () => {
  const { elements, updateElement } = useOverlayStore();
  const sensors = useSensors(useSensor(PointerSensor));

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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="relative w-full h-full">
        {elements.map((element) => (
          <OverlayElement key={element.id} element={element} />
        ))}
      </div>
    </DndContext>
  );
};