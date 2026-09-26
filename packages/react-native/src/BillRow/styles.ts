import { radius, space, tap } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space[3], paddingVertical: space[2] },
  main: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: space[1], flexWrap: 'wrap' },
  amount: { flexShrink: 0, textAlign: 'right' },
  action: { width: tap, height: tap, borderRadius: radius.sm, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  disabled: { opacity: 0.55 },
});
