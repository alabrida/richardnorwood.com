import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

export function Container({
    children,
    className = '',
    as: Component = 'div'
}: ContainerProps) {
    return (
        <Component className={`container ${className}`}>
            {children}
        </Component>
    );
}
