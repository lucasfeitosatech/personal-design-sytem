import type { ReactNode } from 'react';

/**
 * Label, hint and error around a control. This is where accessibility lives: the label is bound to
 * the control, the hint and the error are announced, and an error replaces the hint rather than
 * stacking with it.
 */
export type FieldContract = {
  label: string;
  /** Keeps the label for assistive technology only. */
  hideLabel?: boolean;
  hint?: string;
  /** When present, the field is invalid and the message is announced. */
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};
