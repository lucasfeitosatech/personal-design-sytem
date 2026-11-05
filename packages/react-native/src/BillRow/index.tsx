import { BILL_ROW_MIN_HEIGHT, type BillRowContract } from '@lucasfeitosatech/design-core';
import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { Chip } from '../Chip';
import { CheckMark, PopMark, useTurnedOn } from '../internal/CheckMark';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type BillRowProps = BillRowContract & {
  /** The body (name, status, date, figure) opens somewhere. */
  onPressBody?: () => void;
  /** Announces the body as a button, naming the row: "Abrir detalhes de Internet". */
  bodyLabel?: string;
};

/**
 * A row that is read, with one control at its end. Without `onPressBody` the row itself is not
 * pressable: it leads nowhere, and a row that both reads and navigates makes the control beside it
 * ambiguous. With `onPressBody` the body becomes a second target beside the action — two buttons,
 * each announced on its own — because one target that reads and navigates is not reachable by a
 * screen reader that wants the details without paying.
 *
 * The name grows, the figure never does: a cut amount is worse than a cut name.
 */
export function BillRow({ name, status, meta, amount, action, muted = false, onPressBody, bodyLabel }: BillRowProps) {
  const { palette } = useTheme();
  // `action.done` is what tells the row the bill is settled; a list that loads paid stays settled.
  const turnCount = useTurnedOn(Boolean(action?.done));
  // Body and label together make the body a target; one without the other is a button with no name.
  const bodyIsTarget = onPressBody !== undefined && bodyLabel !== undefined;
  // The body reads what it shows: the name it was given, then state, date and figure. `bodyLabel`
  // already carries the bill's name, so the name is never repeated.
  const bodyAnnounce = [bodyLabel, status?.label, meta, amount].filter((part): part is string => part !== undefined && part !== '').join(', ');

  // Three bands: the name; the state beside the figure and the control; the meta as a footer with
  // the full width to grow into. Beside the chip, a long meta wrapped into a narrow column.
  // With `onPressBody` every band of the body opens it, but only the name band is a button (it
  // announces the whole body); the other bands stay plain text to a screen reader, never a second
  // body target competing with the control.
  const band = (style: StyleProp<ViewStyle>, children: ReactNode, announce: boolean) =>
    bodyIsTarget ? (
      <Pressable
        onPress={onPressBody}
        style={style}
        accessible={announce}
        accessibilityRole={announce ? 'button' : undefined}
        accessibilityLabel={announce ? bodyAnnounce : undefined}
      >
        {children}
      </Pressable>
    ) : (
      <View style={style}>{children}</View>
    );

  return (
    <View style={[styles.row, { minHeight: BILL_ROW_MIN_HEIGHT }]}>
      {band(
        styles.nameBand,
        // Medium, not semibold: the name stands above the footer, and a list of ten stays light.
        <Text size="base" weight="medium" tone={muted ? 'secondary' : 'default'} maxFontSizeMultiplier={1.2}>
          {name}
        </Text>,
        true,
      )}

      <View style={styles.middle}>
        {band(
          styles.state,
          <>
            <View style={styles.chip}>{status ? <Chip label={status.label} tone={status.tone} /> : null}</View>
            <Text size="base" weight="medium" mono tone={muted ? 'secondary' : 'default'} maxFontSizeMultiplier={1.2} style={styles.amount}>
              {amount}
            </Text>
          </>,
          false,
        )}

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
              // The key remounts the glyph on every new settlement, which replays the pop and the draw.
              <PopMark key={turnCount} animate={turnCount > 0} size={20}>
                <CheckMark animate={turnCount > 0} color={palette.accent} />
              </PopMark>
            )}
          </Pressable>
        ) : null}
      </View>

      {meta
        ? band(
            styles.footer,
            <Text size="xs" tone="tertiary" mono maxFontSizeMultiplier={1.2}>
              {meta}
            </Text>,
            false,
          )
        : null}
    </View>
  );
}
