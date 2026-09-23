# RadioGroup

One choice out of a few options, all visible.

**When to use.** Two to five options. More than that, use Select.

**Props.** FieldContract + `options` · `value` · `onValueChange`.

**Platforms.** Rows 32px web, 44pt device. Web: arrow keys move the choice; only the selected radio is tabbable.

**Notes.** New. role="radiogroup" on a fieldset with the legend as label.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
