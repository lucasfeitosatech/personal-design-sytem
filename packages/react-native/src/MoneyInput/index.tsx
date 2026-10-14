import { formatMoney, moneyDigits, type MoneyInputContract } from '@lucasfeitosatech/design-core';
import { Text } from '../Text';
import { TextField } from '../TextField';

export type MoneyInputProps = MoneyInputContract & { surfaceBehind?: string };

/**
 * Money in BRL, filling from the right. The number pad is the only keyboard that makes sense here.
 * Focusing selects the amount, so typing replaces a pre-filled figure instead of appending to it.
 */
export function MoneyInput({ value = '', onValueChange, placeholder = '0,00', ...rest }: MoneyInputProps) {
  return (
    <TextField
      {...rest}
      mono
      align="right"
      mode="numeric"
      selectTextOnFocus
      placeholder={placeholder}
      prefix={<Text tone="tertiary">R$</Text>}
      value={formatMoney(value)}
      onValueChange={(next) => onValueChange?.(moneyDigits(next))}
    />
  );
}
