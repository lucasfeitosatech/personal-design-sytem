import type { FieldContract, TextFieldContract } from '@lucasfeitosatech/design-core';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Field } from '../Field';
import styles from './TextField.module.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size' | 'value' | 'onChange' | 'readOnly' | 'prefix'> &
  Omit<FieldContract, 'children'> &
  TextFieldContract & {
    /** Static text inside the frame, before the value. */
    prefix?: ReactNode;
    /** Control inside the frame, after the value: a unit, a clear button, a reveal toggle. */
    suffix?: ReactNode;
  };

/**
 * Single-line text entry with a floating label.
 *
 * The float is CSS only, driven by `:focus` and `:not(:placeholder-shown)`, so it also catches
 * autofill, which a JavaScript `onChange` never sees. That is why the placeholder defaults to a
 * single space: an empty placeholder would make the input look filled from the first paint.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, required, disabled, size = 'md', secret = false, mode, mono = false, readOnly, prefix, suffix, className, value, onValueChange, placeholder = ' ', ...rest },
  ref,
) {
  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <div
          className={[styles.frame, styles[size], error ? styles.invalid : '', disabled ? styles.disabled : '', prefix ? styles.hasPrefix : '', className ?? '']
            .filter(Boolean)
            .join(' ')}
        >
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
            placeholder={placeholder}
            onChange={(event) => onValueChange?.(event.target.value)}
            {...control}
            {...rest}
          />
          <label className={styles.label} htmlFor={control.id}>
            {label}
            {required ? <span aria-hidden="true"> *</span> : null}
          </label>
          {suffix ? <span className={styles.affix}>{suffix}</span> : null}
          {/* Draws the border. The legend cuts the notch the floating label sits in. */}
          <fieldset className={styles.outline} aria-hidden="true">
            <legend className={styles.legend}>
              <span>
                {label}
                {required ? ' *' : ''}
              </span>
            </legend>
          </fieldset>
        </div>
      )}
    </Field>
  );
});
