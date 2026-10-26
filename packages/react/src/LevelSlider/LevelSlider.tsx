import { LEVEL_FIRST_ADJUST, LEVEL_KNOB_SIZE, LEVEL_STEP, type LevelSliderContract } from '@lucasfeitosatech/design-core';
import type { CSSProperties, SyntheticEvent } from 'react';
import { Text } from '../Text';
import styles from './LevelSlider.module.css';

export type LevelSliderProps = LevelSliderContract & { className?: string };

/**
 * A self-reported level on a track. A real `<input type="range">` sits over the drawing,
 * transparent: it carries the pointer, the arrow keys and the reader, and the drawing follows it.
 * The knob travels between its own radius at each end, so at 0 and 100 it stays inside the track.
 *
 * Nothing marked draws the bare rail with no knob, and the reader hears `emptyText`. The input
 * still needs a number underneath, so it rests at the middle; a click marks too, because a click on
 * the spot the input already holds fires no change.
 */
export function LevelSlider({ value, onValueChange, label, valueText, emptyText, minLabel, maxLabel, step = LEVEL_STEP, disabled, className }: LevelSliderProps) {
  const mark = (event: SyntheticEvent<HTMLInputElement>) => {
    const next = Number(event.currentTarget.value);
    if (next !== value) onValueChange(next);
  };
  const position = { '--ds-level': (value ?? 0) / 100, '--ds-level-knob': `${LEVEL_KNOB_SIZE}px` } as CSSProperties;

  return (
    <div className={[styles.wrap, disabled ? styles.disabled : '', className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.track} style={position}>
        <span className={styles.rail} aria-hidden="true" />
        {value !== null ? (
          <>
            <span className={styles.fill} aria-hidden="true" />
            <span className={styles.knob} aria-hidden="true" />
          </>
        ) : null}
        <input
          className={styles.input}
          type="range"
          min={0}
          max={100}
          step={step}
          value={value ?? LEVEL_FIRST_ADJUST}
          disabled={disabled}
          aria-label={label}
          aria-valuetext={value === null ? emptyText : valueText(value)}
          onChange={mark}
          onClick={mark}
        />
      </div>
      {minLabel || maxLabel ? (
        <div className={styles.ends} aria-hidden="true">
          <Text as="span" size="xs" tone="tertiary">
            {minLabel ?? ''}
          </Text>
          <Text as="span" size="xs" tone="tertiary">
            {maxLabel ?? ''}
          </Text>
        </div>
      ) : null}
    </div>
  );
}
