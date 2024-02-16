
import { cn } from '@/functions/cn';
import React, { ReactNode } from 'react';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
    className?: string;
    children: ReactNode;
    fontWeight?: 'light' | 'normal' | 'bold' | 'semibold' | 'extrabold';
    wrapper?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
    color?: 'dark' | 'light';
}

const Typography: React.FC<TypographyProps> = ({ variant, children, className, fontWeight, wrapper, color }) => {
    const Tag = wrapper || variant;

    let defaultClasses = '';
    switch (variant) {
        case 'h1':
            defaultClasses = 'text-5xl md:text-6xl lg:text-7xl font-bold';
            break;
        case 'h2':
            defaultClasses = 'text-4xl md:text-5xl lg:text-6xl font-semibold';
            break;
        case 'h3':
            defaultClasses = 'text-3xl lg:text-4xl font-semibold';
            break;
        case 'h4':
            defaultClasses = 'text-2xl font-semibold';
            break;
        case 'h5':
            defaultClasses = 'text-xl font-semibold';
            break;
        case 'h6':
            defaultClasses = 'text-lg font-semibold';
            break;
        case 'p':
            defaultClasses = 'text-base';
            break;
        case 'small':
            defaultClasses = 'text-xs';
            break;
        default:
            break;
    }

    switch (fontWeight) {
        case 'light':
            defaultClasses += ' font-light';
            break;
        case 'normal':
            defaultClasses += ' font-normal';
            break;
        case 'bold':
            defaultClasses += ' font-bold';
            break;
        case 'semibold':
            defaultClasses += ' font-semibold';
            break;
        case 'extrabold':
            defaultClasses += ' font-extrabold';
            break;
        default:
            break;
    }

    switch (color) {
        case 'dark':
            defaultClasses += ' text-neutral-900';
            break;
        case 'light':
            defaultClasses += ' text-neutral-100';
            break;
        default:
            break;
    }

    const mergedClasses = cn(defaultClasses, className);
    return <Tag className={mergedClasses}>{children}</Tag>;
};

export default Typography;