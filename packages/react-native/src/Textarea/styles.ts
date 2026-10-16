import { radius, space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';
import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y } from '@lucasfeitosatech/design-core';
import { LABEL_BAND } from '../TextField/styles';

export const styles = StyleSheet.create({
  /** Borderless wrapper so the label can be a sibling of the frame, above it in paint order. */
  container: { position: 'relative' },
  frame: { flexDirection: 'column', borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: space[3] },
  /** Fixed band for the label, outside the scrollable input: scrolled lines never pass behind it. */
  labelBand: { height: LABEL_BAND },
  /** Absolute inside the top of the frame; a sibling of it so the border cannot clip it. Left is inline: it must include the frame border. */
  label: { position: 'absolute', zIndex: 1 },
  input: { flex: 1, padding: 0, paddingVertical: TEXTAREA_PADDING_Y, fontSize: text.base, lineHeight: TEXTAREA_LINE_HEIGHT },
});
