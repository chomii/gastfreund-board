import { UniqueIdentifier } from '@dnd-kit/core';
import { XIcon } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useKanbanStore } from '@/store/kanban-store';

export const Task = memo(
  ({ id, text }: { id: UniqueIdentifier; text: string }) => {
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState(() => text);
    const outsideClickRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateTask = useKanbanStore((state) => state.updateTask);
    const removeTask = useKanbanStore((state) => state.removeTask);

    const handleShowInput = useCallback(() => {
      setShowInput((prev) => !prev);
    }, []);
    const handleCloseInput = useCallback(() => {
      setShowInput(false);
    }, []);
    const handleSave = () => {
      updateTask(id, value);
      setShowInput(false);
    };

    useClickOutside(outsideClickRef, handleCloseInput);

    useEffect(() => {
      if (showInput && inputRef.current) {
        inputRef.current.focus();
      }
    }, [showInput]);

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
            aria-label="Delete Task"
          >
            <XIcon />
          </Button>
        </CardHeader>
        {showInput && (
          <>
            <CardContent ref={outsideClickRef}>
              <Label htmlFor="task-input">Task text</Label>
              <Input
                id="task-input"
                ref={inputRef}
                className="p-3 h-10"
                type="text"
                placeholder="Add task"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                Save
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    );
  },
);
