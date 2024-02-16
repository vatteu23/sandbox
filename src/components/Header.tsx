import { cn } from '@/functions/cn';
import React, { ReactNode } from 'react';
import Container from './Container';
import Typography from './Typography';
import Link from 'next/link';
import Button from './Button';

interface ContainerProps {
  className?: string;
  bgColor?: string;
  lightText?: boolean;
}

const Header: React.FC<ContainerProps> = ({ className, bgColor, lightText }) => {
  return (
    <div className={cn('sticky top-0 bg-center py-4', className)} >
      <Container className='py-4 flex flex-row justify-between'>

        <Button href='/' color='light'>UV</Button>

        <Button size='sm' color='dark' href='/about'>
          Get in touch
        </Button>
      </Container>
    </div>
  );
};

export default Header;