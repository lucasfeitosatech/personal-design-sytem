import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet, type KeyboardTypeOptions } from 'react-native';
import type { InputMode } from '@lucasfeitosatech/design-core';

/** Matches --ds-motion-fast, so the label lifts at the same speed on both platforms. */
export const FLOAT_DURATION = 150;

/**
 * Height of the fixed band the label lifts into. The label sits 6pt inside the top border, an
 * 11pt glyph, so 20pt holds it — and the minimum frame height (48pt on `sm`) still holds the text
 * row below it, with room to spare. The band is always present, so the frame's height, and the
 * row's position inside it, never move with focus or entry.
 */
export const LABEL_BAND = 20;

/** `numeric` and `decimal` raise different keyboards on a phone; the web only distinguishes inputMode. */
export function keyboardFor(mode: InputMode): KeyboardTypeOptions {
  switch (mode) {
    case 'numeric':
      return 'number-pad';
    case 'decimal':
      return 'decimal-pad';
    case 'email':
      return 'email-address';
    case 'tel':
      return 'phone-pad';
    case 'url':
      return 'url';
    default:
      return 'default';
  }
}

export const styles = StyleSheet.create({
  /** Borderless wrapper so the label can be a sibling of the frame, above it in paint order. */
  container: { position: 'relative' },
  frame: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: space[3],
  },
  /** Fixed band reserved for the label, lifted or not: the row below never moves. */
  labelBand: { height: LABEL_BAND },
  /** The bottom row: prefix, input and suffix share one centre line. */
  row: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space[2] },
  /** Absolute inside the top of the frame; a sibling of it so the border cannot clip it. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, minWidth: 0, padding: 0, fontSize: text.base },
});
