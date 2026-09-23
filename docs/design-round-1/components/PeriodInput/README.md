# PeriodInput

Masked month and year, "MM/AAAA", in mono.

**When to use.** Billing periods and competências.

**Props.** TextField props (minus `mode`, `mono`) + `value` (up to 6 digits) · `onValueChange`. `formatPeriod` is exported.

**Platforms.** Device: number pad. Same mask on both.

**Notes.** New. The slash is inserted; the rest of the pattern stays ghosted while typing. Month outside 01–12 → "Mês inválido. Use de 01 a 12."

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
