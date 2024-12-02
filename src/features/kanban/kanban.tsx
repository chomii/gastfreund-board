import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { ErrorBoundary } from 'react-error-boundary';

import { TaskList } from '@/features/task-list';
import useDebounce from '@/hooks/use-debounce';
import { useDragHandlers } from '@/hooks/use-drag-handlers';
import { useKanbanStore } from '@/store/kanban-store';

export const Kanban = () => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const searchTerm = useKanbanStore((state) => state.searchTerm);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const columns = useKanbanStore((state) => state.columns);
  const updateColumns = useKanbanStore((state) => state.updateColumns);

  const { handleDragOver, handleDragEnd } = useDragHandlers(updateColumns);

  const filteredColumns = columns.map((col) => {
    return {
      ...col,
      items: col.items.filter((item) =>
        item.text.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    };
  });

  return (
    <ErrorBoundary
      fallback={
        <div className="flex w-full justify-center items-center">
          Something went wrong
        </div>
      }
    >
      <section className="flex flex-row gap-4 flex-grow">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
          modifiers={[restrictToWindowEdges]}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {filteredColumns.map((col) => (
            <TaskList
              key={col.id}
              id={col.id}
              title={col.title}
              items={col.items}
            />
          ))}
        </DndContext>
      </section>
    </ErrorBoundary>
  );
};
