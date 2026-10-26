import { LEVEL_KNOB_SIZE, LEVEL_STEP, adjustLevel, levelAt, levelOffset, type LevelSliderContract } from '@lucasfeitosatech/design-core';
import { easing, motion, radius, tap } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type AccessibilityActionEvent } from 'react-native';
import { Text } from '../Text';
import { useLevelGesture } from '../internal/useLevelGesture';
import { useReduceMotion } from '../internal/useReduceMotion';
import { useTheme } from '../theme/ThemeProvider';

export type LevelSliderProps = LevelSliderContract;

const RAIL = 6;
const INSET = LEVEL_KNOB_SIZE / 2;

/**
 * A self-reported level on a track. The knob travels between its own radius at each end, so at 0
 * and 100 it stays inside the track; the fill ends under its centre.
 *
 * Nothing marked draws the bare rail with no knob. A tap marks where it lands, a drag marks as it
 * goes (see `useLevelGesture`); a screen reader adjusts it as `adjustable`, starting from the
 * middle, and hears the app's text for the value.
 */
export function LevelSlider({ value, onValueChange, label, valueText, emptyText, minLabel, maxLabel, step = LEVEL_STEP, disabled }: LevelSliderProps) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const gesture = useLevelGesture({ value, onValueChange, levelAt: (x, width) => levelAt(x, width, INSET, step), disabled });
  const position = useRef(new Animated.Value(INSET)).current;
  const placed = useRef(false);

  useEffect(() => {
    if (value === null || gesture.width === 0) return;
    const target = levelOffset(value, gesture.width, INSET);
    // Under the finger the knob follows at once; a tap or an assistive step glides to the spot.
    if (!placed.current || gesture.dragging || reduced) {
      position.setValue(target);
      placed.current = true;
      return;
    }
    const glide = Animated.timing(position, { toValue: target, duration: motion.fast, easing: Easing.bezier(...easing.out), useNativeDriver: false });
    glide.start();
    return () => glide.stop();
  }, [value, gesture.width, gesture.dragging, reduced, position]);

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const name = event.nativeEvent.actionName;
    if (name === 'increment' || name === 'decrement') onValueChange(adjustLevel(value, name, step));
  };

  return (
    <View style={styles.wrap}>
      <View
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ text: value === null ? emptyText : valueText(value) }}
        accessibilityState={{ disabled }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={onAccessibilityAction}
        onLayout={gesture.onLayout}
        {...gesture.panHandlers}
        style={[styles.track, disabled ? styles.disabled : null]}
      >
        <View pointerEvents="none" style={[styles.rail, { backgroundColor: palette.surfaceRaised }]} />
        {value !== null ? (
          <>
            <Animated.View pointerEvents="none" style={[styles.rail, { width: position, right: undefined, backgroundColor: palette.accent }]} />
            <Animated.View
              pointerEvents="none"
              style={[
                styles.knob,
                { backgroundColor: palette.accent, borderColor: palette.surface, transform: [{ translateX: Animated.subtract(position, INSET) }] },
              ]}
            />
          </>
        ) : null}
      </View>
      {minLabel || maxLabel ? (
        <View style={styles.ends} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Text size="xs" tone="tertiary">
            {minLabel ?? ''}
          </Text>
          <Text size="xs" tone="tertiary">
            {maxLabel ?? ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 2 },
  track: { height: tap, justifyContent: 'center' },
  disabled: { opacity: 0.55 },
  rail: { position: 'absolute', left: 0, right: 0, top: (tap - RAIL) / 2, height: RAIL, borderRadius: radius.pill },
  knob: {
    position: 'absolute',
    left: 0,
    top: (tap - LEVEL_KNOB_SIZE) / 2,
    width: LEVEL_KNOB_SIZE,
    height: LEVEL_KNOB_SIZE,
    borderRadius: radius.pill,
    // The surface-coloured ring separates the knob from the accent fill it sits on.
    borderWidth: 3,
  },
  ends: { flexDirection: 'row', justifyContent: 'space-between' },
});
