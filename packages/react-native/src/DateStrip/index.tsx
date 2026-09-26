import { DATE_STRIP_DAY_HEIGHT, type DateStripContract } from '@lucasfeitosatech/design-core';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type DateStripProps = DateStripContract;

/**
 * A week to move between. The dot marks a day that has something in it, and it is never the only
 * signal: each day's assistive label says so in words, because a 4 pt dot is not information.
 *
 * The step controls are text glyphs — the system ships no icon set, and this row has to work before
 * an application picks one.
 */
export function DateStrip({
  days,
  selected,
  onSelect,
  onPrevious,
  onNext,
  previousLabel = 'Semana anterior',
  nextLabel = 'Próxima semana',
  nextDisabled = false,
}: DateStripProps) {
  const { palette } = useTheme();

  return (
    <View style={styles.strip}>
      <Step glyph="‹" label={previousLabel} onPress={onPrevious} />
      <View style={styles.days}>
        {days.map((day) => {
          const on = day.key === selected;
          return (
            <Pressable
              key={day.key}
              accessibilityRole="button"
              accessibilityLabel={day.label}
              accessibilityState={{ selected: on }}
              onPress={() => onSelect(day.key)}
              style={({ pressed }) => [
                styles.day,
                { height: DATE_STRIP_DAY_HEIGHT, backgroundColor: on ? palette.accent : 'transparent' },
                pressed && !on ? { backgroundColor: palette.surfaceRaised } : null,
              ]}
            >
              <Text size="xs" maxFontSizeMultiplier={1.2} style={{ color: on ? palette.onAccent : palette.textTertiary }}>
                {day.weekday}
              </Text>
              <Text size="base" weight="medium" mono maxFontSizeMultiplier={1.2} style={{ color: on ? palette.onAccent : palette.text }}>
                {day.day}
              </Text>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: day.marked ? (on ? palette.onAccent : palette.textTertiary) : 'transparent' },
                ]}
              />
            </Pressable>
          );
        })}
      </View>
      <Step glyph="›" label={nextLabel} onPress={onNext} disabled={nextDisabled} />
    </View>
  );
}

function Step({ glyph, label, onPress, disabled = false }: { glyph: string; label: string; onPress?: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || !onPress }}
      disabled={disabled || !onPress}
      onPress={onPress}
      hitSlop={4}
      style={[styles.step, disabled || !onPress ? styles.disabled : null]}
    >
      <Text size="xl" tone="secondary">
        {glyph}
      </Text>
    </Pressable>
  );
}
