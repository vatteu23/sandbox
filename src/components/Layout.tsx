import { cn } from '@/functions/cn';
import React, { ReactNode } from 'react';
import Header from './Header';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  lightText?: boolean;
}

const Layout: React.FC<ContainerProps> = ({ children, className }) => {
  return (
     <div className={cn('',className)}>
        <Header/>
         {children}
        
     </div>
  );
};

export default Layout;