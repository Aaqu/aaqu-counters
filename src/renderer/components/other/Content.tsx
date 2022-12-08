import { ReactNode } from 'react';
import { ContentTitle } from './ContentTitle';

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return <div className="grid flex-col justify-items-center">{children}</div>;
};
