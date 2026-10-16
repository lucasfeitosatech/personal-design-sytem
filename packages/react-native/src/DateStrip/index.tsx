import { DATE_STRIP_DAY_HEIGHT, type DateStripContract } from '@lucasfeitosatech/design-core';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, type ScrollViewInstance, View } from 'react-native';
import { useReduceMotion } from '../internal/useReduceMotion';
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
 *
 * A day keeps its 44 pt width instead of sharing what the steps leave: when the week does not fit
 * the strip scrolls, because a day cell that shrinks to 39 pt is a target a finger misses.
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
  const reduced = useReduceMotion();
  const scroll = useRef<ScrollViewInstance>(null);
  // onLayout gives each day its offset in the content and the strip the width of the visible
  // window; together they say how far the selected day sits past the right edge.
  const dayOffsets = useRef(new Map<string, { x: number; width: number }>());
  const [windowWidth, setWindowWidth] = useState(0);
  // The window and the days lay out in an order the strip does not control, so every layout
  // re-arms the scroll: it runs the moment both the window and the selected day are known.
  const [layouts, setLayouts] = useState(0);

  // Seven 44 pt days do not fit every screen, so the strip scrolls — and a selection made past
  // the right edge would stay off-screen. The minimum scroll is the overflow of the day's right
  // edge; a day already fully visible costs zero.
  useEffect(() => {
    if (windowWidth === 0) return;
    const day = dayOffsets.current.get(selected);
    if (!day) return;
    const x = Math.max(0, day.x + day.width - windowWidth);
    scroll.current?.scrollTo({ x, animated: !reduced });
  }, [selected, layouts, windowWidth, reduced]);

  return (
    <View style={styles.strip}>
      <Step glyph="‹" label={previousLabel} onPress={onPrevious} />
      <ScrollView
        ref={scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.days}
        style={styles.daysScroll}
        onLayout={(event) => {
          setWindowWidth(event.nativeEvent.layout.width);
          setLayouts((count) => count + 1);
        }}
      >
        {days.map((day) => {
          const on = day.key === selected;
          return (
            <Pressable
              key={day.key}
              accessibilityRole="button"
              accessibilityLabel={day.label}
              accessibilityState={{ selected: on }}
              onPress={() => onSelect(day.key)}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                dayOffsets.current.set(day.key, { x, width });
                setLayouts((count) => count + 1);
              }}
              style={({ pressed }) => [
                styles.day,
                { minHeight: DATE_STRIP_DAY_HEIGHT, backgroundColor: on ? palette.accent : 'transparent' },
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
      </ScrollView>
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
      style={[styles.step, disabled || !onPress ? styles.disabled : null]}
    >
      <Text size="xl" tone="secondary">
        {glyph}
      </Text>
    </Pressable>
  );
}
