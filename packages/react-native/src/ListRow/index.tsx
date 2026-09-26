import { LIST_ROW_MIN_HEIGHT, type ListRowContract } from '@lucasfeitosatech/design-core';
import { Children, type ReactNode, isValidElement } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type ListRowProps = ListRowContract;

/**
 * A row that leads somewhere: injected icon, label, mono meta, chevron. The whole row is the target,
 * which is why the minimum height is above the 44 pt rule and not equal to it.
 */
export function ListRow({ label, icon, meta, detail, trailing = 'chevron', onPress, disabled = false }: ListRowProps) {
  const { palette } = useTheme();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled }}
      accessibilityLabel={meta === undefined ? undefined : `${label}, ${String(meta)}`}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.row, { minHeight: LIST_ROW_MIN_HEIGHT }, pressed ? { backgroundColor: palette.surfaceRaised } : null, disabled ? styles.disabled : null]}
    >
      {icon ? <View style={[styles.icon, { backgroundColor: palette.surfaceRaised }]}>{icon}</View> : null}
      <View style={styles.main}>
        <Text lines={2} maxFontSizeMultiplier={1.2}>
          {label}
        </Text>
        {detail ? (
          <Text size="xs" tone="secondary" lines={2}>
            {detail}
          </Text>
        ) : null}
      </View>
      {meta !== undefined && meta !== null ? (
        <Text size="xs" tone="tertiary" mono>
          {meta}
        </Text>
      ) : null}
      {trailingNode(trailing)}
    </Pressable>
  );
}

function trailingNode(trailing: ListRowProps['trailing']): ReactNode {
  if (trailing === 'none') return null;
  if (trailing === 'chevron' || trailing === undefined) {
    return (
      <Text size="lg" tone="tertiary">
        ›
      </Text>
    );
  }
  return trailing;
}

/**
 * The list the rows sit in: it draws the hairline between them, so no row has to know whether it is
 * the first one. Rows inside a flush Card, as every screen of the product uses them.
 */
export function List({ children }: { children?: ReactNode }) {
  const { palette } = useTheme();
  const rows = Children.toArray(children).filter(isValidElement);
  return (
    <View>
      {rows.map((row, index) => (
        <View key={row.key ?? index} style={index === 0 ? null : [styles.separated, { borderTopColor: palette.borderSoft }]}>
          {row}
        </View>
      ))}
    </View>
  );
}
