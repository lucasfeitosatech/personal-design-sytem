import { StyleSheet } from 'react-native';

/** Off the type scale on purpose: the group-label voice of the navigation (11 pt on the web). */
const SIZE = 11;

export const styles = StyleSheet.create({
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  tracked: { fontSize: SIZE, letterSpacing: 0.08 * SIZE, textTransform: 'uppercase' },
});
