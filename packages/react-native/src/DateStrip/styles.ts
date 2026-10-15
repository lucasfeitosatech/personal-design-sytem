import { radius, space, tap } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  strip: { flexDirection: 'row', alignItems: 'center', gap: space[1] },
  daysScroll: { flexGrow: 1, flexShrink: 1 },
  // The cells keep the touch target: seven cells of 44 pt scroll when the week does not fit,
  // instead of shrinking to a target a finger cannot hit.
  days: { gap: 2 },
  day: { width: tap, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', gap: 2 },
  dot: { width: 4, height: 4, borderRadius: radius.pill },
  step: { width: tap, height: tap, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.4 },
});
