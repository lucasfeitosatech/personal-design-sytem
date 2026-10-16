import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';
import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y } from '@lucasfeitosatech/design-core';

export const styles = StyleSheet.create({
  /** Borderless wrapper so the label can be a sibling of the frame, above it in paint order. */
  container: { position: 'relative' },
  frame: { borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: space[3] },
  /** Absolute inside the top of the frame; a sibling of it so the border cannot clip it. Left is inline: it must include the frame border. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, padding: 0, paddingVertical: TEXTAREA_PADDING_Y, fontSize: text.base, lineHeight: TEXTAREA_LINE_HEIGHT },
});
