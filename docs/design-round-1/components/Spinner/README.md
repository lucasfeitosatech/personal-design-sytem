# Spinner

Busy indicator with a required, announced label.

**When to use.** Inside a region that is loading. For a button, use `Button loading` instead.

**Props.** `size` sm·md · `label` (required).

**Platforms.** Web: a 2px ring in accent over border. Device: the platform ActivityIndicator (small/large) in accent.

**Notes.** Shipping.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
