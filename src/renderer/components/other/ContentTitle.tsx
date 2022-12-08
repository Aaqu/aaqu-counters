import { ReactNode } from 'react';

interface ContentTitleProps {
  children: ReactNode;
}

export const ContentTitle = ({ children }: ContentTitleProps) => {
  return (
    <div className="pl-2 py-2 w-full border-b border-stone-300 rounded-tr-lg">
      {children}
    </div>
  );
};
