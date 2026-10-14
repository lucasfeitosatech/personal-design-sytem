import type { AIActionContract, AIPanelContract } from '@lucasfeitosatech/design-core';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import styles from './AIPanel.module.css';

export type AIPanelProps = AIPanelContract;
export type AIActionProps = AIActionContract;

/**
 * The quiet control that asks for a generation: a small ring and a word, in the accent, never
 * filled. It keeps the 44 pt target through padding rather than through a background, so it does
 * not read as a button competing with the section's own. `loading` blocks interaction and
 * announces busy, like any other control in the system.
 */
export function AIAction({ label, onPress, loading = false, disabled = false }: AIActionProps) {
  return (
    <button type="button" className={styles.action} disabled={disabled || loading} aria-busy={loading || undefined} onClick={onPress}>
      <span className={styles.dot} aria-hidden="true" />
      <Text size="md" weight="medium" tone="accent">
        {label}
      </Text>
    </button>
  );
}

/**
 * Generated text, in the three shapes it can take. `unavailable` is drawn dashed and says so in
 * words: a provider that is not answering is a state of this panel and never an error on the
 * screen around it, which keeps writing possible while the model is down.
 */
export function AIPanel({ state = 'ready', title, meta, busyLabel = 'Gerando…', children }: AIPanelProps) {
  if (state === 'loading') {
    return (
      <div className={styles.panel} aria-busy="true">
        <span className={styles.busy}>
          <Spinner label={busyLabel} size="sm" />
          {/* The spinner already announces it; hearing the same sentence twice is not more informative. */}
          <Text as="span" size="sm" tone="secondary" aria-hidden="true">
            {busyLabel}
          </Text>
        </span>
        <Skeleton width="90%" height={8} />
        <Skeleton width="70%" height={8} />
      </div>
    );
  }

  if (state === 'unavailable') {
    return (
      <div className={[styles.panel, styles.dashed].join(' ')} role="alert">
        <span className={styles.busy}>
          <span className={styles.exclaim} aria-hidden="true">
            !
          </span>
          <Text as="span" size="sm" tone="secondary">
            {children}
          </Text>
        </span>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {title || meta ? (
        <div className={styles.header}>
          <Text as="span" size="xs" tone="tertiary">
            {title}
          </Text>
          {meta ? (
            <Text as="span" size="xs" tone="tertiary" mono>
              {meta}
            </Text>
          ) : null}
        </div>
      ) : null}
      {typeof children === 'string' ? (
        <Text as="div" size="base" tone="secondary">
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}
