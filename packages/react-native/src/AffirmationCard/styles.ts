import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radius.md, paddingVertical: space[3], paddingHorizontal: space[3], gap: space[2] },
  disclosure: { gap: space[2] },
  source: { borderTopWidth: 1, paddingTop: space[2], gap: 2 },
  hint: { flexDirection: 'row', alignItems: 'center', gap: space[1] },
  actions: { flexDirection: 'row', gap: space[2] },
});
