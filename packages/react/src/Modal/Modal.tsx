import type { ModalContract } from '@lucasfeitosatech/design-core';
import { useEffect, useId, useRef } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import styles from './Modal.module.css';

export type ModalProps = ModalContract;

/**
 * A centred dialog over the scrim.
 *
 * Focus is trapped while it is open and returns to whatever opened it on close, because a dialog
 * that leaks focus back to the page leaves a keyboard user lost behind the scrim. A destructive
 * dialog starts focus on the safe action, so Enter does not confirm the deletion.
 */
export function Modal({ open, title, body, primaryAction, secondaryAction, onClose, alert = false }: ModalProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const secondaryRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    (alert && secondaryRef.current ? secondaryRef.current : primaryRef.current)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener.current?.focus();
    };
  }, [open, alert, onClose]);

  if (!open) return null;

  return (
    <div className={styles.scrim} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        role={alert ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={body ? `${id}-body` : undefined}
        className={styles.dialog}
      >
        <Text as="h2" id={`${id}-title`} size="lg" weight="semibold">
          {title}
        </Text>
        {body ? (
          <div id={`${id}-body`} className={styles.body}>
            {typeof body === 'string' ? (
              <Text as="p" size="base" tone="secondary">
                {body}
              </Text>
            ) : (
              body
            )}
          </div>
        ) : null}
        <div className={styles.actions}>
          {secondaryAction ? (
            <Button ref={secondaryRef} variant="ghost" onClick={secondaryAction.onPress ?? onClose} loading={secondaryAction.loading}>
              {secondaryAction.label}
            </Button>
          ) : null}
          <Button ref={primaryRef} variant={primaryAction.variant ?? (alert ? 'danger' : 'primary')} onClick={primaryAction.onPress} loading={primaryAction.loading}>
            {primaryAction.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
