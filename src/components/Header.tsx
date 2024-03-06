import { cn } from '@/functions/cn';
import React from 'react';
import Container from './Container';
import Button from './Button';

interface ContainerProps {
  className?: string;
  bgColor?: string;
  lightText?: boolean;
}

const Header: React.FC<ContainerProps> = ({ className, bgColor, lightText }) => {
  return (
    <div className={cn('sticky top-0 bg-center bg-zinc-100 z-50', className)} >
      <Container className='py-4 flex flex-row justify-between'>

        <Button href='/' className='!pl-0'  color='light'>UV</Button>
        <div className='flex gap-x-2 md:gap-x-4'>
        <Button size='sm' variant='text' color='dark' href='/photography'>Photography</Button>
        <Button size='sm' color='dark' href='https://www.linkedin.com/in/vattiu/' target="_blank">
          Get in touch
        </Button>
        </div>
      </Container>
    </div>
  );
};

export default Header;