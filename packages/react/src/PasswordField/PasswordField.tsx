import { forwardRef, useState } from 'react';
import { TextField, type TextFieldProps } from '../TextField';
import styles from './PasswordField.module.css';

export type PasswordFieldProps = Omit<TextFieldProps, 'secret' | 'suffix' | 'mode'> & {
  /** Accessible name of the reveal control while the value is hidden. */
  revealLabel?: string;
  /** And while it is shown. An icon-only button needs a name in both states. */
  concealLabel?: string;
};

/**
 * A TextField that hides its value, with a reveal control inside the frame.
 *
 * Revealing flips `type` rather than rendering the value elsewhere, so a password manager still sees
 * one field. The control is a real button so it is reachable by keyboard, and it announces its state.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
  { revealLabel = 'Mostrar senha', concealLabel = 'Ocultar senha', ...rest },
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
          aria-label={revealed ? concealLabel : revealLabel}
          aria-pressed={revealed}
        >
          <EyeIcon crossed={revealed} />
        </button>
      }
    />
  );
});

/**
 * The eye shows what pressing will do: open while the value is hidden, struck through while it is
 * shown. Drawn inline in `currentColor` so it follows the button's hover and theme without an
 * icon library.
 */
function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      {crossed && <path d="M4 4l16 16" />}
    </svg>
  );
}
