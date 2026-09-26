import { radius, space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  line: { borderRadius: radius.sm },
  block: { borderRadius: radius.sm },
  card: { borderRadius: radius.md },
  group: { gap: space[3] },
  groupCard: { borderWidth: 1, borderRadius: radius.md, padding: space[4] },
});
