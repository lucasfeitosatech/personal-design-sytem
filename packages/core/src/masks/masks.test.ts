import { describe, expect, it } from 'vitest';
import { formatMoney, moneyDigits, moneyValue, MAX_MONEY_DIGITS } from './money';
import { formatPeriod, isCompletePeriod, periodDigits, periodToDigits, periodValue } from './period';

describe('money', () => {
  it('fills from the right, two decimals always', () => {
    expect(formatMoney('')).toBe('');
    expect(formatMoney('1')).toBe('0,01');
    expect(formatMoney('123')).toBe('1,23');
    expect(formatMoney('123456')).toBe('1.234,56');
    expect(formatMoney('123456789')).toBe('1.234.567,89');
  });
  it('reads the digits of anything pasted', () => {
    expect(moneyDigits('R$ 1.234,56')).toBe('123456');
    expect(moneyDigits('1234.56')).toBe('123456');
    expect(moneyDigits('abc')).toBe('');
  });
  it('drops the leftmost digits past the cap, like a real mask', () => {
    const overflow = '9'.repeat(MAX_MONEY_DIGITS + 3);
    expect(moneyDigits(overflow)).toHaveLength(MAX_MONEY_DIGITS);
  });
  it('strips leading zeros so 007 is 0,07 and not 00,07', () => {
    expect(formatMoney(moneyDigits('007'))).toBe('0,07');
  });
  it('gives the integer value, or null while empty', () => {
    expect(moneyValue('123456')).toBe(123456);
    expect(moneyValue('')).toBeNull();
  });
});

describe('period', () => {
  it('draws the slash after the second digit', () => {
    expect(formatPeriod('0')).toBe('0');
    expect(formatPeriod('03')).toBe('03');
    expect(formatPeriod('0320')).toBe('03/20');
    expect(formatPeriod('032026')).toBe('03/2026');
  });
  it('caps at six digits', () => {
    expect(periodDigits('0320269999')).toBe('032026');
  });
  it('refuses a month outside 01 to 12', () => {
    expect(isCompletePeriod('132026')).toBe(false);
    expect(isCompletePeriod('002026')).toBe(false);
    expect(isCompletePeriod('122026')).toBe(true);
  });
  it('converts to the API form only when complete', () => {
    expect(periodValue('032026')).toBe('2026-03');
    expect(periodValue('03202')).toBeNull();
    expect(periodValue('132026')).toBeNull();
  });
  it('round-trips from the API form', () => {
    expect(periodToDigits('2026-03')).toBe('032026');
    expect(formatPeriod(periodToDigits('2026-03'))).toBe('03/2026');
    expect(periodToDigits('lixo')).toBe('');
  });
});
