# Text

Applies the closed type scale and a tone to a string; on a device every string goes through it.

**When to use.** Use for anything that carries a tone or a figure. Pick the element for meaning (`as` on the web), not for size.

**Props.** `size` xs·sm·md·base·lg·xl·2xl (11–26) · `tone` default·secondary·tertiary·disabled·accent·danger · `weight` regular·medium·semibold · `mono` (tabular) · `lines`.

**Platforms.** Web inherits from CSS; native has no cascade, so a raw RN `<Text>` leaves the scale. Native fonts fall back to the system face until Libre Franklin and IBM Plex Mono are bundled.

**Notes.** Shipping. `packages/react/src/Text`, `packages/react-native/src/Text`.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
