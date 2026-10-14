import { useState } from 'react';
import styles from './CheckMark.module.css';

/**
 * Counts the rising edges of `on`, but only after the first render: a list that loads already
 * marked must paint its checks settled, while every new marking increments the count and the
 * caller uses it as a `key` to replay the draw.
 */
export function useTurnedOn(on: boolean): number {
  const [count, setCount] = useState(0);
  // The previous value lives in state, not a ref: a render React abandons must not leave behind a
  // "previous" that swallows the next marking.
  const [previous, setPrevious] = useState(on);
  if (on !== previous) {
    setPrevious(on);
    if (on) setCount(count + 1);
  }
  return count;
}

/**
 * The check that draws itself. `animate` is driven by the caller through `useTurnedOn`; with it
 * off the mark paints in its final state, so a rendered list never redraws its checks on load.
 */
export function CheckMark({ animate }: { animate: boolean }) {
  return (
    <svg
      className={[styles.mark, animate ? styles.animate : ''].filter(Boolean).join(' ')}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8.5l3.2 3L13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}
