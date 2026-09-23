import type { CheckboxContract } from '@lucasfeitosatech/design-core';
import { useEffect, useId, useRef } from 'react';
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
          <span className={[styles.box, error ? styles.invalid : ''].filter(Boolean).join(' ')} aria-hidden="true">
            <span className={styles.mark}>{checked === 'indeterminate' ? '–' : '✓'}</span>
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
