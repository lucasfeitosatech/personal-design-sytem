import { useRef } from 'react';
import { Animated } from 'react-native';
import { useReduceMotion } from './useReduceMotion';

/** How far a pressed control sinks: enough to feel, too little to read as movement. */
const PRESSED = 0.97;

/**
 * Press feedback for the native controls: the target sinks a little under the finger and springs
 * back on release — the touch version of the web hover/active states. The scale runs on the native
 * driver, so it never waits on JavaScript; with reduced motion it stays still.
 */
export function usePressScale() {
  const reduced = useReduceMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const to = (value: number) => {
    if (reduced) return;
    Animated.spring(scale, { toValue: value, damping: 18, stiffness: 320, mass: 0.6, useNativeDriver: true }).start();
  };
  return { style: { transform: [{ scale }] }, onPressIn: () => to(PRESSED), onPressOut: () => to(1) };
}
