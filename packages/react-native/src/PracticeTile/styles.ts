import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

const MARK = 24;

export const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space[2] },
  tile: {
    // Two per row with the grid's gap between them; the percentage keeps it independent of screen width.
    flexBasis: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: space[2],
    paddingHorizontal: space[3],
  },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.55 },
  mark: { width: MARK, height: MARK, borderRadius: radius.pill, borderWidth: 1.5, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  fill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  half: { position: 'absolute', left: 0, top: 0, bottom: 0, width: MARK / 2 },
  labels: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 2 },
});
