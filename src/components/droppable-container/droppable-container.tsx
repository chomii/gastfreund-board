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
    <ul ref={setNodeRef} className="list-none flex flex-col gap-4 mt-4 flex-1">
      {children}
    </ul>
  );
}
