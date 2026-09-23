import type { SwitchContract } from '@lucasfeitosatech/design-core';
import { Pressable, Switch as RNSwitch, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type SwitchProps = SwitchContract;

/**
 * The platform switch, not a drawn one: it carries the gesture, the animation and the accessibility
 * announcement each OS expects, and users recognise it. Only the colours come from the system.
 */
export function Switch({ checked, onCheckedChange, label, description, disabled }: SwitchProps) {
  const { palette } = useTheme();
  const toggle = () => !disabled && onCheckedChange(!checked);

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityHint={typeof description === 'string' ? description : undefined}
      accessibilityState={{ checked, disabled }}
      style={[styles.row, disabled ? styles.disabled : null]}
    >
      <RNSwitch
        value={checked}
        onValueChange={onCheckedChange}
        disabled={disabled}
        /* The control is inside a labelled Pressable; announcing it again would read twice. */
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        trackColor={{ false: palette.surfaceRaised, true: palette.accent }}
        thumbColor={palette.surface}
        ios_backgroundColor={palette.surfaceRaised}
      />
      <View style={styles.labels}>
        <Text size="base">{label}</Text>
        {description ? (
          <Text size="xs" tone="tertiary">
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
