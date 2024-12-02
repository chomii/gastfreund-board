import { UniqueIdentifier } from '@dnd-kit/core';

export type Column = { id: ColumnType; title: string; items: TaskItem[] };
export type ColumnType = 'column-todo' | 'column-in-progress' | 'column-done';
export type TaskItem = {
  id: UniqueIdentifier;
  text: string;
};
