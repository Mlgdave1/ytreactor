import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ResizableBox } from 'react-resizable';
import { TemplateElementType } from '../../types/template';
import { useTemplateStore } from '../../store/templateStore';
import { GripHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import 'react-resizable/css/styles.css';

interface TemplateElementProps {
  element: TemplateElementType;
  className?: string;
}

export const TemplateElement: React.FC<TemplateElementProps> = ({ element, className }) => {
  const { selectedElement, setSelectedElement, updateElement } = useTemplateStore();
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.position.x,
    top: element.position.y,
    transform: CSS.Transform.toString(transform),
    ...element.style,
    cursor: 'move',
  };

  const handleResize = (e: any, { size }: { size: { width: number; height: number } }) => {
    updateElement(element.id, {
      style: {
        ...element.style,
        width: size.width,
        height: size.height,
      },
    });
  };

  const content = (
    <>
      {element.type === 'text' && (
        <div>{element.content}</div>
      )}
      
      {element.type === 'lower-third' && (
        <div className="bg-black/80 text-white px-6 py-3 rounded">
          {element.content}
        </div>
      )}
      
      {element.type === 'logo' && (
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white">
          {element.content}
        </div>
      )}

      {element.type === 'graphic' && element.graphicUrl && (
        <img 
          src={element.graphicUrl} 
          alt={element.content}
          className="w-full h-full object-contain"
          draggable={false}
        />
      )}

      <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[#272727] px-2 py-1 rounded-md flex items-center gap-2">
        <GripHorizontal size={16} className="text-gray-400" />
        <span className="text-xs text-gray-400">{element.type}</span>
      </div>
    </>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'template-element group',
        selectedElement === element.id && 'selected',
        className
      )}
      onClick={() => setSelectedElement(element.id)}
      {...attributes}
      {...listeners}
    >
      {element.type === 'graphic' ? (
        <ResizableBox
          width={element.style.width || 200}
          height={element.style.height || 200}
          onResize={handleResize}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
          minConstraints={[100, 100]}
          maxConstraints={[800, 800]}
          lockAspectRatio={true}
        >
          {content}
        </ResizableBox>
      ) : (
        content
      )}
    </div>
  );
};