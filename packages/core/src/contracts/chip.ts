import type { ReactNode } from 'react';

/**
 * Semantic tones, not domain ones. The planner's chips speak of paid, overdue and skipped; a design
 * system cannot, or the next product inherits a vocabulary of bills. An application maps its own
 * meaning onto these: paid becomes success, overdue becomes danger, skipped becomes muted.
 */
export const CHIP_TONES = ['neutral', 'accent', 'success', 'warning', 'danger', 'muted'] as const;
export type ChipTone = (typeof CHIP_TONES)[number];

/**
 * The one place a tone is bound to palette keys. The keys still carry the finance names the tokens
 * ship today; the token source already separates core from domain, so this map is what has to
 * change when they are renamed, and nothing else.
 */
export const CHIP_TONE_TOKEN = {
  neutral: { background: 'surfaceRaised', foreground: 'textSecondary', border: 'border' },
  accent: { background: 'accentSoft', foreground: 'accent', border: 'accentBorder' },
  success: { background: 'paidSoft', foreground: 'paid', border: 'accentBorder' },
  warning: { background: 'dueSoonSoft', foreground: 'dueSoon', border: 'dueSoonMark' },
  danger: { background: 'overdueSoft', foreground: 'overdue', border: 'overdueBorder' },
  muted: { background: 'skippedSoft', foreground: 'skipped', border: 'border' },
} as const satisfies Record<ChipTone, { background: string; foreground: string; border: string }>;

export type ChipContract = {
  label: ReactNode;
  tone?: ChipTone;
  icon?: ReactNode;
  /** Figures and codes read better in mono. */
  mono?: boolean;
  /** Makes the chip a toggle. With it, the chip announces its pressed state. */
  selected?: boolean;
  /** Adds a remove control. The accessible name is built from this and the label. */
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
};
