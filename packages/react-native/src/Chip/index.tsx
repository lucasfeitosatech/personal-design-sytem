import { CHIP_TONE_TOKEN, type ChipContract } from '@lucasfeitosatech/design-core';
import type { Palette } from '@lucasfeitosatech/design-tokens';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type ChipProps = ChipContract & {
  /** Makes the chip pressable. Without it the chip is a label and takes no focus. */
  onPress?: () => void;
};

/** A small label, optionally selectable, optionally removable. */
export function Chip({ label, tone = 'neutral', icon, mono = false, selected, onRemove, removeLabel = 'Remover', disabled, onPress }: ChipProps) {
  const { palette } = useTheme();
  const key = CHIP_TONE_TOKEN[tone];
  const background = palette[key.background as keyof Palette];
  const foreground = palette[key.foreground as keyof Palette];
  const border = selected ? foreground : palette[key.border as keyof Palette];

  const body = (
    <View style={styles.inner}>
      {icon}
      <Text size="xs" weight="medium" mono={mono} style={{ color: foreground }}>
        {label}
      </Text>
    </View>
  );

  return (
    <View style={styles.wrap}>
      {onPress ? (
        <Pressable
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ selected, disabled }}
          style={[styles.chip, { backgroundColor: background, borderColor: border, borderWidth: selected ? 2 : 1 }, disabled ? styles.disabled : null]}
        >
          {body}
        </Pressable>
      ) : (
        <View style={[styles.chip, { backgroundColor: background, borderColor: border }]}>{body}</View>
      )}
      {onRemove ? (
        <Pressable
          onPress={onRemove}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={`${removeLabel} ${typeof label === 'string' ? label : ''}`.trim()}
          hitSlop={8}
          style={styles.remove}
        >
          <Text size="sm" style={{ color: foreground }}>
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
