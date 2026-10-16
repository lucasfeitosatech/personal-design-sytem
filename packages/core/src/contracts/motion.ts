import type { TextTone } from './text';

/**
 * Movement is how the system says "something changed". The tween math is pure and lives here so
 * both renderers settle a number and a bar at the same pace, without re-deriving the curve.
 */

/** How long a number takes to settle on its new value. Long enough to read as change, short enough not to wait for. */
export const NUMBER_TWEEN_MS = 450;

/** A progress bar filling for the first time. */
export const PROGRESS_FILL_MS = 700;

/** Cubic ease-out, the curve every tween in the system uses. */
export function easeOutCubic(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return 1 - (1 - x) ** 3;
}

/** The value `elapsed` ms into a tween from `from` to `to` lasting `duration` ms. */
export function tweenValue(from: number, to: number, elapsed: number, duration: number): number {
  if (duration <= 0) return to;
  return from + (to - from) * easeOutCubic(elapsed / duration);
}

export type AnimatedNumberContract = {
  value: number;
  /** Turns the number into text; the same function formats every frame and the final value. */
  format: (value: number) => string;
  durationMs?: number;
  /** The figure can carry the sign of a balance: a positive tone, not a colour of its own. */
  tone?: TextTone;
};

export const PROGRESS_TONES = ['accent', 'muted', 'danger'] as const;
export type ProgressTone = (typeof PROGRESS_TONES)[number];

export const PROGRESS_SIZES = ['sm', 'md'] as const;
export type ProgressSize = (typeof PROGRESS_SIZES)[number];

/** The one place a progress tone touches a palette key. A renderer reads it; it invents nothing. */
export const PROGRESS_TONE_TOKEN = {
  accent: 'accent',
  muted: 'textTertiary',
  danger: 'overdue',
} as const satisfies Record<ProgressTone, string>;

/** A measured share of something (received of expected, a category of the total). Not a loading indicator. */
export type ProgressBarContract = {
  /** 0..1; values outside are clamped. */
  value: number;
  /** Accessible name, e.g. "Recebido até hoje". */
  label: string;
  /** Accessible value text, e.g. "R$ 8.200,00 de R$ 12.500,00". */
  valueText?: string;
  tone?: ProgressTone;
  size?: ProgressSize;
  /** Milliseconds before the first fill starts, for a cascade of bars. */
  delayMs?: number;
};
