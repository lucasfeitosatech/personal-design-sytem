import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * A border with a real hole in it, for a label that crosses the line. iOS cannot cut a gap in a
 * CALayer's stroke, so the outline stops being the frame's own border and becomes this drawing:
 * three clipped windows, each showing the slice of one full rectangle it covers. Nothing is
 * painted behind the label — the notch is a missing piece of the line, not a colour on top.
 */

/** How far below the top edge the cut starts. The stroke is at most 2pt, so 3 clears it. */
export const NOTCH_CUT = 3;

export type NotchedOutlineProps = {
  /** Measured field width; 0 before the first onLayout. */
  width: number;
  /** Measured field height. */
  height: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  /** Where the notch starts, along the top edge. */
  notchStart: number;
  /** How wide the notch is; animated so the gap opens and closes with the label. */
  notchWidth: Animated.AnimatedInterpolation<number> | Animated.Value;
};

export function NotchedOutline({ width, height, borderWidth, borderColor, borderRadius, notchStart, notchWidth }: NotchedOutlineProps) {
  // Before the first onLayout there is nothing to cut against: draw the whole border, uncut, so
  // the field does not flash without one.
  if (width === 0) {
    return <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderWidth, borderColor, borderRadius }]} />;
  }

  // The one rectangle every window shows: the field's full border, offset by the window's
  // negative origin so each window reveals exactly the slice of line it covers.
  const rectangle: ViewStyle = { position: 'absolute', width, height, borderWidth, borderColor, borderRadius };
  // Where the right window starts, and where its rectangle must sit to compensate.
  const rightLeft = Animated.add(notchWidth, notchStart);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* Left of the notch: from the field's left edge to the cut. */}
      <Animated.View style={[styles.piece, { left: 0, top: 0, width: notchStart, height }]}>
        <View style={[rectangle, { left: 0, top: 0 }]} />
      </Animated.View>
      {/* Right of the notch: its left edge follows the cut as the label grows. The rectangle is
          animated too, because a plain View's style type does not take an animated offset. */}
      <Animated.View style={[styles.piece, { left: rightLeft, top: 0, right: 0, height }]}>
        <Animated.View style={[rectangle, { left: Animated.multiply(rightLeft, -1), top: 0 }]} />
      </Animated.View>
      {/* Below the notch: the bottom edge under the label, starting under the stroke so the top
          line is absent exactly where the label crosses. */}
      <Animated.View style={[styles.piece, { left: notchStart, top: NOTCH_CUT, width: notchWidth, height: height - NOTCH_CUT }]}>
        <View style={[rectangle, { left: -notchStart, top: -NOTCH_CUT }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  /**
   * A clipped window into the shared rectangle. The pieces never overlap, so no stroke is painted
   * twice and the antialiasing does not darken at the seams.
   */
  piece: { position: 'absolute', overflow: 'hidden' },
});
