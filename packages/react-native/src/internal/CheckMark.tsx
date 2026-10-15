import { motion } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useReduceMotion } from './useReduceMotion';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * The native translation of `--ds-ease-spring`. React Native has no CSS `linear(...)` timing, so
 * the pop is a real spring with the constants the web curve was tuned around.
 */
const SPRING = { damping: 14, stiffness: 180, mass: 1 } as const;

const CHECK_PATH = 'M3 8.5l3.2 3L13 4.5';
/**
 * The stroke is two straight segments, so its length is exact. The web normalizes with
 * `pathLength="1"`; the native `Path` has no such attribute, so the unit dash is the measured
 * length instead.
 */
const CHECK_LENGTH = Math.hypot(3.2, 3) + Math.hypot(6.8, 7);

/**
 * Counts the rising edges of `on`, but only after the first render: a list that loads already
 * marked must paint its checks settled, while every new marking increments the count, and the
 * caller uses it as a `key` to replay the pop and the draw.
 *
 * The previous value lives in state, not a ref: a render React abandons must not leave behind a
 * "previous" that swallows the next marking.
 */
export function useTurnedOn(on: boolean): number {
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState(on);
  if (on !== previous) {
    setPrevious(on);
    if (on) setCount(count + 1);
  }
  return count;
}

/**
 * The check that draws itself. The offset runs from the full length (empty) to zero (drawn)
 * through a unit dash, the same trick the web uses with `stroke-dashoffset`. It runs on the JS
 * thread on purpose: the native driver covers only transform and opacity, and neither is this.
 */
export function CheckMark({ animate, size = 16, color }: { animate: boolean; size?: number; color: string }) {
  const reduced = useReduceMotion();
  // A mark that arrives settled (a list that loads already marked, or reduced motion) paints drawn.
  const offset = useRef(new Animated.Value(animate && !reduced ? CHECK_LENGTH : 0)).current;

  useEffect(() => {
    if (!animate || reduced) {
      offset.setValue(0);
      return;
    }
    const draw = Animated.timing(offset, {
      toValue: 0,
      duration: motion.base,
      delay: 60,
      useNativeDriver: false,
    });
    draw.start();
    return () => draw.stop();
  }, [animate, reduced, offset]);

  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <AnimatedPath
        d={CHECK_PATH}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={CHECK_LENGTH}
        strokeDashoffset={offset}
      />
    </Svg>
  );
}

/**
 * The container a new mark pops from. It owns the scale, so the caller restarts the pop by
 * changing its `key` on every new marking — the same trick the web uses to replay its keyframe —
 * and a reduced motion paints the final scale directly.
 */
export function PopMark({ animate, size, style, children }: { animate: boolean; size: number; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  const reduced = useReduceMotion();
  const scale = useRef(new Animated.Value(animate && !reduced ? 0.85 : 1)).current;

  useEffect(() => {
    if (!animate || reduced) {
      scale.setValue(1);
      return;
    }
    const pop = Animated.spring(scale, { toValue: 1, ...SPRING, useNativeDriver: true });
    pop.start();
    return () => pop.stop();
  }, [animate, reduced, scale]);

  return <Animated.View style={[{ width: size, height: size }, style, { transform: [{ scale }] }]}>{children}</Animated.View>;
}
