import { NUMBER_TWEEN_MS, tweenValue, type AnimatedNumberContract } from '@lucasfeitosatech/design-core';
import { useEffect, useRef, useState } from 'react';
import { useReduceMotion } from '../internal/useReduceMotion';
import { Text } from '../Text';

export type AnimatedNumberProps = AnimatedNumberContract;

// The runtime ships these from React Native's timer setup, but the type definitions do not, so the
// ambient declarations live with the only component that needs them.
declare global {
  function requestAnimationFrame(callback: (time: number) => void): number;
  function cancelAnimationFrame(id: number): void;
}

/**
 * A figure that settles on a new value instead of swapping it. The tween runs on
 * requestAnimationFrame with the core's cubic ease-out, so a number moves at the same pace
 * everywhere the system moves. The moving text is the component's only output: a screen reader
 * hears the final value through the `accessibilityLabel`, never the frames in between.
 */
export function AnimatedNumber({ value, format, durationMs, tone }: AnimatedNumberProps) {
  const reduced = useReduceMotion();
  const [displayed, setDisplayed] = useState(value);
  // The value the last painted frame showed. A new tween starts from it, not from the previous
  // prop, so an interrupting change resumes from what is on screen.
  const displayedRef = useRef(value);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const cancel = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
    const settle = () => {
      cancel();
      displayedRef.current = value;
      setDisplayed(value);
    };

    // Reduced motion, or a value that has not moved: the figure is already where it belongs.
    if (reduced || displayedRef.current === value) {
      settle();
      return;
    }

    const from = displayedRef.current;
    const duration = durationMs ?? NUMBER_TWEEN_MS;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed >= duration) {
        // Land on the exact prop, not on the last eased sample.
        settle();
        return;
      }
      displayedRef.current = tweenValue(from, value, elapsed, duration);
      setDisplayed(displayedRef.current);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    // Interrupted (a new value, a new duration, unmount): stop where the screen is. Settling here
    // would jump to the old target before the next tween starts.
    return cancel;
  }, [value, durationMs, reduced]);

  return (
    <Text mono size="base" tone={tone} accessibilityLabel={format(value)}>
      {format(displayed)}
    </Text>
  );
}
