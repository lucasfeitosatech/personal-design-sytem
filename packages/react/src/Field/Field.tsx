import type { FieldContract } from '@lucasfeitosatech/design-core';
import { useId, type ReactNode } from 'react';
import { Text } from '../Text';
import styles from './Field.module.css';

/** What the control needs to be reachable and described. The caller spreads it onto the input. */
export type FieldControlProps = {
  id: string;
  'aria-describedby': string | undefined;
  'aria-invalid': true | undefined;
  required: boolean | undefined;
  disabled: boolean | undefined;
};

export type FieldProps = Omit<FieldContract, 'children'> & {
  /** The control is rendered by the caller with the ids this field owns. */
  children: (control: FieldControlProps) => ReactNode;
};

/** Label, hint and error around a control. An error replaces the hint; they never stack. */
export function Field({ label, hideLabel = false, hint, error, required, disabled, children }: FieldProps) {
  const id = useId();
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={styles.field}>
      <label className={[styles.label, hideLabel ? 'ds-visually-hidden' : ''].filter(Boolean).join(' ')} htmlFor={id}>
        <Text size="sm" tone="secondary" weight="medium">
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </Text>
      </label>
      {children({
        id,
        'aria-describedby': errorId ?? hintId,
        'aria-invalid': error ? true : undefined,
        required: required || undefined,
        disabled: disabled || undefined,
      })}
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
    </div>
  );
}
