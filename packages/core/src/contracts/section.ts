import type { ReactNode } from 'react';

/**
 * A titled block inside a screen. Sentence case, never uppercase (D-18): uppercase is reserved for
 * table labels. The meta is the small mono figure on the right, the action is a quiet control.
 */
export const SECTION_VARIANTS = ['card', 'plain'] as const;
export type SectionVariant = (typeof SECTION_VARIANTS)[number];

export type SectionContract = {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
  /** `card` frames the block; `plain` opens it, separated from the previous one by a hairline. */
  variant?: SectionVariant;
  children?: ReactNode;
};

/**
 * The small uppercase line that names a page or a block before its title — the editorial label of
 * lcsfeitosa.com. `index` prints a number before it ("01 / ..."); `dot` prints the accent dot.
 */
export type EyebrowContract = {
  index?: string;
  dot?: boolean;
  children?: ReactNode;
};

export const DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type DividerOrientation = (typeof DIVIDER_ORIENTATIONS)[number];

/** A rule. Decorative by default, so it is hidden from assistive technology. */
export type DividerContract = {
  orientation?: DividerOrientation;
};
