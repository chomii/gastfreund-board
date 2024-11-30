import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container h-dvh mx-auto py-4 flex justify-center">
      {children}
    </div>
  );
};
