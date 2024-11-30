import { UniqueIdentifier } from '@dnd-kit/core';
import { useRef, useState } from 'react';

import { IconClose } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useKanbanStore } from '@/store/kanban-store';

export const Task = ({ id, text }: { id: UniqueIdentifier; text: string }) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState(() => text);
  const outsideClickRef = useRef(null);

  const updateTask = useKanbanStore((state) => state.updateTask);
  const removeTask = useKanbanStore((state) => state.removeTask);

  const handleShowInput = () => {
    setShowInput((prev) => !prev);
  };
  const handleCloseInput = () => {
    updateTask(id, value);
    setShowInput(false);
  };

  useClickOutside(outsideClickRef, handleCloseInput);
  return (
    <Card className="group" onDoubleClick={handleShowInput}>
      <CardHeader className="relative">
        <CardTitle className="flex-1">{text}</CardTitle>
        <Button
          className="absolute top-3 right-3 p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            removeTask(id);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <IconClose />
        </Button>
      </CardHeader>
      <CardContent ref={outsideClickRef}>
        {showInput && (
          <>
            <label
              htmlFor="task-input"
              className="block mb-2 text-sm font-medium"
            >
              Task text
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              placeholder="Add task"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCloseInput();
                }
              }}
              // prevent dragging when over input field
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </>
        )}
      </CardContent>
      {showInput && (
        <CardFooter>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseInput();
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Save
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
