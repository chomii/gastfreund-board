import { PlusIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ColumnProps extends PropsWithChildren {
  bgColor?: string;
}
interface HeaderProps {
  title: string;
  count: number;
  onClick: () => void;
}

export const Column = ({ children, bgColor }: ColumnProps) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-start flex-1 flex-grow p-4 rounded-lg gap-4`,
        bgColor,
      )}
    >
      {children}
    </div>
  );
};

const Header = ({ title, count, onClick }: HeaderProps) => {
  return (
    <Card className={`rounded-xl p-4`}>
      <CardTitle className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-center mb-1">{title}</h3>
          <p className="text-center">{`(${count})`}</p>
        </div>
        <Button onClick={onClick} variant="ghost" size="sm" className="p-0 h-4">
          <PlusIcon />
        </Button>
      </CardTitle>
    </Card>
  );
};

Column.Header = Header;
