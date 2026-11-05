import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

/**
 * Minimum row height, native only: the web still ships the 52 pt of `LIST_ROW_MIN_HEIGHT` in
 * design-core, but the taller native type does not sit in 52, and the operator asked for 56.
 */
export const LIST_ROW_MIN_HEIGHT = 56;

export const styles = StyleSheet.create({
  // Room inside the row (operator, 04/11/2026: lists read cramped): 20 above and below, the
  // detail a step away from the label.
  row: { flexDirection: 'row', alignItems: 'center', gap: space[4], paddingVertical: 20 },
  main: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: space[2] },
  icon: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  separated: { borderTopWidth: 1 },
  disabled: { opacity: 0.55 },
});
