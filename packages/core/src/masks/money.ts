/**
 * Money and period masks. Pure, with no React and no locale import, so the two renderers share the
 * whole of it: this is where a cross-platform base actually pays.
 *
 * The value is the digits, never the formatted string. Typing appends a digit and backspace removes
 * the last one, so the caret never has to be repositioned — which is the trap that breaks masked
 * inputs, and the one place the platforms could not agree anyway.
 */

/** 12 digits is R$ 9.999.999.999,99 in cents. */
export const MAX_MONEY_DIGITS = 12;

/** Groups an integer with pt-BR thousands separators: 1234567 becomes "1.234.567". */
function groupThousands(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Digits in cents to the pt-BR display, without the symbol: "123456" becomes "1.234,56". */
export function formatMoney(cents: string | number): string {
  const digits = String(cents).replace(/\D/g, '');
  if (digits === '') return '';
  const padded = digits.padStart(3, '0');
  return `${groupThousands(padded.slice(0, -2).replace(/^0+(?=\d)/, ''))},${padded.slice(-2)}`;
}

/**
 * Keeps only the digits of whatever arrived, capped from the right. Anything pasted works —
 * "R$ 1.234,56", "1234.56", "1234" — because only the digits are read.
 */
export function moneyDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  return digits.length > MAX_MONEY_DIGITS ? digits.slice(-MAX_MONEY_DIGITS) : digits;
}

/** Digits in cents as an integer, or `null` while the field is empty. */
export function moneyValue(digits: string): number | null {
  return digits === '' ? null : Number(digits);
}
