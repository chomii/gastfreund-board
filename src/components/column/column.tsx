import { PropsWithChildren } from 'react';

import { IconPlus } from '@/assets/icons';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  onClick: () => void;
}

export const Column = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`flex flex-col justify-start flex-1 p-4 rounded-lg bg-blue-50`}
    >
      {children}
    </div>
  );
};

const Header = ({ title, onClick }: HeaderProps) => {
  return (
    <div className={`rounded-md p-4 bg-blue-100`}>
      <div className="flex justify-center items-center">
        <h3 className="flex-1 text-center">{title}</h3>
        <Button onClick={onClick} variant="ghost" size="sm" className="p-0 h-4">
          <IconPlus />
        </Button>
      </div>
    </div>
  );
};

Column.Header = Header;
