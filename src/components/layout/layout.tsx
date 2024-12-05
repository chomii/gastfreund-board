import { PropsWithChildren } from 'react';

import { Navbar } from '@/components/navbar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto px-4 overflow-hidden ">
      <header className="p-4 flex justify-between items-center flex-shrink-0">
        <div className="font-medium">Gastfreund Board</div>
        <Navbar />
      </header>

      <ScrollArea className="h-full w-full">
        <div
          style={{
            height: 'calc(100vh - 84px)',
          }}
        >
          {children}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
