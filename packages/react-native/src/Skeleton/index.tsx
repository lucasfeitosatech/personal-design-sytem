import { SKELETON_PULSE_MS, SKELETON_SHAPE_HEIGHT, type SkeletonContract, type SkeletonGroupContract } from '@lucasfeitosatech/design-core';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, View, type DimensionValue } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type SkeletonProps = SkeletonContract;
export type SkeletonGroupProps = SkeletonGroupContract;

/**
 * A placeholder in the shape of the content that is coming, never a blocking spinner. It pulses, and
 * it stops pulsing when the system asks for reduced motion — a static block is still legible, which is
 * the point of drawing the shape.
 */
export function Skeleton({ shape = 'line', width, height }: SkeletonProps) {
  const { palette } = useTheme();
  const opacity = usePulse();

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles[shape],
        { height: height ?? SKELETON_SHAPE_HEIGHT[shape], width: (width ?? '100%') as DimensionValue, backgroundColor: palette.surfaceRaised, opacity },
      ]}
    />
  );
}

/** The announcement lives here: the blocks are decoration, and six of them are not six messages. */
export function SkeletonGroup({ label, card = false, children }: SkeletonGroupProps) {
  const { palette } = useTheme();
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityState={{ busy: true }}
      style={[styles.group, card ? [styles.groupCard, { backgroundColor: palette.surface, borderColor: palette.border }] : null]}
    >
      {children}
    </View>
  );
}

function usePulse(): Animated.Value | number {
  const value = useRef(new Animated.Value(1)).current;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active) setReduced(enabled);
      })
      .catch(() => undefined);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const half = SKELETON_PULSE_MS / 2;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, { toValue: 0.5, duration: half, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(value, { toValue: 1, duration: half, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [reduced, value]);

  return reduced ? 1 : value;
}
