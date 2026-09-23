# MoneyInput

Masked BRL amount that reads "R$ 1.234,56", right aligned in mono.

**When to use.** Any amount of money. Value is the digits in cents, so arithmetic never parses a string.

**Props.** TextField props (minus `mode`, `prefix`, `mono`) + `value` (cents as digits) · `onValueChange(cents)`. `formatMoney` is exported.

**Platforms.** Device raises the number pad (`keyboardType="number-pad"`); the cents shift means no comma key is needed. The form scrolls the field above the 291pt pad.

**Notes.** New. Digits shift in from the cents: 1 → 0,01 → 0,12 → 1,23. "R$" appears when the label lifts; the focused-empty placeholder is 0,00.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
