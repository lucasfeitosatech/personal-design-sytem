import { NUMBER_TWEEN_MS, faceGeometry, tweenValue, type MoodFaceContract } from '@lucasfeitosatech/design-core';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './MoodFace.module.css';

export type MoodFaceProps = MoodFaceContract & { className?: string };

/** Where the face rests when nothing is marked: the middle, faded. */
const REST = 50;

/**
 * A face for a level, from the core's geometry. A new level bends the mouth and brows with the
 * number tween (the same pace as an AnimatedNumber beside it) instead of jumping; the paths are
 * recomputed per frame, which works in every browser, where a CSS transition of `d` does not.
 *
 * Decorative unless it has a `label`: next to a slider the value is already announced.
 */
export function MoodFace({ level, size = 88, label, className }: MoodFaceProps) {
  const reduced = useReducedMotion();
  const target = level ?? REST;
  const [shown, setShown] = useState(target);
  const shownRef = useRef(target);

  useEffect(() => {
    if (reduced || shownRef.current === target) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    const from = shownRef.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      shownRef.current = elapsed >= NUMBER_TWEEN_MS ? target : tweenValue(from, target, elapsed, NUMBER_TWEEN_MS);
      setShown(shownRef.current);
      if (elapsed < NUMBER_TWEEN_MS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  const face = faceGeometry(shown);
  return (
    <svg
      className={[styles.face, level === null ? styles.empty : '', className ?? ''].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle className={styles.head} cx={50} cy={50} r={44} strokeWidth={2.5} />
      <circle className={styles.cheek} cx={27} cy={62} r={7} opacity={face.cheek} />
      <circle className={styles.cheek} cx={73} cy={62} r={7} opacity={face.cheek} />
      <path className={styles.line} d={face.browLeft} strokeWidth={3} />
      <path className={styles.line} d={face.browRight} strokeWidth={3} />
      <ellipse className={styles.eye} cx={38} cy={48} rx={4.2} ry={4.6} />
      <ellipse className={styles.eye} cx={62} cy={48} rx={4.2} ry={4.6} />
      <path className={styles.line} d={face.mouth} strokeWidth={3.5} />
    </svg>
  );
}
