import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: 1 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabIos: { gap: 2 },
  tabAndroid: { gap: space[1] },
  icon: { alignItems: 'center', justifyContent: 'center' },
  iconAndroid: { width: 64, height: 32, borderRadius: radius.pill },
});
