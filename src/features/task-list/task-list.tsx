import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { memo } from 'react';

import { Column } from '@/components/column';
import { DroppableContainer } from '@/components/droppable-container';
import { DroppableZone } from '@/components/droppable-zone';
import { SortableItem } from '@/components/sortable-item';
import { Task } from '@/components/task';
import { useKanbanStore } from '@/store/kanban-store';
import { ColumnType, TaskItem } from '@/types';
import { getColumnColor } from '@/util/colors';

interface TaskListProps {
  id: ColumnType;
  title: string;
  items: TaskItem[];
}
export const TaskList = memo(({ id, title, items }: TaskListProps) => {
  const addTask = useKanbanStore((state) => state.addTask);
  return (
    <Column key={id} bgColor={getColumnColor(id)}>
      <Column.Header
        title={title}
        count={items.length}
        onClick={() => addTask(id)}
      />

      <DroppableContainer id={id}>
        <SortableContext
          id={id}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col flex-grow gap-4 flex-1">
            {!items.length && (
              <DroppableZone text="Add task" bgColor={getColumnColor(id)} />
            )}
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <Task id={item.id} text={item.text} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DroppableContainer>
    </Column>
  );
});
