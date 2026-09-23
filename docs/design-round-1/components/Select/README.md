# Select

Pick one option from a list, in the TextField frame with a chevron.

**When to use.** Six or more options, or options that need not be visible at once.

**Props.** FieldContract + `options` · `value` · `onValueChange` · `open` · `onOpenChange` · `readOnly`.

**Platforms.** Web: a combobox button and a listbox popover anchored under the field (radius md, overlay shadow), arrows/type-ahead/Enter/Esc, active row distinct from the selected one. Device: a bottom sheet over the scrim with a handle, the label as title, 52pt rows with a check, safe-area padding; a row tap selects and closes.

**Notes.** New. The two are different controls, not one control restyled.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
