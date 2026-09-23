import type { CardContract } from '@lucasfeitosatech/design-core';
import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

export type CardProps = HTMLAttributes<HTMLDivElement> & CardContract;

/** A bordered surface. Elevation comes from luminance and a 1px border, never a shadow. */
export function Card({ tone = 'default', flush = false, className, children, ...rest }: CardProps) {
  return (
    <div className={[styles.card, styles[`tone-${tone}`], flush ? styles.flush : '', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
