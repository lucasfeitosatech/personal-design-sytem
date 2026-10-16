import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

/**
 * Minimum row height, native only: the web still ships the 52 pt of `LIST_ROW_MIN_HEIGHT` in
 * design-core, but the taller native type does not sit in 52, and the operator asked for 56.
 */
export const LIST_ROW_MIN_HEIGHT = 56;

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space[3], paddingVertical: 14 },
  main: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 2 },
  icon: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  separated: { borderTopWidth: 1 },
  disabled: { opacity: 0.55 },
});
