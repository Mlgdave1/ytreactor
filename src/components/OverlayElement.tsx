import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { OverlayElement as OverlayElementType } from '../types/overlay';
import { useOverlayStore } from '../store/overlayStore';

interface OverlayElementProps {
  element: OverlayElementType;
}

export const OverlayElement: React.FC<OverlayElementProps> = ({ element }) => {
  const { updateElement, setSelectedElement } = useOverlayStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.position.x,
    top: element.position.y,
    ...element.style,
    transform: CSS.Translate.toString(transform),
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setSelectedElement(element.id)}
      className="overlay-element"
    >
      {element.content}
    </div>
  );
};