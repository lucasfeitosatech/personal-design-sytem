import { type BillRowContract } from '@lucasfeitosatech/design-core';
import { Chip } from '../Chip';
import { CheckMark, useTurnedOn } from '../internal/CheckMark';
import { Text } from '../Text';
import styles from './BillRow.module.css';

export type BillRowProps = BillRowContract;

/**
 * A row that is read, with one control at its end. The row itself is not pressable: it leads
 * nowhere, and a row that both reads and navigates makes the control beside it ambiguous.
 *
 * The name truncates, the figure never does: a cut amount is worse than a cut name. The control
 * carries the row's action by its accessible label — "Marcar Internet como paga" — and shows the
 * check when the action already happened.
 */
export function BillRow({ name, status, meta, amount, action, muted = false }: BillRowProps) {
  // `action.done` is what tells the row the bill is settled; a list that loads paid stays settled.
  const turnCount = useTurnedOn(Boolean(action?.done));
  return (
    <div className={[styles.row, muted ? styles.muted : ''].filter(Boolean).join(' ')}>
      <div className={styles.main}>
        <Text as="div" size="base" className={styles.name}>
          {name}
        </Text>
        <div className={styles.metaRow}>
          {status ? <Chip label={status.label} tone={status.tone} /> : null}
          {meta ? (
            <Text as="span" size="xs" tone="tertiary" mono>
              {meta}
            </Text>
          ) : null}
        </div>
      </div>

      <Text as="div" size="base" weight="medium" mono className={styles.amount}>
        {amount}
      </Text>

      {action ? (
        <button
          type="button"
          className={[styles.action, action.done ? styles.done : ''].filter(Boolean).join(' ')}
          aria-label={action.label}
          title={action.label}
          aria-pressed={action.done}
          disabled={action.disabled}
          onClick={action.onPress}
        >
          <span className={styles.glyph} aria-hidden="true">
            {action.icon ?? (
              <CheckMark key={turnCount} animate={Boolean(action.done) && turnCount > 0} />
            )}
          </span>
        </button>
      ) : null}
    </div>
  );
}
