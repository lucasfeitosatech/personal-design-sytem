import type { ReactNode } from 'react';
import type { ButtonVariant } from './button';

export type ModalAction = {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  onPress?: () => void;
};

/**
 * A decision that has to be made before continuing. Not for information the person can read in
 * place: a modal that only informs is a dialog people close without reading.
 *
 * Web: a centred dialog over the scrim, actions on the right. Device: a bottom sheet with a drag
 * handle, actions stacked full width with the primary above the secondary, because a thumb reaches
 * the bottom of the screen and not the top right. Escape, the scrim and the secondary action all
 * close it, and focus returns to whatever opened it.
 */
export type ModalContract = {
  open: boolean;
  title: string;
  body?: ReactNode;
  primaryAction: ModalAction;
  secondaryAction?: ModalAction;
  onClose: () => void;
  /** Destructive. Announced as an alert dialog, and focus starts on the safe action. */
  alert?: boolean;
};

export const TOAST_TONES = ['default', 'error'] as const;
export type ToastTone = (typeof TOAST_TONES)[number];

/**
 * A short confirmation, usually with a way to undo. An error stays until dismissed: a message that
 * disappears on its own is one the person may never have read.
 */
export type ToastContract = {
  message: string;
  tone?: ToastTone;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  dismissLabel?: string;
};

/** Milliseconds before a default toast dismisses itself. Longer when there is an action to notice. */
export const TOAST_TIMEOUT = { plain: 6000, withAction: 10_000 } as const;

/** `null` means it never dismisses itself, which is the rule for errors. */
export function toastTimeout(tone: ToastTone, hasAction: boolean): number | null {
  if (tone === 'error') return null;
  return hasAction ? TOAST_TIMEOUT.withAction : TOAST_TIMEOUT.plain;
}
