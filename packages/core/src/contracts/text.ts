import type { ReactNode } from 'react';

/**
 * Semantic roles of text. The web gets these for free from CSS inheritance; native does not, so
 * every string on a device passes through the Text primitive or it leaves the type scale.
 */
export const TEXT_TONES = ['default', 'secondary', 'tertiary', 'disabled', 'accent', 'danger'] as const;
export type TextTone = (typeof TEXT_TONES)[number];

/** The one place a tone is bound to a palette key. Native reads it; the web stylesheet mirrors it. */
export const TEXT_TONE_TOKEN = {
  default: 'text',
  secondary: 'textSecondary',
  tertiary: 'textTertiary',
  disabled: 'textDisabled',
  accent: 'accent',
  danger: 'overdue',
} as const satisfies Record<TextTone, string>;

export const TEXT_SIZES = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl'] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

export const TEXT_WEIGHTS = ['regular', 'medium', 'semibold'] as const;
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

export const TEXT_WEIGHT_VALUE = { regular: '400', medium: '500', semibold: '600' } as const satisfies Record<TextWeight, string>;

export type TextContract = {
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  /** Figures, dates and metadata (D-09). Tabular by default so columns line up. */
  mono?: boolean;
  /** Truncates to this many lines. Omit for unlimited. */
  lines?: number;
  children?: ReactNode;
};
