import type { RadioGroupContract } from '@lucasfeitosatech/design-core';
import { useId } from 'react';
import { Text } from '../Text';
import styles from './RadioGroup.module.css';

export type RadioGroupProps = RadioGroupContract;

/**
 * One choice out of a few.
 *
 * A `fieldset` with a `legend` is what makes a screen reader announce the group label before each
 * option and count them, "2 of 3". A div with a heading does not. The error belongs to the group,
 * not to an option.
 */
export function RadioGroup({ value, onValueChange, options, label, hideLabel = false, hint, error, disabled, inline = false }: RadioGroupProps) {
  const name = useId();
  const hintId = hint && !error ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset className={styles.group} aria-describedby={errorId ?? hintId} aria-invalid={error ? true : undefined} disabled={disabled}>
      <legend className={[styles.legend, hideLabel ? 'ds-visually-hidden' : ''].filter(Boolean).join(' ')}>
        <Text size="sm" tone="secondary" weight="medium">
          {label}
        </Text>
      </legend>
      <div className={[styles.options, inline ? styles.inline : ''].filter(Boolean).join(' ')}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <div key={option.value} className={styles.row}>
              <input
                id={id}
                type="radio"
                name={name}
                className={styles.input}
                value={option.value}
                checked={value === option.value}
                disabled={option.disabled}
                onChange={() => onValueChange(option.value)}
              />
              <label className={styles.control} htmlFor={id}>
                <span className={[styles.dot, error ? styles.invalid : ''].filter(Boolean).join(' ')} aria-hidden="true" />
                <span className={styles.labels}>
                  <Text size="base">{option.label}</Text>
                  {option.description ? (
                    <Text as="span" size="xs" tone="tertiary">
                      {option.description}
                    </Text>
                  ) : null}
                </span>
              </label>
            </div>
          );
        })}
      </div>
      {hintId ? (
        <Text as="p" id={hintId} size="xs" tone="tertiary">
          {hint}
        </Text>
      ) : null}
      {errorId ? (
        <Text as="p" id={errorId} size="xs" tone="danger" role="alert">
          {error}
        </Text>
      ) : null}
    </fieldset>
  );
}
