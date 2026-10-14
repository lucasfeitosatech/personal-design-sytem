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
 * dialog starts focus on the safe action, so Enter does not confirm the deletion; any other dialog
 * whose body holds a field starts on that field.
 */
export function Modal({ open, title, body, primaryAction, secondaryAction, onClose, alert = false }: ModalProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const secondaryRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  // Read through a ref so a new `onClose` on every parent render does not rerun the effect below:
  // rerunning it returned focus to the opener and refocused the action while someone was typing.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    // A body with a field starts on the field, so the dialog can be answered by typing. An alert
    // still starts on the safe action, whatever its body holds.
    const field = alert ? null : dialogRef.current?.querySelector<HTMLElement>('input:not([type="hidden"]):not(:disabled), select:not(:disabled), textarea:not(:disabled)');
    (field ?? (alert && secondaryRef.current ? secondaryRef.current : primaryRef.current))?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onCloseRef.current();
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
  }, [open, alert]);

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
