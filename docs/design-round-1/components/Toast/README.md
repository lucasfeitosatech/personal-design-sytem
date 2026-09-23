# Toast

A short confirmation with an optional action and a dismiss.

**When to use.** After an action the person may want to undo. Errors that need attention use the error tone and stay until dismissed.

**Props.** `message` · `tone` default·error · `actionLabel` · `onAction` · `onDismiss`. Place inside `ToastRegion`.

**Platforms.** Web: bottom-left, 24px from the edges, 420px max. Device: full width minus 16pt, above the 60pt tab bar and the 34pt safe area.

**Notes.** New. Default role="status", auto-dismiss 6s (10s with an action), paused on hover/focus. Error role="alert", no auto-dismiss.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
