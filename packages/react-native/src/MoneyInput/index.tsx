import { formatMoney, moneyDigits, type MoneyInputContract } from '@lucasfeitosatech/design-core';
import { forwardRef, type ComponentRef } from 'react';
import { type TextInput } from 'react-native';
import { Text } from '../Text';
import { TextField } from '../TextField';

export type MoneyInputProps = MoneyInputContract & { surfaceBehind?: string };

/**
 * Money in BRL, filling from the right. The number pad is the only keyboard that makes sense here.
 * Focusing selects the amount, so typing replaces a pre-filled figure instead of appending to it.
 *
 * The ref reaches the `TextInput`, so an application can focus the field after the modal around it
 * settles; `autoFocus` is the mount-time version of the same move.
 */
export const MoneyInput = forwardRef<ComponentRef<typeof TextInput>, MoneyInputProps>(function MoneyInput(
  { value = '', onValueChange, placeholder = '0,00', autoFocus, ...rest },
  ref,
) {
  return (
    <TextField
      ref={ref}
      {...rest}
      mono
      align="right"
      mode="numeric"
      selectTextOnFocus
      placeholder={placeholder}
      prefix={<Text tone="tertiary">R$</Text>}
      value={formatMoney(value)}
      onValueChange={(next) => onValueChange?.(moneyDigits(next))}
      autoFocus={autoFocus}
    />
  );
});
