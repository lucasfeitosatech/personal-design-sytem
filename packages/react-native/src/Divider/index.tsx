import type { DividerContract } from '@lucasfeitosatech/design-core';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type DividerProps = DividerContract;

/** A rule. Decorative, so it is hidden from assistive technology. */
export function Divider({ orientation = 'horizontal' }: DividerProps) {
  const { palette } = useTheme();
  return <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles[orientation], { backgroundColor: palette.border }]} />;
}
