import { NUMBER_TWEEN_MS, faceGeometry, type MoodFaceContract } from '@lucasfeitosatech/design-core';
import { easing } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Circle, Ellipse, Path, Svg } from 'react-native-svg';
import { useReduceMotion } from '../internal/useReduceMotion';
import { useTheme } from '../theme/ThemeProvider';

export type MoodFaceProps = MoodFaceContract;

/** Where the face rests when nothing is marked: the middle, faded. */
const REST = 50;

/**
 * A face for a level, drawn from the core's geometry. A new level bends the mouth and brows over
 * the number tween's duration — a face and a figure changing together settle together — instead of
 * jumping. The paths are recomputed per frame from the animated level, because an SVG path cannot
 * be interpolated by the native driver.
 *
 * Decorative unless it has a `label`: next to a slider the value is already announced.
 */
export function MoodFace({ level, size = 88, label }: MoodFaceProps) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const animated = useRef(new Animated.Value(level ?? REST)).current;
  const [shown, setShown] = useState(level ?? REST);

  useEffect(() => {
    const id = animated.addListener(({ value }) => setShown(value));
    return () => animated.removeListener(id);
  }, [animated]);

  useEffect(() => {
    const target = level ?? REST;
    if (reduced) {
      animated.setValue(target);
      return;
    }
    const tween = Animated.timing(animated, { toValue: target, duration: NUMBER_TWEEN_MS, easing: Easing.bezier(...easing.out), useNativeDriver: false });
    tween.start();
    return () => tween.stop();
  }, [level, reduced, animated]);

  const face = faceGeometry(shown);
  const a11y = label
    ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel: label }
    : { accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' as const };

  return (
    <Animated.View {...a11y} style={{ width: size, height: size, opacity: level === null ? 0.4 : 1 }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx={50} cy={50} r={44} fill={palette.accentSoft} stroke={palette.accent} strokeWidth={2.5} />
        <Circle cx={27} cy={62} r={7} fill={palette.accent} opacity={face.cheek} />
        <Circle cx={73} cy={62} r={7} fill={palette.accent} opacity={face.cheek} />
        <Path d={face.browLeft} fill="none" stroke={palette.text} strokeWidth={3} strokeLinecap="round" />
        <Path d={face.browRight} fill="none" stroke={palette.text} strokeWidth={3} strokeLinecap="round" />
        <Ellipse cx={38} cy={48} rx={4.2} ry={4.6} fill={palette.text} />
        <Ellipse cx={62} cy={48} rx={4.2} ry={4.6} fill={palette.text} />
        <Path d={face.mouth} fill="none" stroke={palette.text} strokeWidth={3.5} strokeLinecap="round" />
      </Svg>
    </Animated.View>
  );
}
