import { nativeText, radius } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';
import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y } from '@lucasfeitosatech/design-core';

/**
 * The minimum clearance the raised label owns above the scrollable input; the component grows it
 * with the measured label, since its lower half hangs under the border. The resting label sits
 * below it, on the first line, and scrolled lines never pass behind the hanging half.
 */
export const TEXTAREA_NOTCH_CLEAR = 8;

export const styles = StyleSheet.create({
  /** Borderless wrapper so the outline and the label can be siblings of the frame, above it in paint order. */
  container: { position: 'relative' },
  /** The frame carries no border: the line is drawn by the NotchedOutline, so padding never moves. */
  frame: { borderRadius: radius.sm },
  /** Space the label's lower half occupies; the input starts below it. */
  spacer: { height: TEXTAREA_NOTCH_CLEAR },
  /** Invisible twin of the raised label; it only measures the width the notch must open to. */
  measure: { position: 'absolute', left: 0, top: 0, opacity: 0 },
  /** Absolute over the frame; it crosses the stroke the outline notches out around it. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, padding: 0, paddingVertical: TEXTAREA_PADDING_Y, fontSize: nativeText.base, lineHeight: TEXTAREA_LINE_HEIGHT },
});
