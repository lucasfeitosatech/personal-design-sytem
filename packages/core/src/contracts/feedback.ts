import type { ReactNode } from 'react';

/**
 * States a screen reports about itself: a standing condition (Banner) and content that has not
 * arrived yet (Skeleton). Neither is a decision, so neither interrupts: the Banner sits in the
 * content and the Skeleton takes the shape of what is coming.
 */

export const BANNER_TONES = ['warning', 'neutral', 'danger'] as const;
export type BannerTone = (typeof BANNER_TONES)[number];

/** The one place a banner tone touches a palette key. A renderer reads it; it invents nothing. */
export const BANNER_TONE_TOKEN = {
  warning: { border: 'dueSoonMark', background: 'dueSoonSoft', icon: 'dueSoon' },
  neutral: { border: 'border', background: 'surfaceRaised', icon: 'textSecondary' },
  danger: { border: 'overdueBorder', background: 'overdueSoft', icon: 'overdue' },
} as const satisfies Record<BannerTone, { border: string; background: string; icon: string }>;

/**
 * A condition that holds until something changes: the server is unreachable, a draft was never sent,
 * a form was rejected. It never dismisses itself — a message that disappears on its own is one the
 * person may never have read — and it is not a decision, so it has no primary action.
 */
export type BannerContract = {
  tone?: BannerTone;
  title: string;
  body?: ReactNode;
  /** Quiet controls. A banner with a primary button is a modal that forgot to block. */
  actions?: ReactNode;
  /** Injected node: the system ships no icon set. */
  icon?: ReactNode;
};

export const SKELETON_SHAPES = ['line', 'block', 'card'] as const;
export type SkeletonShape = (typeof SKELETON_SHAPES)[number];

/** Default height per shape, in points: a line of text, a control, a card. */
export const SKELETON_SHAPE_HEIGHT = { line: 12, block: 44, card: 76 } as const satisfies Record<SkeletonShape, number>;

/**
 * One period of the opacity pulse, in milliseconds. Deliberately not `motion.fast` or `motion.base`:
 * those are transition durations, and a placeholder that pulsed at 220 ms would read as an error.
 */
export const SKELETON_PULSE_MS = 1000;

export type SkeletonContract = {
  shape?: SkeletonShape;
  /** Points, or a percentage string for a line inside a known container. */
  width?: number | string;
  height?: number;
};

/**
 * The container a screen wraps its placeholders in. It carries the only announcement: individual
 * blocks are decoration, and a reader that met each of them would hear "loading" six times.
 */
export type SkeletonGroupContract = {
  label: string;
  /** Draws the bordered surface the placeholders sit on, for a card-shaped section. */
  card?: boolean;
  children?: ReactNode;
};
