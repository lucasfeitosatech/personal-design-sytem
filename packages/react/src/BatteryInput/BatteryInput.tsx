import { LEVEL_FIRST_ADJUST, LEVEL_STEP, batteryLevelAt, type BatteryInputContract } from '@lucasfeitosatech/design-core';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { useRef } from 'react';
import styles from './BatteryInput.module.css';

export type BatteryInputProps = BatteryInputContract & { className?: string };

/** Border plus padding of the body, where the cells begin. Mirrors the CSS. */
const INSET = 7;

/**
 * A level drawn as a charge in ten cells, filled up to the one that was touched. The charge is the
 * accent at any level: an empty battery is not an alarm.
 *
 * A pointer marks the cell under it and keeps marking while it is held and moved. The keys and the
 * reader go through a transparent `<input type="range">` over the body, so arrows, Home and End
 * work and the value is announced; the pointer is handled on the body so a tap fills up to its
 * cell instead of rounding to the nearest step.
 */
export function BatteryInput({ value, onValueChange, label, valueText, emptyText, step = LEVEL_STEP, disabled, className }: BatteryInputProps) {
  const body = useRef<HTMLDivElement>(null);
  const held = useRef(false);

  const markAt = (clientX: number) => {
    const box = body.current?.getBoundingClientRect();
    if (!box) return;
    const next = batteryLevelAt(clientX - box.left, box.width, INSET);
    if (next !== value) onValueChange(next);
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    held.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    markAt(event.clientX);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (held.current) markAt(event.clientX);
  };
  const release = () => {
    held.current = false;
  };
  // A key on an unmarked battery starts it at the middle, like the native assistive step.
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (value === null && ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      onValueChange(LEVEL_FIRST_ADJUST);
    }
  };

  return (
    <div className={[styles.row, disabled ? styles.disabled : '', className ?? ''].filter(Boolean).join(' ')}>
      <div
        ref={body}
        className={styles.body}
        style={{ '--ds-level': (value ?? 0) / 100 } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
      >
        <span className={styles.cells} aria-hidden="true">
          <span className={styles.charge} />
        </span>
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
          onChange={(event) => onValueChange(Number(event.currentTarget.value))}
          onKeyDown={onKeyDown}
          tabIndex={0}
        />
      </div>
      <span className={styles.cap} aria-hidden="true" />
    </div>
  );
}
