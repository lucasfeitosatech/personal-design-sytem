import { PROGRESS_FILL_MS, PROGRESS_TONE_TOKEN, type ProgressBarContract } from '@lucasfeitosatech/design-core';
import { easing, motion, radius, type Palette } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { useReduceMotion } from '../internal/useReduceMotion';
import { useTheme } from '../theme/ThemeProvider';

export type ProgressBarProps = ProgressBarContract;

const SIZES: Record<NonNullable<ProgressBarContract['size']>, number> = { sm: 4, md: 8 };

/**
 * A proportion the person can watch grow. The fill is scaled instead of its width being changed,
 * because the native driver animates transforms and not layout: the same reason the web scales a
 * full-width bar. The scale runs about the centre, so a compensating translate keeps the left
 * edge planted — `transformOrigin` is newer than this package's React Native peer range, and the
 * two transforms stay on the native driver. The track keeps the pill radius, so the fill
 * inherits it from the track's overflow.
 *
 * The first paint fills from zero to the value (the web's reveal); a later change moves to the
 * new value. A reduced motion paints the final proportion directly.
 */
export function ProgressBar({ value, label, valueText, tone = 'accent', size = 'md', delayMs = 0 }: ProgressBarProps) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const clamped = Math.min(1, Math.max(0, value));
  const scale = useRef(new Animated.Value(0)).current;
  // The reveal is a one-shot: after the first fill, every run is a change.
  const revealed = useRef(false);
  // The track's measured width, for the translate that plants the left edge of the scaled fill.
  const [width, setWidth] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width);
  const translate = scale.interpolate({ inputRange: [0, 1], outputRange: [-width / 2, 0] });

  useEffect(() => {
    const isMount = !revealed.current;
    if (reduced) {
      // No reveal: the proportion is where it belongs from the first frame.
      scale.setValue(clamped);
      revealed.current = true;
      return;
    }
    const curve = Easing.bezier(...easing.out);
    // The reveal is the slower gesture of the system; a change is a normal one.
    const fill = Animated.timing(scale, {
      toValue: clamped,
      duration: isMount ? PROGRESS_FILL_MS : motion.slow,
      delay: isMount ? delayMs : 0,
      easing: curve,
      useNativeDriver: true,
    });
    fill.start();
    revealed.current = true;
    return () => fill.stop();
    // `delayMs` is only read on the first paint, the web's rule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clamped, reduced, scale]);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100), text: valueText }}
      onLayout={onLayout}
      style={[styles.track, { height: SIZES[size], borderRadius: radius.pill, backgroundColor: palette.surfaceRaised }]}
    >
      <Animated.View
        style={[
          styles.fill,
          { backgroundColor: palette[PROGRESS_TONE_TOKEN[tone] as keyof Palette], transform: [{ translateX: translate }, { scaleX: scale }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
  // Full width and height: the proportion lives in the scale, the width stays a layout constant
  // the native driver never touches.
  fill: { flex: 1, height: '100%' },
});
