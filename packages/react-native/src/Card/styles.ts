import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radius.md, padding: space[4] },
  flush: { padding: 0, overflow: 'hidden' },
});
