import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';
import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y } from '@lucasfeitosatech/design-core';

export const styles = StyleSheet.create({
  frame: { borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: space[3] },
  label: { position: 'absolute', left: space[3], zIndex: 1 },
  input: { flex: 1, padding: 0, paddingVertical: TEXTAREA_PADDING_Y, fontSize: text.base, lineHeight: TEXTAREA_LINE_HEIGHT },
});
