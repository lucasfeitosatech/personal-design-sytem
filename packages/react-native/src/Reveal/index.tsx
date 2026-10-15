import { easing, motion } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';
import { useReduceMotion } from '../internal/useReduceMotion';

export type RevealProps = {
  /** Position in a sequence: each step waits a little longer, so blocks arrive in reading order. */
  index?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/** The step between two blocks of a sequence, and the most a late block ever waits. */
const STEP_MS = 45;
const MAX_DELAY_MS = 270;

/**
 * The native counterpart of the web's scroll reveal: a block fades in and rises 8 pt when it
 * mounts. A phone screen is short, so mount time stands in for "enters the viewport". It plays
 * once — a re-render never replays it — and with reduced motion the block is simply there.
 */
export function Reveal({ index = 0, style, children }: RevealProps) {
  const reduced = useReduceMotion();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduced) {
      progress.setValue(1);
      return;
    }
    const enter = Animated.timing(progress, {
      toValue: 1,
      duration: motion.slow,
      delay: Math.min(index * STEP_MS, MAX_DELAY_MS),
      easing: Easing.bezier(...easing.out),
      useNativeDriver: true,
    });
    enter.start();
    return () => enter.stop();
    // Once per mount: the index of a block that is already in place does not replay it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] });
  return <Animated.View style={[style, { opacity: progress, transform: [{ translateY }] }]}>{children}</Animated.View>;
}
