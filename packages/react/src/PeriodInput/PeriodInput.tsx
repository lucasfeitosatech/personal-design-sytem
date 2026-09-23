import { formatPeriod, periodDigits, type PeriodInputContract } from '@lucasfeitosatech/design-core';
import { forwardRef } from 'react';
import { TextField } from '../TextField';

export type PeriodInputProps = PeriodInputContract;

/** Month and year in the Brazilian order. The slash is drawn after the second digit, never stored. */
export const PeriodInput = forwardRef<HTMLInputElement, PeriodInputProps>(function PeriodInput(
  { value = '', onValueChange, placeholder = 'MM/AAAA', ...rest },
  ref,
) {
  return (
    <TextField
      ref={ref}
      {...rest}
      mono
      mode="numeric"
      inputMode="numeric"
      maxLength={7}
      placeholder={placeholder}
      value={formatPeriod(value)}
      onValueChange={(next) => onValueChange?.(periodDigits(next))}
    />
  );
});
