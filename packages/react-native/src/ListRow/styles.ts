import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space[3], paddingVertical: space[2] },
  main: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 2 },
  icon: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  separated: { borderTopWidth: 1 },
  disabled: { opacity: 0.55 },
});
