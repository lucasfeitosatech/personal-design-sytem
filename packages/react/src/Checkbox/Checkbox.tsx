import type { CheckboxContract } from '@lucasfeitosatech/design-core';
import { useEffect, useId, useRef } from 'react';
import { CheckMark, useTurnedOn } from '../internal/CheckMark';
import { Text } from '../Text';
import styles from './Checkbox.module.css';

export type CheckboxProps = CheckboxContract;

/**
 * Part of a form, unlike Switch which commits on the spot.
 *
 * `indeterminate` has no HTML attribute: it exists only as a DOM property, so it is set through a
 * ref on every render. Without that the parent box of a partially checked group looks unchecked.
 */
export function Checkbox({ checked, onCheckedChange, label, description, disabled, error }: CheckboxProps) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  // Only marks that happen after mount draw and pop: a form that loads checked paints settled.
  const turnCount = useTurnedOn(checked === true);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = checked === 'indeterminate';
  }, [checked]);

  return (
    <div className={[styles.wrap, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
      <div className={styles.row}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={styles.input}
          checked={checked === true}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? descriptionId}
          onChange={(event) => onCheckedChange(event.target.checked)}
        />
        <label className={styles.control} htmlFor={id}>
          {/* The key restarts the pop on every new marking; a box that loads checked never pops. */}
          <span
            key={turnCount}
            className={[styles.box, error ? styles.invalid : '', checked === true && turnCount > 0 ? styles.popIn : ''].filter(Boolean).join(' ')}
            aria-hidden="true"
          >
            {checked === 'indeterminate' ? (
              <span className={styles.mark}>–</span>
            ) : checked === true ? (
              <span className={styles.pop}>
                <CheckMark animate={turnCount > 0} />
              </span>
            ) : null}
          </span>
          <span className={styles.labels}>
            <Text size="base">{label}</Text>
            {description ? (
              <Text as="span" id={descriptionId} size="xs" tone="tertiary">
                {description}
              </Text>
            ) : null}
          </span>
        </label>
      </div>
      {error ? (
        <Text as="p" id={errorId} size="xs" tone="danger" role="alert" className={styles.error}>
          {error}
        </Text>
      ) : null}
    </div>
  );
}
