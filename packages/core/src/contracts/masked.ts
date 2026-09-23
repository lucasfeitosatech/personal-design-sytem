import type { BaseSize } from './base';
import type { FieldContract } from './field';

/**
 * Money in BRL. The value is the digits in cents, so "123456" shows as "R$ 1.234,56" and reaches
 * the API as an integer with no rounding on the way.
 */
export type MoneyInputContract = Omit<FieldContract, 'children'> & {
  /** Digits in cents. Empty string while the field is empty. */
  value?: string;
  onValueChange?: (cents: string) => void;
  size?: BaseSize;
  readOnly?: boolean;
  placeholder?: string;
};

/** Month and year. The value is up to six digits, "032026". */
export type PeriodInputContract = Omit<FieldContract, 'children'> & {
  value?: string;
  onValueChange?: (digits: string) => void;
  size?: BaseSize;
  readOnly?: boolean;
  placeholder?: string;
};
