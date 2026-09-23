import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet, type KeyboardTypeOptions } from 'react-native';
import type { InputMode } from '@lucasfeitosatech/design-core';

/** Matches --ds-motion-fast, so the label lifts at the same speed on both platforms. */
export const FLOAT_DURATION = 150;

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
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: space[3],
  },
  /** Absolute so it can sit on the border line; the surface colour behind it fakes the notch. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, minWidth: 0, padding: 0, fontSize: text.base },
});
