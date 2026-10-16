import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet, type KeyboardTypeOptions } from 'react-native';
import type { InputMode } from '@lucasfeitosatech/design-core';

/** Matches --ds-motion-fast, so the label lifts at the same speed on both platforms. */
export const FLOAT_DURATION = 150;

/**
 * Top padding of the input while the label is lifted. The label sits 6pt inside the top border, an
 * 11pt glyph, so 20pt keeps the first line clear of it — and the minimum frame height (48pt on
 * `sm`) still holds it, with room to spare.
 */
export const LIFTED_INPUT_PAD_TOP = 20;

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
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: space[3],
  },
  /** Absolute inside the top of the frame; a sibling of it so the border cannot clip it. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, minWidth: 0, padding: 0, fontSize: text.base },
});
