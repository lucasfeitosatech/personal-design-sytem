import type { RadioGroupContract } from '@lucasfeitosatech/design-core';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type RadioGroupProps = RadioGroupContract;

/**
 * One choice out of a few. The group carries the label and the error, and `accessibilityRole
 *="radiogroup"` on the container is what lets a reader count the options for the user.
 */
export function RadioGroup({ value, onValueChange, options, label, hideLabel = false, hint, error, disabled, inline = false }: RadioGroupProps) {
  const { palette } = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      accessibilityHint={error ?? hint}
      style={[styles.group, disabled ? styles.disabled : null]}
    >
      {!hideLabel ? (
        <Text size="sm" tone="secondary" weight="medium" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {label}
        </Text>
      ) : null}
      <View style={[styles.options, inline ? styles.inline : null]}>
        {options.map((option) => {
          const selected = value === option.value;
          const off = disabled || option.disabled;
          return (
            <Pressable
              key={option.value}
              onPress={() => !off && onValueChange(option.value)}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ selected, disabled: off }}
              style={[styles.row, off ? styles.disabled : null]}
            >
              <View style={[styles.dot, { borderColor: error ? palette.overdue : selected ? palette.accent : palette.pending }]}>
                {selected ? <View style={[styles.inner, { backgroundColor: palette.accent }]} /> : null}
              </View>
              <View style={styles.labels}>
                <Text size="base">{option.label}</Text>
                {option.description ? (
                  <Text size="xs" tone="tertiary">
                    {option.description}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
      {error ? (
        <Text size="xs" tone="danger" accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text size="xs" tone="tertiary">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
