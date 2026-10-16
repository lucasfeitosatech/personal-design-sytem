import { nativeText, radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet, type KeyboardTypeOptions } from 'react-native';
import type { InputMode } from '@lucasfeitosatech/design-core';

/** Matches --ds-motion-fast, so the label lifts at the same speed on both platforms. */
export const FLOAT_DURATION = 150;

/**
 * The native label's sizes. At rest it is the size of the text it will be replaced by, so the
 * frame reads as filled; raised it is a caption centred on the border line, which the outline
 * notches out around it. The core's LABEL_* constants are the web's scale and stay untouched.
 */
export const NATIVE_LABEL_FLOAT_SIZE = 12;
export const NATIVE_LABEL_FLOAT_LINE = 14;
export const NATIVE_LABEL_REST_LINE = 22;

/** Gap between the raised label and the stroke on either side, inside the notch. */
export const NOTCH_GAP = 4;

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
  /** Borderless wrapper so the outline and the label can be siblings of the frame, above it in paint order. */
  container: { position: 'relative' },
  /**
   * The frame carries no border: the line is drawn by the NotchedOutline, so the content padding
   * stays constant and the field never moves a pixel on focus.
   */
  frame: { borderRadius: radius.sm, justifyContent: 'center' },
  /** The row: prefix, input and suffix share one centre line, centred in the frame. */
  row: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space[2] },
  /** Invisible twin of the raised label; it only measures the width the notch must open to. */
  measure: { position: 'absolute', left: 0, top: 0, opacity: 0 },
  /** Absolute over the frame; it crosses the stroke the outline notches out around it. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, minWidth: 0, padding: 0, fontSize: nativeText.base },
});
