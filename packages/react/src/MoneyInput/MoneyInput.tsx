import { formatMoney, moneyDigits, type MoneyInputContract } from '@lucasfeitosatech/design-core';
import { forwardRef } from 'react';
import { TextField } from '../TextField';

export type MoneyInputProps = MoneyInputContract;

/**
 * Money in BRL. The value is the digits in cents, so nothing is parsed back out of a formatted
 * string and no rounding happens on the way to the API.
 *
 * Every keystroke fills from the right, the way a till does: "1" is R$ 0,01 and "1234" is R$ 12,34.
 * That is what removes the caret problem, because the caret is always at the end.
 */
export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyInput(
  { value = '', onValueChange, placeholder = '0,00', ...rest },
  ref,
) {
  return (
    <TextField
      ref={ref}
      {...rest}
      mono
      align="right"
      mode="decimal"
      inputMode="decimal"
      prefix="R$"
      placeholder={placeholder}
      value={formatMoney(value)}
      onValueChange={(next) => onValueChange?.(moneyDigits(next))}
    />
  );
});
