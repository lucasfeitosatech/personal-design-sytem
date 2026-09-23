import { forwardRef, useState } from 'react';
import { TextField, type TextFieldProps } from '../TextField';
import styles from './PasswordField.module.css';

export type PasswordFieldProps = Omit<TextFieldProps, 'secret' | 'suffix' | 'mode'> & {
  /** Labels for the reveal control. Required: an icon-only button needs an accessible name. */
  showLabel?: string;
  hideLabel_?: string;
};

/**
 * A TextField that hides its value, with a reveal control inside the frame.
 *
 * Revealing flips `type` rather than rendering the value elsewhere, so a password manager still sees
 * one field. The control is a real button so it is reachable by keyboard, and it announces its state.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
  { showLabel = 'Mostrar senha', hideLabel_ = 'Ocultar senha', ...rest },
  ref,
) {
  const [revealed, setRevealed] = useState(false);
  return (
    <TextField
      ref={ref}
      {...rest}
      secret={!revealed}
      autoComplete={rest.autoComplete ?? 'current-password'}
      suffix={
        <button
          type="button"
          className={styles.reveal}
          onClick={() => setRevealed((r) => !r)}
          aria-label={revealed ? hideLabel_ : showLabel}
          aria-pressed={revealed}
        >
          <span aria-hidden="true">{revealed ? '◎' : '○'}</span>
        </button>
      }
    />
  );
});
