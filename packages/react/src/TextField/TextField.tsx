import type { FieldContract, TextFieldContract } from '@lucasfeitosatech/design-core';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Field } from '../Field';
import styles from './TextField.module.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size' | 'value' | 'onChange' | 'readOnly'> &
  Omit<FieldContract, 'children'> &
  TextFieldContract & {
    /** Static text inside the frame, before the value. */
    prefix?: ReactNode;
    /** Control inside the frame, after the value: a unit, a clear button, a reveal toggle. */
    suffix?: ReactNode;
  };

/** Single-line text entry. `onValueChange` carries the string so the call site matches the native one. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hideLabel, hint, error, required, disabled, size = 'md', secret = false, mode, mono = false, readOnly, prefix, suffix, className, value, onValueChange, ...rest },
  ref,
) {
  return (
    <Field label={label} hideLabel={hideLabel} hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <div className={[styles.frame, styles[size], error ? styles.invalid : '', disabled ? styles.disabled : '', className ?? ''].filter(Boolean).join(' ')}>
          {prefix ? (
            <span className={styles.affix} aria-hidden="true">
              {prefix}
            </span>
          ) : null}
          <input
            ref={ref}
            className={[styles.input, mono ? styles.mono : ''].filter(Boolean).join(' ')}
            type={secret ? 'password' : 'text'}
            inputMode={mode}
            readOnly={readOnly}
            value={value}
            onChange={(event) => onValueChange?.(event.target.value)}
            {...control}
            {...rest}
          />
          {suffix ? <span className={styles.affix}>{suffix}</span> : null}
        </div>
      )}
    </Field>
  );
});
