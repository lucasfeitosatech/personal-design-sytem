import type { ReactNode } from 'react';

export type ChoiceOption = {
  value: string;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
};

/**
 * One choice out of a few. The whole group carries the label and the error, not each option:
 * a screen reader announces "group label, option 2 of 3", which only works if the group owns it.
 */
export type RadioGroupContract = {
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly ChoiceOption[];
  label: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
  disabled?: boolean;
  /** Lays the options in a row where they fit. Wraps on a narrow screen either way. */
  inline?: boolean;
};
