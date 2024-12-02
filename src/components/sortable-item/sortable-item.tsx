import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo, PropsWithChildren } from 'react';

interface SortableItemProps extends PropsWithChildren {
  id: UniqueIdentifier;
}

export const SortableItem = memo(({ children, id }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
      <div></div>
    </div>
  );
});
