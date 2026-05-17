import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  to?: string;
  className?: string;
  goldEdge?: boolean;
  as?: 'div' | 'article';
  style?: CSSProperties;
}

/** Soft-shadow card with hover lift; optionally a router link + gold edge. */
export function Card({
  children,
  to,
  className = '',
  goldEdge = false,
  as = 'div',
  style,
}: CardProps) {
  const cls = `${styles.card} ${goldEdge ? styles.gold : ''} ${
    to ? styles.interactive : ''
  } ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  const Tag = as;
  return (
    <Tag className={cls} style={style}>
      {children}
    </Tag>
  );
}
