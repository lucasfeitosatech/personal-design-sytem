import { type DateStripContract } from '@lucasfeitosatech/design-core';
import { Text } from '../Text';
import styles from './DateStrip.module.css';

export type DateStripProps = DateStripContract;

/**
 * A week to move between. The dot marks a day that has something in it, and it is never the only
 * signal: each day's accessible label says so in words, because a 4 px dot is not information.
 *
 * The step controls are text glyphs — the system ships no icon set, and this row has to work
 * before an application picks one.
 */
export function DateStrip({
  days,
  selected,
  onSelect,
  onPrevious,
  onNext,
  previousLabel = 'Semana anterior',
  nextLabel = 'Próxima semana',
  nextDisabled = false,
}: DateStripProps) {
  return (
    <div className={styles.strip}>
      <Step glyph="‹" label={previousLabel} onPress={onPrevious} />
      <div className={styles.days}>
        {days.map((day) => {
          const on = day.key === selected;
          return (
            <button
              key={day.key}
              type="button"
              className={[styles.day, on ? styles.on : ''].filter(Boolean).join(' ')}
              aria-label={day.label}
              aria-pressed={on}
              onClick={() => onSelect(day.key)}
            >
              <span className={styles.cell} aria-hidden="true">
                <Text as="span" size="xs" className={styles.weekday}>
                  {day.weekday}
                </Text>
                <Text as="span" size="base" weight="medium" mono className={styles.number}>
                  {day.day}
                </Text>
                <span className={[styles.dot, day.marked ? styles.marked : ''].filter(Boolean).join(' ')} />
              </span>
            </button>
          );
        })}
      </div>
      <Step glyph="›" label={nextLabel} onPress={onNext} disabled={nextDisabled} />
    </div>
  );
}

function Step({ glyph, label, onPress, disabled = false }: { glyph: string; label: string; onPress?: () => void; disabled?: boolean }) {
  return (
    <button type="button" className={styles.step} aria-label={label} disabled={disabled || !onPress} onClick={onPress}>
      <span aria-hidden="true">{glyph}</span>
    </button>
  );
}
