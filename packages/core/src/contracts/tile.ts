/**
 * A tile that toggles. Big enough to be tapped without looking, two lines of content, and a state
 * expressed by shape and fill rather than by colour alone (D-03).
 */

export const TILE_STATES = ['idle', 'done', 'partial', 'muted'] as const;
export type TileState = (typeof TILE_STATES)[number];

/**
 * The one place a tile state touches palette keys. `mark` null means the mark is an empty outline;
 * `half` draws the fill across half the mark, which is how `partial` differs from `done` in shape
 * and not only in colour.
 */
export const TILE_STATE_TOKEN = {
  idle: { background: 'surface', border: 'border', mark: null, half: false },
  done: { background: 'accentSoft', border: 'accentBorder', mark: 'accent', half: false },
  partial: { background: 'surface', border: 'border', mark: 'accent', half: true },
  muted: { background: 'surfaceRaised', border: 'border', mark: 'skipped', half: false },
} as const satisfies Record<TileState, { background: string; border: string; mark: string | null; half: boolean }>;

/** Minimum tile height in points. Two of them fit a phone's width; one has to survive a thumb. */
export const PRACTICE_TILE_MIN_HEIGHT = 64;

export type PracticeTileContract = {
  label: string;
  /** The small mono line under the label: a duration, a count. */
  meta?: string;
  state?: TileState;
  onPress?: () => void;
  disabled?: boolean;
};

/** The two-column grid the tiles sit in. It owns the gap; a tile never knows its neighbours. */
export type TileGridContract = {
  /** Announced as a group, so a reader does not meet six unrelated buttons. */
  label?: string;
};
