/**
 * A week of days to move between, with a step control on each side. It is a selector, not a
 * calendar: a screen that needs a whole month opens the platform's own picker instead.
 *
 * Every day carries its own assistive label, because "24" read aloud says nothing, and the dot that
 * marks a day with content is never the only difference — the label states it too.
 */

export type DateStripDay = {
  key: string;
  /** Weekday abbreviation, already localised by the application. */
  weekday: string;
  /** Day number, drawn in mono. */
  day: string;
  /** Draws the dot: this day has something in it. */
  marked?: boolean;
  /** The whole name of the day, including whether it has content. Announced instead of the digits. */
  label: string;
};

export type DateStripContract = {
  days: DateStripDay[];
  selected: string;
  onSelect: (key: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  /** There is no next week yet. The control stays in place, disabled, so the row does not jump. */
  nextDisabled?: boolean;
};

/** Height of one day cell, in points. Above the touch target, because the cell is the target. */
export const DATE_STRIP_DAY_HEIGHT = 52;
