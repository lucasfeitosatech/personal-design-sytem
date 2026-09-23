import { toastTimeout, type ToastContract } from '@lucasfeitosatech/design-core';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Text } from '../Text';
import styles from './Toast.module.css';

export type ToastProps = ToastContract;

/**
 * A short confirmation, bottom-left.
 *
 * The timer pauses while the toast is hovered or focused: a message that vanishes while someone is
 * reaching for its undo is worse than no message. An error never dismisses itself, because one that
 * disappears on its own may never have been read.
 */
export function Toast({ message, tone = 'default', actionLabel, onAction, onDismiss, dismissLabel = 'Fechar' }: ToastProps) {
  const timeout = toastTimeout(tone, Boolean(actionLabel));
  const [paused, setPaused] = useState(false);
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;

  useEffect(() => {
    if (timeout === null || paused) return;
    const timer = setTimeout(() => dismiss.current?.(), timeout);
    return () => clearTimeout(timer);
  }, [timeout, paused]);

  return (
    <div
      className={[styles.toast, tone === 'error' ? styles.error : ''].filter(Boolean).join(' ')}
      role={tone === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Text size="md" className={styles.message}>
        {message}
      </Text>
      {actionLabel && onAction ? (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
      {onDismiss ? (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label={dismissLabel}>
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </div>
  );
}

/** Anchors the toasts. One per application, near the root. */
export function ToastRegion({ children }: { children: ReactNode }) {
  return (
    <div className={styles.region} aria-live="polite">
      {children}
    </div>
  );
}
