import { radius, space, tap } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  panel: { borderWidth: 1, borderRadius: radius.md, paddingVertical: space[3], paddingHorizontal: space[3], gap: space[2] },
  dashed: { borderStyle: 'dashed' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space[2] },
  busy: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  action: { flexDirection: 'row', alignItems: 'center', gap: space[2], minHeight: tap, paddingHorizontal: space[1] },
  pressed: { opacity: 0.7 },
  inactive: { opacity: 0.55 },
  dot: { width: 6, height: 6, borderRadius: radius.pill, borderWidth: 1.5 },
});
