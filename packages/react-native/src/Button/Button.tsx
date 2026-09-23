import { BUTTON_MIN_HEIGHT, type ButtonContract } from '@lucasfeitosatech/design-core';
import { radius, space, tap, text, type Palette } from '@lucasfeitosatech/design-tokens';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> &
  ButtonContract & {
    children: ReactNode;
    icon?: ReactNode;
    style?: StyleProp<ViewStyle>;
  };

/** The same contract as the web Button. Hover becomes pressed; the minimum height is the touch target. */
export function Button({ variant = 'secondary', size = 'md', loading = false, block = false, icon, disabled, children, style, ...rest }: ButtonProps) {
  const { palette } = useTheme();
  const tone = toneOf(variant, palette);
  const inactive = disabled === true || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      hitSlop={size === 'sm' ? 8 : 0}
      style={({ pressed }) => [
        styles.base,
        { minHeight: Math.max(BUTTON_MIN_HEIGHT[size], tap), paddingHorizontal: size === 'sm' ? space[3] : space[4] },
        { backgroundColor: pressed && !inactive ? tone.pressed : tone.background, borderColor: tone.border },
        block ? styles.block : null,
        inactive ? styles.inactive : null,
        style,
      ]}
      {...rest}
    >
      {loading ? <ActivityIndicator size="small" color={tone.label} /> : null}
      {icon && !loading ? <View accessibilityElementsHidden>{icon}</View> : null}
      <Text style={[styles.label, { color: tone.label, fontSize: size === 'sm' ? text.sm : text.md }]}>{children}</Text>
    </Pressable>
  );
}

function toneOf(variant: NonNullable<ButtonContract['variant']>, palette: Palette) {
  switch (variant) {
    case 'primary':
      return { background: palette.accent, pressed: palette.accentHover, border: palette.accent, label: palette.onAccent };
    case 'danger':
      return { background: palette.overdue, pressed: palette.overdue, border: palette.overdue, label: palette.onOverdue };
    case 'ghost':
      return { background: 'transparent', pressed: palette.surfaceRaised, border: 'transparent', label: palette.textSecondary };
    default:
      return { background: palette.surface, pressed: palette.surfaceRaised, border: palette.border, label: palette.text };
  }
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space[2], borderWidth: 1, borderRadius: radius.sm },
  block: { alignSelf: 'stretch' },
  inactive: { opacity: 0.55 },
  label: { fontWeight: '500' },
});
