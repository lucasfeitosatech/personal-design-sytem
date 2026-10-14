import type { EyebrowContract } from '@lucasfeitosatech/design-core';
import { View, type ViewProps } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type EyebrowProps = Omit<ViewProps, 'children'> & EyebrowContract;

/**
 * Mono, uppercase, tracked out: names the page or block before its title (lcsfeitosa.com).
 * 11 pt by contract, off the type scale: it is the label voice of the navigation groups, not body
 * text, so the size lives here rather than in the scale.
 */
export function Eyebrow({ index, dot = false, style, children, ...rest }: EyebrowProps) {
  const { palette } = useTheme();
  return (
    <View style={[styles.eyebrow, style]} {...rest}>
      {dot ? <View style={[styles.dot, { backgroundColor: palette.accent }]} accessibilityElementsHidden /> : null}
      <Text mono tone="tertiary" style={styles.tracked}>
        {index ? (
          <Text mono tone="accent" style={styles.tracked}>
            {index} /
          </Text>
        ) : null}
        {index ? ' ' : null}
        {children}
      </Text>
    </View>
  );
}
