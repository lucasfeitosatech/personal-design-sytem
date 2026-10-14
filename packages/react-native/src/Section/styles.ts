import { space, text } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: { gap: space[3] },
  header: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: space[3], flexWrap: 'wrap' },
  heading: { flexDirection: 'row', alignItems: 'baseline', gap: space[2], flexShrink: 1 },
  action: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  // Open block: a hairline on top and room on both sides, no card of its own.
  plain: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: space[5], paddingBottom: space[5] },
  plainTitle: { letterSpacing: -0.02 * text.lg },
});
