import { TILE_STATE_TOKEN, type PracticeTileContract, type TileGridContract } from '@lucasfeitosatech/design-core';
import type { ReactNode } from 'react';
import { CheckMark, useTurnedOn } from '../internal/CheckMark';
import { Text } from '../Text';
import styles from './PracticeTile.module.css';

export type PracticeTileProps = PracticeTileContract;
export type TileGridProps = TileGridContract & { children?: ReactNode };

/**
 * A tile that toggles, with its own name and a mono line under it. The state is a checkbox state
 * and not a pressed one, as on native: `partial` reaches assistive technology as
 * `aria-checked="mixed"`, and it differs from `done` in shape — a half fill without the check — not
 * only in colour (D-03).
 */
export function PracticeTile({ label, meta, state = 'idle', onPress, disabled = false }: PracticeTileProps) {
  const token = TILE_STATE_TOKEN[state];
  // A grid that loads already marked paints its checks settled; only a new `done` pops and draws.
  const turnCount = useTurnedOn(state === 'done');
  return (
    <button
      type="button"
      className={[styles.tile, styles[`state-${state}`]].join(' ')}
      role="checkbox"
      aria-checked={state === 'partial' ? 'mixed' : state === 'done'}
      disabled={disabled || !onPress}
      onClick={onPress}
    >
      {/* The key restarts the pop on every new `done`; the mark re-renders its content either way. */}
      <span
        key={turnCount}
        className={[styles.mark, state === 'done' && turnCount > 0 ? styles.popIn : ''].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        {token.half ? <span className={styles.half} /> : null}
        {token.mark && !token.half ? (
          <span className={styles.fill}>
            <CheckMark animate={turnCount > 0} />
          </span>
        ) : null}
      </span>
      <span className={styles.labels}>
        <Text size="base" weight="medium" lines={2}>
          {label}
        </Text>
        {meta ? (
          <Text size="xs" tone="tertiary" mono>
            {meta}
          </Text>
        ) : null}
      </span>
    </button>
  );
}

/**
 * The two-column grid the tiles sit in. It owns the gap and the group announcement; a tile never
 * knows how many neighbours it has. Tiles wrap rather than shrink, so 120 % type costs a row and
 * never a truncated name.
 */
export function TileGrid({ label, children }: TileGridProps) {
  return (
    <div className={styles.grid} role="group" aria-label={label}>
      {children}
    </div>
  );
}
