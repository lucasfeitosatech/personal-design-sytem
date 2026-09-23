# Textarea

Multi-line sibling of TextField: same frame, notch and floating label, resting on the first line.

**When to use.** Notes and reasons longer than one line. Set `maxLength` to show a mono counter.

**Props.** FieldContract + `value` · `onValueChange` · `rows` (default 2) · `maxRows` (device, default 6) · `maxLength` · `readOnly`.

**Platforms.** Web: vertical resize grip in the corner. Device: no grip; grows with content from `rows` to `maxRows`, then scrolls, so the typed line stays above the keyboard.

**Notes.** New. Frame padding 18/12, label rest at 28 from the top, lift 34.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
