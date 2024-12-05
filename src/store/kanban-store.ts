import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Column } from '@/types';

type State = {
  searchTerm: string;
  columns: Column[];
};

type Actions = {
  setSearchTerm: (val: string) => void;
  updateColumns: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  addTask: (id: UniqueIdentifier) => void;
  updateTask: (id: UniqueIdentifier, value: string) => void;
  removeTask: (id: UniqueIdentifier) => void;
};

export const useKanbanStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      searchTerm: '',
      columns: [
        {
          id: 'column-todo',
          title: 'To Do',
          items: [],
        },
        {
          id: 'column-in-progress',
          title: 'In Progress',
          items: [],
        },
        {
          id: 'column-done',
          title: 'Done',
          items: [],
        },
      ],
      setSearchTerm: (val: string) =>
        set((state) => {
          state.searchTerm = val;
        }),
      updateColumns: (activeId: UniqueIdentifier, overId: UniqueIdentifier) =>
        set((state) => {
          // we are finding active column from which we are taking item
          const activeColumn = state.columns.find((col) =>
            col.items.some((item) => item.id === activeId),
          );

          if (!activeColumn) return;
          // we are finding active item that we are dragging
          const activeItemIndex = activeColumn.items.findIndex(
            (item) => item.id === activeId,
          );
          const activeColumnIndex = state.columns.indexOf(activeColumn);

          if (activeItemIndex === -1) return;

          // case where we are dragging over empty column
          const isTargetEmptyColumn =
            typeof overId === 'string' && overId.includes('column');

          if (isTargetEmptyColumn) {
            const overColumn = state.columns.find((col) => col.id === overId);
            if (!overColumn) return;
            const [movedItem] = activeColumn.items.splice(activeItemIndex, 1);
            overColumn.items.push(movedItem);
          } else {
            // we are finding column that contains target item
            const overColumn = state.columns.find((col) =>
              col.items.some((item) => item.id === overId),
            );

            if (!overColumn) return;
            const overItemIndex = overColumn.items.findIndex(
              (item) => item.id === overId,
            );
            // we are finding target item that we are dragging over to
            const overColumnIndex = state.columns.indexOf(overColumn);

            // switching places for active and target items
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
          currentColumn.items.push({ id: uuidv4(), text: 'New task' });
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

          if (!currentColumn) return;
          currentColumn.items = currentColumn.items.filter(
            (el) => el.id !== id,
          );
        }),
    })),
    { name: 'kanban-store' },
  ),
);
