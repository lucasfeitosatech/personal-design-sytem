import { radius } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center' },
  chip: { borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 10 },
  inner: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  disabled: { opacity: 0.55 },
  remove: { width: 20, height: 20, marginLeft: -6, alignItems: 'center', justifyContent: 'center' },
});
