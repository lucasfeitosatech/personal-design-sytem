import { SURFACE_TONE_TOKEN, type CardContract } from '@lucasfeitosatech/design-core';
import { View, type ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type CardProps = ViewProps & CardContract;

/** A bordered surface. No shadow: the system separates layers by luminance, on both platforms. */
export function Card({ tone = 'default', flush = false, style, children, ...rest }: CardProps) {
  const { palette } = useTheme();
  return (
    <View
      style={[styles.card, { backgroundColor: palette[SURFACE_TONE_TOKEN[tone]], borderColor: palette.border }, flush ? styles.flush : null, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
