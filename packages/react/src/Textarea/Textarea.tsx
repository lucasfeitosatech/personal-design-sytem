import type { FieldContract, TextareaContract } from '@lucasfeitosatech/design-core';
import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y } from '@lucasfeitosatech/design-core';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { Field } from '../Field';
import styles from './Textarea.module.css';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'value' | 'onChange' | 'readOnly' | 'rows'> &
  Omit<FieldContract, 'children'> &
  TextareaContract;

/** Multi-line entry. Same frame and floating label as TextField; the label rests at the top. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, required, disabled, rows = 4, maxRows, readOnly, className, value, onValueChange, placeholder = ' ', style, ...rest },
  ref,
) {
  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <div className={[styles.frame, error ? styles.invalid : '', disabled ? styles.disabled : '', className ?? ''].filter(Boolean).join(' ')}>
          <textarea
            ref={ref}
            className={styles.input}
            readOnly={readOnly}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onValueChange?.(event.target.value)}
            style={{
              minHeight: rows * TEXTAREA_LINE_HEIGHT + TEXTAREA_PADDING_Y * 2,
              maxHeight: maxRows ? maxRows * TEXTAREA_LINE_HEIGHT + TEXTAREA_PADDING_Y * 2 : undefined,
              ...style,
            }}
            {...control}
            {...rest}
          />
          <label className={styles.label} htmlFor={control.id}>
            {label}
            {required ? <span aria-hidden="true"> *</span> : null}
          </label>
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
