import type { DividerContract } from '@lucasfeitosatech/design-core';
import styles from './Divider.module.css';

export type DividerProps = DividerContract;

/** A rule. Decorative, so it is hidden from assistive technology. */
export function Divider({ orientation = 'horizontal' }: DividerProps) {
  return <span className={[styles.divider, styles[orientation]].join(' ')} role="presentation" />;
}
