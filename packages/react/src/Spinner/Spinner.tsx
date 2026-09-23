import type { SpinnerContract } from '@lucasfeitosatech/design-core';
import styles from './Spinner.module.css';

export type SpinnerProps = SpinnerContract;

/** Busy indicator. The label is required and announced; a silent spinner does not exist for a screen reader. */
export function Spinner({ size = 'md', label }: SpinnerProps) {
  return (
    <span className={styles.wrap} role="status">
      <span className={[styles.ring, styles[size]].join(' ')} aria-hidden="true" />
      <span className="ds-visually-hidden">{label}</span>
    </span>
  );
}
