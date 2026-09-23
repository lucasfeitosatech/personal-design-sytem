import type { ReactNode } from 'react';

/**
 * A titled block inside a screen. Sentence case, never uppercase (D-18): uppercase is reserved for
 * table labels. The meta is the small mono figure on the right, the action is a quiet control.
 */
export type SectionContract = {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
};

export const DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type DividerOrientation = (typeof DIVIDER_ORIENTATIONS)[number];

/** A rule. Decorative by default, so it is hidden from assistive technology. */
export type DividerContract = {
  orientation?: DividerOrientation;
};
