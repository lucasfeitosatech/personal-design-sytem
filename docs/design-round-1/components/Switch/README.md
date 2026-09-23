# Switch

An immediate on/off setting with a label and an optional description line.

**When to use.** Settings that apply at once. For choices confirmed by a submit, use Checkbox.

**Props.** `label` · `description` · `checked` · `onCheckedChange` · `disabled`.

**Platforms.** Track 40×24 web, 51×31 device. Pressed stretches the thumb. Off track `ds-color-text-tertiary`, on `ds-color-accent`; on adds a check in the thumb.

**Notes.** New. role="switch"; the whole row toggles.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
