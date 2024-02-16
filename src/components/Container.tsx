import { cn } from '@/functions/cn';
import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl',className)}>
        {children}
      </div>
  );
};

export default Container;