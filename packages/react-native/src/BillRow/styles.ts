import { radius, space, tap } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { paddingVertical: space[4], gap: space[3] },
  // The name stands apart from what follows: the bands below are about it.
  nameBand: { paddingBottom: space[1] },
  // The state, the figure and the control on one line, centred on each other.
  middle: { flexDirection: 'row', alignItems: 'center', gap: space[4] },
  // The body band takes what the control leaves; it keeps the 44 pt target on its own.
  state: { flexGrow: 1, flexShrink: 1, minWidth: 0, minHeight: tap, flexDirection: 'row', alignItems: 'center', gap: space[3] },
  chip: { flexGrow: 1, flexShrink: 1, minWidth: 0, alignItems: 'flex-start' },
  amount: { flexShrink: 0, textAlign: 'right' },
  footer: { paddingTop: space[1] },
  action: { width: tap, height: tap, borderRadius: radius.sm, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  disabled: { opacity: 0.55 },
});
