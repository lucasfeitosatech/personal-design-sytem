/**
 * Vocabulary shared by every component of the system, on any platform.
 * Const arrays first, types derived from them, so a renderer can iterate the values at runtime
 * (stories, tests, style specs) instead of restating the union.
 */

export const SIZES_BASE = ['sm', 'md'] as const;
export type BaseSize = (typeof SIZES_BASE)[number];

export const TONES_BASE = ['neutral', 'accent', 'danger'] as const;
export type BaseTone = (typeof TONES_BASE)[number];
