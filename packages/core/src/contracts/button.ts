import type { BaseSize } from './base';

export const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ['sm', 'md'] as const;
export type ButtonSize = BaseSize;

/**
 * What a Button means in this system, on every platform. A renderer adds its own platform props
 * on top (`type="submit"` on the web, `hitSlop` on native); it must not remove or rename these.
 *
 * States every implementation has to cover: default, hovered or pressed, focused, disabled,
 * loading, and the block width. `loading` implies non-interactive, and must be announced.
 */
export type ButtonContract = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Blocks interaction and announces busy. Never merely visual. */
  loading?: boolean;
  /** Fills the available width. */
  block?: boolean;
  disabled?: boolean;
};

/** Minimum height per size, in points. The web reads px, native reads points; the number is the same. */
export const BUTTON_MIN_HEIGHT: Record<ButtonSize, number> = { sm: 32, md: 38 };
