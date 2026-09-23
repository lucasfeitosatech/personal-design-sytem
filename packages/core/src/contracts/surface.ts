/** Cards and sections: a bordered surface, never a shadow (the system separates by luminance). */
export const SURFACE_TONES = ['default', 'raised', 'muted'] as const;
export type SurfaceTone = (typeof SURFACE_TONES)[number];

export const SURFACE_TONE_TOKEN = {
  default: 'surface',
  raised: 'surfaceRaised',
  muted: 'surfaceMuted',
} as const satisfies Record<SurfaceTone, string>;

export type CardContract = {
  tone?: SurfaceTone;
  /** Removes the inner padding so the card can hold a list or a table edge to edge. */
  flush?: boolean;
};

export const SPINNER_SIZES = ['sm', 'md'] as const;
export type SpinnerSize = (typeof SPINNER_SIZES)[number];

export type SpinnerContract = {
  size?: SpinnerSize;
  /** Announced while busy. Required: a spinner with no label is invisible to a screen reader. */
  label: string;
};
