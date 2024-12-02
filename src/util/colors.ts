const columnColors: Record<string, string> = {
  'column-todo': 'bg-blue-50',
  'column-in-progress': 'bg-red-50',
  'column-done': 'bg-slate-50',
};
export const getColumnColor = (columnId: string): string =>
  columnColors[columnId] || 'bg-white';
