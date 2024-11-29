import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="container h-dvh mx-auto">{children}</div>;
};
