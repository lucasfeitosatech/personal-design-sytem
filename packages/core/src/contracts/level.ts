/**
 * A level the person reports about themselves — how the day felt, how much energy there was — on a
 * 0..100 scale moved in steps. The system draws and measures it; it never names a level. What a
 * position means ("bom humor", "30%, doente") is the application's copy, handed in as text.
 *
 * `null` is an answer of its own: not marked. Neither control opens on a value it was not given,
 * because a slider resting at the middle would record "neutral" for someone who never touched it.
 */

export const LEVEL_MIN = 0;
export const LEVEL_MAX = 100;
/** Eleven positions: fine enough to move, coarse enough that two neighbours still feel different. */
export const LEVEL_STEP = 10;
/** Where an assistive increment lands when nothing is marked yet: the middle, not an end. */
export const LEVEL_FIRST_ADJUST = 50;

/** The slider's knob, in points or pixels. The track ends this far in, so the knob never leaves it. */
export const LEVEL_KNOB_SIZE = 28;
/** The battery's body height; the touch target is the whole body. */
export const BATTERY_HEIGHT = 64;

/** Clamps to the scale and rounds to the nearest step. */
export function snapLevel(raw: number, step: number = LEVEL_STEP): number {
  const clamped = Math.min(LEVEL_MAX, Math.max(LEVEL_MIN, raw));
  return Math.round(clamped / step) * step;
}

/**
 * The level under a point `x` along a control `width` wide whose usable span starts and ends `inset`
 * in from each edge (the knob's radius for the slider, the body padding for the battery).
 */
export function levelAt(x: number, width: number, inset: number, step: number = LEVEL_STEP): number {
  const span = width - 2 * inset;
  if (span <= 0) return LEVEL_MIN;
  return snapLevel(((x - inset) / span) * LEVEL_MAX, step);
}

/**
 * The charge under a point on a battery of ten cells: a tap anywhere in a cell fills up to and
 * including it, the way a battery reads. Only the first sliver of the first cell empties it.
 */
export function batteryLevelAt(x: number, width: number, inset: number): number {
  const span = width - 2 * inset;
  if (span <= 0) return LEVEL_MIN;
  const fraction = Math.min(1, Math.max(0, (x - inset) / span));
  if (fraction < 0.03) return LEVEL_MIN;
  return Math.min(LEVEL_MAX, Math.ceil(fraction * 10) * LEVEL_STEP);
}

/** The point along the control where `level` sits: the inverse of `levelAt`. */
export function levelOffset(level: number, width: number, inset: number): number {
  const span = Math.max(0, width - 2 * inset);
  return inset + (Math.min(LEVEL_MAX, Math.max(LEVEL_MIN, level)) / LEVEL_MAX) * span;
}

/** One step up or down from `value`, the way a screen reader's swipe moves it. */
export function adjustLevel(value: number | null, direction: 'increment' | 'decrement', step: number = LEVEL_STEP): number {
  if (value === null) return LEVEL_FIRST_ADJUST;
  return snapLevel(value + (direction === 'increment' ? step : -step), step);
}

export type LevelInputContract = {
  /** 0..100 in steps, or `null` for not marked. */
  value: number | null;
  /** `null` when the person clears the mark. */
  onValueChange: (value: number | null) => void;
  /** The control's name, read first: "Humor", "Energia". */
  label: string;
  /** What a reader hears for a value — "6 de 10, humor neutro". The app writes it. */
  valueText: (value: number) => string;
  /** Read when nothing is marked: "sem marcação". */
  emptyText: string;
  step?: number;
  disabled?: boolean;
};

/** A track with a knob. `minLabel`/`maxLabel` name the two ends under it ("mau humor", "bom humor"). */
export type LevelSliderContract = LevelInputContract & {
  minLabel?: string;
  maxLabel?: string;
};

/** A battery the person fills by tapping or dragging: the level as a charge, in ten cells. */
export type BatteryInputContract = LevelInputContract;

/** The paths of the face at a level, in a 100×100 box. */
export type FaceGeometry = {
  mouth: string;
  browLeft: string;
  browRight: string;
  /** 0..1, the cheeks' opacity: they show only in the upper part of the scale. */
  cheek: number;
};

/**
 * The face at a level, from a closed mouth and raised inner brows at 0 to a smile at 100. The eyes
 * do not change: drowsy or wide eyes read as energy, which is the other scale.
 */
export function faceGeometry(level: number): FaceGeometry {
  const m = Math.min(LEVEL_MAX, Math.max(LEVEL_MIN, level)) / LEVEL_MAX;
  const curve = -16 + 32 * m;
  const lift = 6 * (1 - m);
  const n = (value: number) => Number(value.toFixed(1));
  return {
    mouth: `M 33 68 Q 50 ${n(68 + curve)} 67 68`,
    browLeft: `M 29 ${n(35 + lift * 0.3)} L 44 ${n(35 - lift)}`,
    browRight: `M 56 ${n(35 - lift)} L 71 ${n(35 + lift * 0.3)}`,
    cheek: Number(Math.max(0, (m - 0.55) * 0.9).toFixed(2)),
  };
}

/**
 * A face that shows a level. Decorative next to a slider that already says the value; give it a
 * `label` only when it stands alone (a day in the history).
 */
export type MoodFaceContract = {
  /** `null` draws the middle face, faded: nothing marked. */
  level: number | null;
  /** Side of the square, in points or pixels. */
  size?: number;
  label?: string;
};
