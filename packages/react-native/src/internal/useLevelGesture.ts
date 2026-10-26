import { useRef, useState } from 'react';
import { PanResponder, type GestureResponderHandlers, type LayoutChangeEvent } from 'react-native';

/** Movement past which a touch is a drag along the control, or a scroll the page may take back. */
const SLOP = 6;

type Options = {
  value: number | null;
  onValueChange: (value: number) => void;
  /** The level under a point, given the control's measured width. */
  levelAt: (x: number, width: number) => number;
  disabled?: boolean;
};

/**
 * Tap and drag on a level control, with the core's `PanResponder` — no gesture library.
 *
 * A tap marks where it lands. A drag marks as it goes, once it has moved more along the control
 * than across it; a touch that turns vertical first is handed back, so the screen still scrolls
 * when a thumb crosses the control on its way down. The responder is the control itself: every
 * child is `pointerEvents="none"`, so `locationX` is always measured against the control.
 */
export function useLevelGesture({ value, onValueChange, levelAt, disabled }: Options) {
  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef(0);
  const moved = useRef(false);
  const latest = useRef({ value, onValueChange, levelAt, disabled, width });
  latest.current = { value, onValueChange, levelAt, disabled, width };

  const emit = (x: number) => {
    const current = latest.current;
    const next = current.levelAt(x, current.width);
    if (next !== current.value) {
      current.value = next;
      current.onValueChange(next);
    }
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !latest.current.disabled,
      onMoveShouldSetPanResponder: (_event, gesture) => !latest.current.disabled && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      // A drag along the control keeps the touch; anything else lets the scroll take it.
      onPanResponderTerminationRequest: () => !moved.current,
      onPanResponderGrant: (event) => {
        start.current = event.nativeEvent.locationX;
        moved.current = false;
      },
      onPanResponderMove: (_event, gesture) => {
        if (!moved.current) {
          if (Math.abs(gesture.dx) < SLOP || Math.abs(gesture.dx) < Math.abs(gesture.dy)) return;
          moved.current = true;
          setDragging(true);
        }
        emit(start.current + gesture.dx);
      },
      onPanResponderRelease: () => {
        if (!moved.current) emit(start.current);
        moved.current = false;
        setDragging(false);
      },
      onPanResponderTerminate: () => {
        moved.current = false;
        setDragging(false);
      },
    }),
  ).current;

  const onLayout = (event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width);
  const panHandlers: GestureResponderHandlers = responder.panHandlers;

  return { width, dragging, onLayout, panHandlers };
}
