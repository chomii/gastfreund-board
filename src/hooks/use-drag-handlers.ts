import { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useCallback } from 'react';

export const useDragHandlers = (
  updateColumns: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void,
) => {
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;
      const activeId = active.id;
      const overId = over.id;
      if (activeId !== overId) {
        updateColumns(activeId, overId);
      }
    },
    [updateColumns],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      if (active.id !== over.id) {
        updateColumns(active.id, over.id);
      }
    },
    [updateColumns],
  );

  return { handleDragOver, handleDragEnd };
};
