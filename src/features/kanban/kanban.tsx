import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  // DragStartEvent,
  MeasuringStrategy,
  DragOverEvent,
  DragEndEvent,
  // KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  // sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Column } from '@/components/column';
import { DroppableContainer } from '@/components/droppable-container';
import { SortableItem } from '@/components/sortable-item';
import { Task } from '@/components/task';
import { useKanbanStore } from '@/store/kanban-store';

export const Kanban = () => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // }),
  );
  const columns = useKanbanStore((state) => state.columns);
  const updateColumns = useKanbanStore((state) => state.updateColumns);
  const addTask = useKanbanStore((state) => state.addTask);

  // const handleDragStart = (event: DragStartEvent) => {
  //   const { active } = event;
  //   const { id } = active;
  //   console.log({ id });
  // };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      updateColumns(activeId, overId);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      updateColumns(active.id, over.id);
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      // onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row gap-4 flex-1">
        {columns.map((col) => (
          <Column key={col.id}>
            <Column.Header title={col.title} onClick={() => addTask(col.id)} />

            <DroppableContainer id={col.id}>
              <SortableContext
                id={col.id}
                items={col.items}
                strategy={verticalListSortingStrategy}
              >
                {!col.items.length && (
                  <li
                    id={col.id}
                    className="flex-1 p-4 bg-blue-100 flex justify-center items-center rounded-md"
                  >
                    Add items
                  </li>
                )}
                {col.items.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <Task id={item.id} text={item.text} />
                  </SortableItem>
                ))}
              </SortableContext>
            </DroppableContainer>
          </Column>
        ))}
      </div>
    </DndContext>
  );
};
