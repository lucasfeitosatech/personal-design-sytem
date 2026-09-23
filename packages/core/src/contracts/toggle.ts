import type { ReactNode } from 'react';

/**
 * A switch commits immediately: flipping it performs the action, there is no confirm step.
 * Use a checkbox when the value is part of a form that gets submitted.
 */
export type SwitchContract = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Always present. A switch with no label is unreadable to a screen reader. */
  label: string;
  /** One line explaining the consequence, not repeating the label. */
  description?: ReactNode;
  disabled?: boolean;
};

/** `indeterminate` is a parent whose children disagree. It is a display state: clicking resolves it to true. */
export type CheckedState = boolean | 'indeterminate';

export type CheckboxContract = {
  checked: CheckedState;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
  /** Announced, and paints the control. */
  error?: string;
};
