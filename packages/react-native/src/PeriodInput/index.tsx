import { formatPeriod, periodDigits, type PeriodInputContract } from '@lucasfeitosatech/design-core';
import { TextField } from '../TextField';

export type PeriodInputProps = PeriodInputContract & { surfaceBehind?: string };

/** Month and year in the Brazilian order, on the number pad. */
export function PeriodInput({ value = '', onValueChange, placeholder = 'MM/AAAA', ...rest }: PeriodInputProps) {
  return (
    <TextField
      {...rest}
      mono
      mode="numeric"
      maxLength={7}
      placeholder={placeholder}
      value={formatPeriod(value)}
      onValueChange={(next) => onValueChange?.(periodDigits(next))}
    />
  );
}
