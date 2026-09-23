# TextField

Single-line text entry with a floating label that notches the border.

**When to use.** Short free text. For money use MoneyInput, for month/year PeriodInput, for secrets PasswordField. Supply `label` always (it is the placeholder too).

**Props.** TextFieldContract: `value` · `onValueChange` · `size` sm(48)·md(56) · `secret` · `mode` (keyboard) · `maxLength` · `readOnly` · `mono` · `prefix` · `suffix` + FieldContract.

**Platforms.** Web floats with CSS (`:focus`, `:not(:placeholder-shown)`, autofill). Device animates on focus and value; the label paints the surface to fake the notch. No hover on touch.

**Notes.** Shipping. Drawn with two proposals: a hover border (`ds-color-text-tertiary`) and a 2px focus border.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
