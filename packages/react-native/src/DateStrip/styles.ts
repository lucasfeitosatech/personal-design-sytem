import { radius, space, tap } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  strip: { flexDirection: 'row', alignItems: 'center', gap: space[1] },
  days: { flexGrow: 1, flexShrink: 1, flexDirection: 'row', gap: 2 },
  // Equal share of what is left after the two steps: seven cells, no measurement.
  day: { flexGrow: 1, flexBasis: 0, minWidth: 0, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', gap: 2 },
  dot: { width: 4, height: 4, borderRadius: radius.pill },
  step: { width: 32, height: tap, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.4 },
});
