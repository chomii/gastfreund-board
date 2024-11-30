import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ColumnType, TaskItem } from '@/types';

type State = {
  columns: { id: ColumnType; title: string; items: TaskItem[] }[];
};

type Actions = {
  updateColumns: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  addTask: (id: UniqueIdentifier) => void;
  updateTask: (id: UniqueIdentifier, value: string) => void;
  removeTask: (id: UniqueIdentifier) => void;
};

export const useKanbanStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      columns: [
        {
          id: 'column-todo',
          title: 'To Do',
          items: [
            // { id: '1', text: 'Item-todo-1' },
            // { id: '2', text: 'Item-todo-2' },
            // { id: '3', text: 'Item-todo-3' },
          ],
        },
        {
          id: 'column-in-progress',
          title: 'In Progress',
          items: [
            // { id: '4', text: 'Item-progress-1' },
            // { id: '5', text: 'Item-progress-2' },
          ],
        },
        {
          id: 'column-done',
          title: 'Done',
          items: [
            // { id: '6', text: 'Item-done-1' }
          ],
        },
      ],
      updateColumns: (activeId: UniqueIdentifier, overId: UniqueIdentifier) =>
        set((state) => {
          // Finding active column from which we are taking item
          const activeColumn = state.columns.find((col) =>
            col.items.some((item) => item.id === activeId),
          );

          if (!activeColumn) return;
          const activeItemIndex = activeColumn.items.findIndex(
            (item) => item.id === activeId,
          );
          const activeColumnIndex = state.columns.indexOf(activeColumn);

          if (activeItemIndex === -1) return;

          const isTargetEmptyColumn =
            typeof overId === 'string' && overId.includes('column');
          if (isTargetEmptyColumn) {
            const overColumn = state.columns.find((col) => col.id === overId);
            if (!overColumn) return;
            const [movedItem] = activeColumn.items.splice(activeItemIndex, 1);
            overColumn.items.push(movedItem);
          } else {
            const overColumn = state.columns.find((col) =>
              col.items.some((item) => item.id === overId),
            );

            if (!overColumn) return;
            const overItemIndex = overColumn.items.findIndex(
              (item) => item.id === overId,
            );
            const overColumnIndex = state.columns.indexOf(overColumn);

            // Reorder logic
            if (activeColumnIndex === overColumnIndex) {
              const column = state.columns[activeColumnIndex];
              column.items = arrayMove(
                column.items,
                activeItemIndex,
                overItemIndex,
              );
            } else {
              const [movedItem] = activeColumn.items.splice(activeItemIndex, 1);
              overColumn.items.splice(overItemIndex, 0, movedItem);
            }
          }
        }),
      addTask: (id: UniqueIdentifier) =>
        set((state) => {
          const currentColumn = state.columns.find((col) => col.id === id);
          if (!currentColumn) return;
          currentColumn.items.push({ id: Date.now(), text: 'New task' });
        }),
      updateTask: (id: UniqueIdentifier, value: string) =>
        set((state) => {
          const currentColumn = state.columns.find((col) =>
            col.items.some((item) => item.id === id),
          );
          if (!currentColumn) return;
          const currentItem = currentColumn.items.find(
            (item) => item.id === id,
          );
          if (!currentItem) return;
          currentItem.text = value;
        }),
      removeTask: (id: UniqueIdentifier) =>
        set((state) => {
          const currentColumn = state.columns.find((col) =>
            col.items.some((item) => item.id === id),
          );
          console.log({ currentColumn });
          if (!currentColumn) return;
          currentColumn.items = currentColumn.items.filter(
            (el) => el.id !== id,
          );
        }),
    })),
    { name: 'kanban-store' },
  ),
);
