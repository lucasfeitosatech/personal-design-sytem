/** Month and year, in the Brazilian order. The slash is drawn, never stored. */

export const MAX_PERIOD_DIGITS = 6;

/** Up to six digits: "032026". Anything else is dropped. */
export function periodDigits(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, MAX_PERIOD_DIGITS);
}

/** "032026" becomes "03/2026"; a partial entry mirrors what was typed. */
export function formatPeriod(digits: string): string {
  const clean = periodDigits(digits);
  if (clean.length <= 2) return clean;
  return `${clean.slice(0, 2)}/${clean.slice(2)}`;
}

/** A month outside 01 to 12 is an error, and so is a year that is not yet four digits. */
export function isCompletePeriod(digits: string): boolean {
  const clean = periodDigits(digits);
  if (clean.length !== MAX_PERIOD_DIGITS) return false;
  const month = Number(clean.slice(0, 2));
  return month >= 1 && month <= 12;
}

/** The API form, "YYYY-MM", or `null` while the entry is incomplete or the month is out of range. */
export function periodValue(digits: string): string | null {
  const clean = periodDigits(digits);
  return isCompletePeriod(clean) ? `${clean.slice(2)}-${clean.slice(0, 2)}` : null;
}

/** "2026-03" back to the six digits the field holds. */
export function periodToDigits(period: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(period);
  return match ? `${match[2]}${match[1]}` : '';
}
