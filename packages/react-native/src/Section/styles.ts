import { space, nativeText } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: { gap: 20 },
  header: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: space[3], flexWrap: 'wrap' },
  heading: { flexDirection: 'row', alignItems: 'baseline', gap: space[2], flexShrink: 1 },
  action: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  // Open block: a hairline on top and room on both sides, no card of its own.
  // The web rhythm: a hairline, then the block close under it; the next hairline does the separating.
  plain: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: space[6], paddingBottom: space[4] },
  plainTitle: { letterSpacing: -0.02 * nativeText.lg },
});
