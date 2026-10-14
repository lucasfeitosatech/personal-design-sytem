import type { BannerContract } from '@lucasfeitosatech/design-core';
import { Text } from '../Text';
import styles from './Banner.module.css';

export type BannerProps = BannerContract;

/**
 * A standing condition, pinned in the content: no connection, an unsent draft, a rejected form. It
 * has no timer and no close control by default — the condition, not the reader, decides when it
 * goes. It is a status, and a reader meets it once; the danger tone is an alert, because that one
 * is worth interrupting for.
 */
export function Banner({ tone = 'warning', title, body, actions, icon }: BannerProps) {
  return (
    <div className={[styles.banner, styles[`tone-${tone}`]].join(' ')} role="status">
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className={styles.main}>
        <Text as="div" size="md" weight="medium">
          {title}
        </Text>
        {typeof body === 'string' ? (
          <Text as="div" size="sm" tone="secondary">
            {body}
          </Text>
        ) : (
          body
        )}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  );
}
