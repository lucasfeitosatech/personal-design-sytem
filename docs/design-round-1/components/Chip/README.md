# Chip

A compact label in neutral, accent or a status tone; selectable as a filter or removable.

**When to use.** Status of a bill (paid, pending, due-soon, overdue, skipped), categories, filters, applied tags.

**Props.** `tone` neutral·accent·paid·pending·due-soon·overdue·skipped · `selected` · `onSelectedChange` · `onRemove` · `removeLabel` · `disabled`.

**Platforms.** 28px web, 32pt device; the remove button grows to a 44pt target on a device.

**Notes.** New. Status tones always carry their glyph; a selected filter adds a check.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
