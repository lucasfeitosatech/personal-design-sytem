import { PROGRESS_FILL_MS, type ProgressBarContract } from '@lucasfeitosatech/design-core';
import type { CSSProperties } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressBarProps = ProgressBarContract & { className?: string };

/**
 * A measured share of something — received of expected, a category of the total. Not a loading
 * indicator: it states a figure, and `role="meter"` tells the reader so, with the value text when
 * the app gives one. The first fill is a keyframe from zero; later changes are a transition on the
 * same transform, so the bar reads as one movement, not two mechanisms.
 */
export function ProgressBar({ value, label, valueText, tone = 'accent', size = 'md', delayMs, className }: ProgressBarProps) {
  // The contract promises 0..1; clamp so a bad figure cannot overflow the track.
  const clamped = Math.min(1, Math.max(0, value));
  const fillStyle = {
    // The keyframe and the resting transform read the same property, which is what lets the
    // first fill hand over to the transition without a jump.
    '--ds-progress': clamped,
    animationDuration: `${PROGRESS_FILL_MS}ms`,
    animationDelay: `${delayMs ?? 0}ms`,
  } as CSSProperties;

  return (
    <div
      className={[styles.bar, styles[`size-${size}`], className ?? ''].filter(Boolean).join(' ')}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={clamped}
      aria-valuetext={valueText}
    >
      <span className={[styles.fill, styles[`tone-${tone}`]].join(' ')} style={fillStyle} />
    </div>
  );
}
