import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet, type KeyboardTypeOptions } from 'react-native';
import type { InputMode } from '@lucasfeitosatech/design-core';

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
  frame: { flexDirection: 'row', alignItems: 'center', gap: space[2], borderWidth: 1, borderRadius: radius.sm },
  input: { flex: 1, minWidth: 0, padding: 0 },
});
