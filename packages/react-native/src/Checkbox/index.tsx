import type { CheckboxContract } from '@lucasfeitosatech/design-core';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type CheckboxProps = CheckboxContract;

/**
 * React Native has no checkbox primitive, so it is drawn. `accessibilityRole="checkbox"` plus a
 * `checked` state of `"mixed"` is what makes a screen reader say "partially checked"; a boolean
 * cannot express it.
 */
export function Checkbox({ checked, onCheckedChange, label, description, disabled, error }: CheckboxProps) {
  const { palette } = useTheme();
  const on = checked === true || checked === 'indeterminate';
  const borderColor = error ? palette.overdue : on ? palette.accent : palette.pending;

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={() => !disabled && onCheckedChange(checked !== true)}
        accessibilityRole="checkbox"
        accessibilityLabel={label}
        accessibilityHint={typeof description === 'string' ? description : undefined}
        accessibilityState={{ checked: checked === 'indeterminate' ? 'mixed' : checked, disabled }}
        style={[styles.row, disabled ? styles.disabled : null]}
      >
        <View style={[styles.box, { borderColor, backgroundColor: on ? palette.accent : palette.surface }]}>
          {on ? (
            <Text size="sm" weight="semibold" style={{ color: palette.onAccent }}>
              {checked === 'indeterminate' ? '–' : '✓'}
            </Text>
          ) : null}
        </View>
        <View style={styles.labels}>
          <Text size="base">{label}</Text>
          {description ? (
            <Text size="xs" tone="tertiary">
              {description}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {error ? (
        <Text size="xs" tone="danger" accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
