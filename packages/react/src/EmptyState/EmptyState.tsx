import type { EmptyStateContract } from '@lucasfeitosatech/design-core';
import { Text } from '../Text';
import styles from './EmptyState.module.css';

export type EmptyStateProps = EmptyStateContract;

/** Nothing to show, or something failed. Always offers one way out. */
export function EmptyState({ title, body, tone = 'default', actions }: EmptyStateProps) {
  return (
    <div className={[styles.empty, tone === 'error' ? styles.error : ''].filter(Boolean).join(' ')} role={tone === 'error' ? 'alert' : undefined}>
      <Text as="p" size="md" weight="medium" tone={tone === 'error' ? 'danger' : 'default'}>
        {title}
      </Text>
      {body ? (
        <Text as="p" size="sm" tone="secondary">
          {body}
        </Text>
      ) : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
