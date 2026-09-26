import { CHIP_TONE_GLYPH, type ChipContract } from '@lucasfeitosatech/design-core';
import styles from './Chip.module.css';

export type ChipProps = ChipContract & {
  /** Makes the chip a button. Without it the chip is a label and is not focusable. */
  onClick?: () => void;
};

/** A small label, optionally selectable, optionally removable. */
export function Chip({ label, tone = 'neutral', size = 'sm', icon, mono = false, selected, onRemove, removeLabel = 'Remover', disabled, onClick }: ChipProps) {
  const classes = [styles.chip, styles[`tone-${tone}`], size === 'md' ? styles.control : '', selected ? styles.selected : '', mono ? 'ds-mono' : '', onClick ? styles.interactive : '']
    .filter(Boolean)
    .join(' ');
  const body = (
    <>
      {icon ?? CHIP_TONE_GLYPH[tone] ? (
        <span className={styles.icon} aria-hidden="true">
          {icon ?? CHIP_TONE_GLYPH[tone]}
        </span>
      ) : null}
      <span className={styles.label}>{label}</span>
    </>
  );

  return (
    <span className={styles.wrap}>
      {onClick ? (
        <button type="button" className={classes} onClick={onClick} aria-pressed={selected} disabled={disabled}>
          {body}
        </button>
      ) : (
        <span className={classes}>{body}</span>
      )}
      {onRemove ? (
        <button
          type="button"
          className={styles.remove}
          onClick={onRemove}
          aria-label={`${removeLabel} ${typeof label === 'string' ? label : ''}`.trim()}
          disabled={disabled}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </span>
  );
}
