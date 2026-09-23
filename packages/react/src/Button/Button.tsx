import type { ButtonContract } from '@lucasfeitosatech/design-core';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonContract & {
    /** Decorative element before the label. Never the only carrier of meaning. */
    icon?: ReactNode;
  };

/** Triggers an action. `loading` blocks interaction and announces busy, it is not just a spinner. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', loading = false, block = false, icon, className, children, disabled, type = 'button', ...rest },
  ref,
) {
  const classes = [styles.button, styles[variant], styles[size], block ? styles.block : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <button ref={ref} type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      {icon && !loading ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </button>
  );
});
