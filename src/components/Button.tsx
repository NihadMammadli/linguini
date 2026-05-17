import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'ghost' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type LinkProps = BaseProps & {
  as: 'link';
  to: string;
  children: React.ReactNode;
};

function cx(variant: Variant, size: Size, fullWidth?: boolean) {
  return [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth, className, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      className={`${cx(variant, size, fullWidth)} ${className ?? ''}`}
      {...rest}
    />
  ),
);
Button.displayName = 'Button';

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth,
  to,
  children,
}: LinkProps) {
  return (
    <Link to={to} className={cx(variant, size, fullWidth)}>
      {children}
    </Link>
  );
}
