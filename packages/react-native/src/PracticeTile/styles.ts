import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const MARK = 24;

export const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space[2] },
  // Two per row with the grid's gap between them; the percentage keeps it independent of screen width.
  // The cell scales under the finger; the tile inside fills it.
  cell: { flexBasis: '48%', flexGrow: 1 },
  tile: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: space[3],
    paddingHorizontal: 14,
  },
  pressed: { opacity: 0.92 },
  disabled: { opacity: 0.55 },
  mark: { borderRadius: radius.pill, borderWidth: 1.5, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  fill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  half: { position: 'absolute', left: 0, top: 0, bottom: 0, width: MARK / 2 },
  labels: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 2 },
});
