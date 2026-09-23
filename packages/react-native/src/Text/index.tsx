import { TEXT_TONE_TOKEN, TEXT_WEIGHT_VALUE, type TextContract } from '@lucasfeitosatech/design-core';
import { text as textScale } from '@lucasfeitosatech/design-tokens';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { monoFamily, styles } from './styles';

export type TextProps = Omit<RNTextProps, 'children'> & TextContract;

/**
 * Every string on a device goes through here. React Native has no cascade, so a raw `<Text>`
 * silently leaves the type scale and the palette.
 */
export function Text({ size = 'base', tone = 'default', weight = 'regular', mono = false, lines, style, children, ...rest }: TextProps) {
  const { palette } = useTheme();
  return (
    <RNText
      numberOfLines={lines}
      style={[
        styles.base,
        { fontSize: textScale[size], color: palette[TEXT_TONE_TOKEN[tone]], fontWeight: TEXT_WEIGHT_VALUE[weight] },
        mono ? { fontFamily: monoFamily, fontVariant: ['tabular-nums'] } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
