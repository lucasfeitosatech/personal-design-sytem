import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrap: { gap: space[1] },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space[3], minHeight: 44 },
  disabled: { opacity: 0.55 },
  box: { width: 20, height: 20, marginTop: 2, borderWidth: 1, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  labels: { flex: 1, gap: 2 },
  error: { marginLeft: 20 + space[3] },
});
