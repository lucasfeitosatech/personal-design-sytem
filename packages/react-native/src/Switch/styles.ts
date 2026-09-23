import { space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space[3] },
  disabled: { opacity: 0.55 },
  labels: { flex: 1, gap: 2 },
});
