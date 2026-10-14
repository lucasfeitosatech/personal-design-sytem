import { formatMoney, moneyDigits, type MoneyInputContract } from '@lucasfeitosatech/design-core';
import { forwardRef, useRef } from 'react';
import { TextField } from '../TextField';

export type MoneyInputProps = MoneyInputContract;

/**
 * Money in BRL. The value is the digits in cents, so nothing is parsed back out of a formatted
 * string and no rounding happens on the way to the API.
 *
 * Every keystroke fills from the right, the way a till does: "1" is R$ 0,01 and "1234" is R$ 12,34.
 * That is what removes the caret problem, because the caret is always at the end.
 *
 * Focusing selects the whole amount, so typing replaces a pre-filled figure (an estimate, the
 * previous value) instead of appending to it: 189,90 then "21345" is R$ 213,45, not R$ 18.990.213,45.
 * A click would undo the selection on the mouseup that follows the focus, so that one mouseup is
 * cancelled.
 *
 * Filling from the right only holds if the caret really is at the end, so a caret dropped anywhere
 * else (a click inside the focused field, an arrow key) is moved back there. A selection is left
 * alone: that is how the whole amount gets replaced.
 */
export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyInput(
  { value = '', onValueChange, placeholder = '0,00', ...rest },
  ref,
) {
  const selectedOnFocus = useRef(false);
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
      onFocus={(event) => {
        event.currentTarget.select();
        selectedOnFocus.current = true;
      }}
      onMouseUp={(event) => {
        if (!selectedOnFocus.current) return;
        selectedOnFocus.current = false;
        event.preventDefault();
      }}
      onSelect={(event) => {
        const input = event.currentTarget;
        const end = input.value.length;
        if (input.selectionStart === input.selectionEnd && input.selectionStart !== end) input.setSelectionRange(end, end);
      }}
      onKeyDown={() => {
        selectedOnFocus.current = false;
      }}
      onBlur={() => {
        selectedOnFocus.current = false;
      }}
    />
  );
});
