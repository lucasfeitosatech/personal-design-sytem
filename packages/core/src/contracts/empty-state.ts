import type { ReactNode } from 'react';

export const EMPTY_STATE_TONES = ['default', 'error'] as const;
export type EmptyStateTone = (typeof EMPTY_STATE_TONES)[number];

/**
 * Nothing to show, or something went wrong. Both get one line of explanation and one way out;
 * a dead end with no action is the version users complain about.
 */
export type EmptyStateContract = {
  title: string;
  body?: string;
  tone?: EmptyStateTone;
  actions?: ReactNode;
};
