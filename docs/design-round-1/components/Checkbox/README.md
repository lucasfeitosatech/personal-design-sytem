# Checkbox

A box for a yes/no choice, with indeterminate; CheckboxGroup lays out several under one legend.

**When to use.** Choices confirmed by a submit, and multi-select from a few visible options (CheckboxGroup).

**Props.** `label` · `description` · `checked` · `indeterminate` · `onCheckedChange` · `disabled` · `error`. CheckboxGroup: FieldContract + `options` · `value` · `onValueChange`.

**Platforms.** Rows 32px web, 44pt device; box 20 on both.

**Notes.** New. Unchecked border `ds-color-text-tertiary` (passes 3:1). Error outlines in danger and states the fix.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
