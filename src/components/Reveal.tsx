import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  anim?: 'up' | 'left' | 'right';
  delay?: number; // seconds
  className?: string;
  once?: boolean;
}

/** Wraps content in an IntersectionObserver-driven reveal animation. */
export function Reveal({
  children,
  anim = 'up',
  delay = 0,
  className = '',
  once = true,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ once });
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      data-anim={anim}
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Staggers direct children with an incremental reveal delay. */
export function RevealGroup({
  children,
  step = 0.1,
  className = '',
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
