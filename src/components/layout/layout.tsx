import { PropsWithChildren } from 'react';

import { Navbar } from '@/components/navbar';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto px-4 h-dvh flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="font-medium">Gastfreund Board</div>
        <Navbar />
      </header>

      <main className="flex flex-grow">{children}</main>
    </div>
  );
};
