import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'flex-start', gap: space[3], padding: space[3], borderWidth: 1, borderRadius: radius.md },
  icon: { paddingTop: 1 },
  main: { flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 2 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space[1], marginTop: space[1] },
});
