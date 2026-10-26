import { BATTERY_HEIGHT, LEVEL_STEP, adjustLevel, batteryLevelAt, type BatteryInputContract } from '@lucasfeitosatech/design-core';
import { easing, motion, radius } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type AccessibilityActionEvent } from 'react-native';
import { useLevelGesture } from '../internal/useLevelGesture';
import { useReduceMotion } from '../internal/useReduceMotion';
import { useTheme } from '../theme/ThemeProvider';

export type BatteryInputProps = BatteryInputContract;

const BORDER = 2;
const PADDING = 5;
/** Border plus padding: where the cells start inside the body. */
const INSET = BORDER + PADDING;
const CELLS = 10;

/**
 * A level drawn as a charge: ten cells, filled up to the one that was touched. The charge is the
 * accent at any level — an empty battery is not an alarm, and nothing here turns red.
 *
 * Nothing marked draws the empty body. Tap and drag as in `useLevelGesture`; a screen reader
 * adjusts it as `adjustable` in steps of the scale.
 */
export function BatteryInput({ value, onValueChange, label, valueText, emptyText, step = LEVEL_STEP, disabled }: BatteryInputProps) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const gesture = useLevelGesture({ value, onValueChange, levelAt: (x, width) => batteryLevelAt(x, width, INSET), disabled });
  const charge = useRef(new Animated.Value(value ?? 0)).current;

  useEffect(() => {
    const target = value ?? 0;
    if (gesture.dragging || reduced) {
      charge.setValue(target);
      return;
    }
    const fill = Animated.timing(charge, { toValue: target, duration: motion.base, easing: Easing.bezier(...easing.out), useNativeDriver: false });
    fill.start();
    return () => fill.stop();
  }, [value, gesture.dragging, reduced, charge]);

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const name = event.nativeEvent.actionName;
    if (name === 'increment' || name === 'decrement') onValueChange(adjustLevel(value, name, step));
  };

  return (
    <View style={[styles.row, disabled ? styles.disabled : null]}>
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
        style={[styles.body, { borderColor: palette.textTertiary }]}
      >
        <View pointerEvents="none" style={[styles.cells, { backgroundColor: palette.surfaceRaised }]}>
          <Animated.View
            style={[styles.charge, { backgroundColor: palette.accent, width: charge.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]}
          />
          {Array.from({ length: CELLS - 1 }, (_, i) => (
            <View key={i} style={[styles.divider, { left: `${(i + 1) * CELLS}%`, backgroundColor: palette.surface }]} />
          ))}
        </View>
      </View>
      <View style={[styles.cap, { backgroundColor: palette.textTertiary }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  disabled: { opacity: 0.55 },
  body: { flex: 1, height: BATTERY_HEIGHT, borderWidth: BORDER, borderRadius: radius.md + 2, padding: PADDING },
  cells: { flex: 1, borderRadius: radius.sm + 1, overflow: 'hidden' },
  charge: { position: 'absolute', left: 0, top: 0, bottom: 0 },
  divider: { position: 'absolute', top: 0, bottom: 0, width: 2, marginLeft: -1 },
  cap: { width: 7, height: 26, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
});
