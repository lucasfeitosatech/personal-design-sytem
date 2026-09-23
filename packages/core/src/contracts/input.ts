import type { BaseSize } from './base';

/**
 * Text entry. The value arrives as `event.target.value` on the web and `onChangeText` on a device,
 * so the binding is never shared; the contract, the states and the validation are.
 */
export const INPUT_MODES = ['text', 'numeric', 'decimal', 'email', 'tel', 'url', 'search'] as const;
export type InputMode = (typeof INPUT_MODES)[number];

export type TextFieldContract = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: BaseSize;
  /** Hides the entry and asks the platform for secure input. */
  secret?: boolean;
  /** Which keyboard to raise. `numeric` and `decimal` differ on phones. */
  mode?: InputMode;
  maxLength?: number;
  readOnly?: boolean;
  /** Figures and codes read better in mono. */
  mono?: boolean;
};

/** Minimum height per size, in points, before the touch-target floor is applied. */
export const INPUT_MIN_HEIGHT: Record<BaseSize, number> = { sm: 32, md: 38 };
