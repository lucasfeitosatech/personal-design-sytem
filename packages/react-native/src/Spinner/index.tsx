import type { SpinnerContract } from '@lucasfeitosatech/design-core';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type SpinnerProps = SpinnerContract;

/** Busy indicator. The label is required and announced, exactly as on the web. */
export function Spinner({ size = 'md', label }: SpinnerProps) {
  const { palette } = useTheme();
  return (
    <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel={label} accessibilityState={{ busy: true }}>
      <ActivityIndicator size={size === 'sm' ? 'small' : 'large'} color={palette.accent} />
    </View>
  );
}
