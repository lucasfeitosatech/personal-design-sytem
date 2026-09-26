import { radius, space, tap } from '@lucasfeitosatech/design-tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space[1] },
  rowIos: { paddingHorizontal: space[2] },
  rowAndroid: { paddingHorizontal: space[1] },
  backIos: { minWidth: tap, height: tap, flexDirection: 'row', alignItems: 'center', gap: 2 },
  backAndroid: { width: 48, height: tap, alignItems: 'center', justifyContent: 'center' },
  titleSlot: { flexGrow: 1, flexShrink: 1, minWidth: 0 },
  titleIos: { textAlign: 'center' },
  titleAndroid: { paddingLeft: space[3] },
  actions: { flexDirection: 'row', alignItems: 'center' },
  action: { width: tap, height: tap, alignItems: 'center', justifyContent: 'center', borderRadius: radius.sm },
  large: { paddingHorizontal: space[4], paddingBottom: space[2] },
  subtitle: { paddingHorizontal: space[4], paddingBottom: space[2] },
});
