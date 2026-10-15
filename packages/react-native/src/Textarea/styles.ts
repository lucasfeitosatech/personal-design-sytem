import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';
import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y } from '@lucasfeitosatech/design-core';

export const styles = StyleSheet.create({
  /** Borderless wrapper so the label can be a sibling of the frame and draw above its border. */
  container: { position: 'relative' },
  frame: { borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: space[3] },
  /** Absolute over the frame; the surface colour behind it fakes the notch. Left is inline: it must include the frame border. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, padding: 0, paddingVertical: TEXTAREA_PADDING_Y, fontSize: text.base, lineHeight: TEXTAREA_LINE_HEIGHT },
});
