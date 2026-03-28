import { type ReactNode } from 'react';

type ContainerVariant = 'default' | 'narrow' | 'wide';

interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

const maxWidths: Record<ContainerVariant, string> = {
  default: 'var(--container-max)',
  narrow: 'var(--container-narrow)',
  wide: 'var(--container-wide)',
};

export default function Container({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={className}
      style={{
        width: '100%',
        maxWidth: maxWidths[variant],
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'var(--space-4)',
        paddingRight: 'var(--space-4)',
      }}
    >
      {children}
    </Tag>
  );
}
