import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

interface DroppableContainerProps extends PropsWithChildren {
  id: UniqueIdentifier;
}
export function DroppableContainer({ children, id }: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-grow" ref={setNodeRef}>
      {children}
    </div>
  );
}
