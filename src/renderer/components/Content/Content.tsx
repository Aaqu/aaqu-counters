import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <main className="w-full border-y border-r border-slate-300 rounded-r-lg">
      {children}
    </main>
  );
};
