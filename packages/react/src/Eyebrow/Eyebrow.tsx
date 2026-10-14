import type { EyebrowContract } from '@lucasfeitosatech/design-core';
import type { HTMLAttributes } from 'react';
import styles from './Eyebrow.module.css';

export type EyebrowProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & EyebrowContract;

/** Mono, uppercase, tracked out: names the page or block before its title (lcsfeitosa.com). */
export function Eyebrow({ index, dot = false, className, children, ...rest }: EyebrowProps) {
  return (
    <p className={[styles.eyebrow, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
      {index ? <span className={styles.index}>{index} /</span> : null}
      <span>{children}</span>
    </p>
  );
}
