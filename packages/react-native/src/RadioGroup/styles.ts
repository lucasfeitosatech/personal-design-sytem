import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  group: { gap: space[2] },
  disabled: { opacity: 0.55 },
  options: { gap: space[2] },
  inline: { flexDirection: 'row', flexWrap: 'wrap', gap: space[4] },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space[3], minHeight: 44 },
  dot: { width: 20, height: 20, marginTop: 2, borderWidth: 1, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  inner: { width: 12, height: 12, borderRadius: radius.pill },
  labels: { flex: 1, gap: 2 },
});
