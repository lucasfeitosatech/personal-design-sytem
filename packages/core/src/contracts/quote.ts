import type { ReactNode } from 'react';

/**
 * A sentence someone kept, shown with where it came from. The source is part of the contract and not
 * an option a screen may drop: a phrase presented without its origin is indistinguishable from one a
 * model invented.
 *
 * With `onToggle` the card is a disclosure — collapsed it shows the hint, expanded it shows the
 * source. Without it the source is always visible.
 */

export type QuoteSource = {
  /** Where it came from, in words ("A partir de: diário de 22/09/2026"). */
  label: string;
  /** The passage itself, verbatim. Rendered in mono and in quotes; never paraphrased. */
  excerpt: string;
};

export type AffirmationCardContract = {
  text: string;
  source?: QuoteSource;
  /** Shown in place of the source while collapsed ("Toque para ver de onde veio"). */
  collapsedHint?: string;
  expanded?: boolean;
  onToggle?: () => void;
  /** Quiet controls under the source: keep, dismiss. */
  actions?: ReactNode;
};
