# Modal

A dialog with a title, a body and two actions.

**When to use.** Confirmations that need a decision before continuing, especially destructive ones. Not for information the person can read in place.

**Props.** `title` · `body` · `primaryAction` {label, variant, loading, onPress} · `secondaryAction` · `onClose` · `alert` (danger: role=alertdialog, focus starts on the secondary).

**Platforms.** Web: centred 440px dialog over the scrim, radius lg, overlay shadow, actions right. Device: bottom sheet with a drag handle, actions stacked full width (primary above Cancelar), padding clears the 34pt safe area; a swipe down equals Cancelar.

**Notes.** New. Esc, the scrim and the secondary action close; focus is trapped and returns to the trigger.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
