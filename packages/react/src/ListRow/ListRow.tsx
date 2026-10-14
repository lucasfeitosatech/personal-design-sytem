import { type ListRowContract } from '@lucasfeitosatech/design-core';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import styles from './ListRow.module.css';

export type ListRowProps = ListRowContract;
export type ListProps = { children?: ReactNode };

/**
 * A row that leads somewhere: injected icon, label, mono meta, chevron. The whole row is the
 * target, which is why the minimum height is above the 44 pt rule and not equal to it.
 *
 * A row with an `onPress` is a button; without one it is plain content, because a row that cannot
 * be pressed must not pretend to be. The chevron and the icon are decoration: the reader meets the
 * label, the detail and the figure, in that order.
 */
export function ListRow({ label, icon, meta, detail, trailing, onPress, disabled = false }: ListRowProps) {
  // A chevron says the row leads somewhere, so it is the default only for a row that does.
  const end = trailing ?? (onPress ? 'chevron' : 'none');
  // A control passed as `trailing` cannot sit inside the row's button: nested buttons are invalid
  // and its click would also press the row. It goes beside the button instead.
  const custom = end !== 'chevron' && end !== 'none';
  const content = (
    <>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.main}>
        <Text size="base" lines={2}>
          {label}
        </Text>
        {detail ? (
          <Text size="xs" tone="secondary" lines={2}>
            {detail}
          </Text>
        ) : null}
      </span>
      {meta !== undefined && meta !== null ? (
        <Text size="xs" tone="tertiary" mono className={styles.meta}>
          {meta}
        </Text>
      ) : null}
      {custom ? null : trailingNode(end)}
    </>
  );

  if (onPress) {
    const button = (
      <button type="button" className={[styles.row, styles.interactive].join(' ')} disabled={disabled} onClick={onPress}>
        {content}
      </button>
    );
    if (!custom) return button;
    return (
      <div className={styles.split}>
        {button}
        <span className={styles.trailing}>{end}</span>
      </div>
    );
  }
  return (
    <div className={[styles.row, disabled ? styles.disabled : ''].filter(Boolean).join(' ')} aria-disabled={disabled || undefined}>
      {content}
      {custom ? <span className={styles.trailing}>{end}</span> : null}
    </div>
  );
}

function trailingNode(trailing: ListRowProps['trailing']): ReactNode {
  if (trailing === 'none') return null;
  if (trailing === 'chevron' || trailing === undefined) {
    return (
      <span className={styles.chevron} aria-hidden="true">
        ›
      </span>
    );
  }
  return trailing;
}

/**
 * The list the rows sit in: it draws the hairline between them, so no row has to know whether it
 * is the first one. Rows inside a flush Card, as every screen of the product uses them.
 */
export function List({ children }: ListProps) {
  return <div className={styles.list}>{children}</div>;
}
