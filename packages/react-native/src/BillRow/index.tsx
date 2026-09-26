import { BILL_ROW_MIN_HEIGHT, type BillRowContract } from '@lucasfeitosatech/design-core';
import { Pressable, View } from 'react-native';
import { Chip } from '../Chip';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type BillRowProps = BillRowContract;

/**
 * A row that is read, with one control at its end. The row itself is not pressable: it leads
 * nowhere, and a row that both reads and navigates makes the control beside it ambiguous.
 *
 * The name truncates, the figure never does: a cut amount is worse than a cut name.
 */
export function BillRow({ name, status, meta, amount, action, muted = false }: BillRowProps) {
  const { palette } = useTheme();

  return (
    <View style={[styles.row, { minHeight: BILL_ROW_MIN_HEIGHT }]}>
      <View style={styles.main}>
        <Text size="base" tone={muted ? 'secondary' : 'default'} lines={1} maxFontSizeMultiplier={1.2}>
          {name}
        </Text>
        <View style={styles.meta}>
          {status ? <Chip label={status.label} tone={status.tone} /> : null}
          {meta ? (
            <Text size="xs" tone="tertiary" mono maxFontSizeMultiplier={1.2}>
              {meta}
            </Text>
          ) : null}
        </View>
      </View>

      <Text size="base" weight="medium" mono tone={muted ? 'secondary' : 'default'} maxFontSizeMultiplier={1.2} style={styles.amount}>
        {amount}
      </Text>

      {action ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action.label}
          accessibilityState={{ disabled: action.disabled === true, checked: action.done }}
          disabled={action.disabled}
          onPress={action.onPress}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: action.done ? palette.paidSoft : palette.surface,
              borderColor: action.done ? palette.accentBorder : palette.border,
            },
            pressed && !action.disabled ? { backgroundColor: palette.surfaceRaised } : null,
            action.disabled ? styles.disabled : null,
          ]}
        >
          {action.icon ?? (
            <Text size="lg" tone="accent">
              ✓
            </Text>
          )}
        </Pressable>
      ) : null}
    </View>
  );
}
