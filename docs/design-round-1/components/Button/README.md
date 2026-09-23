# Button

Triggers an action in one of four variants and two sizes.

**When to use.** One `primary` per view. `secondary` for the alternative, `ghost` for quiet actions (a Section action), `danger` only for destructive actions. The consumer supplies the label (sentence case, a verb) and `onClick`/`onPress`.

**Props.** `variant` primary·secondary·ghost·danger · `size` sm·md · `loading` · `block` · `disabled` · `icon`.

**Platforms.** Web: `:hover`, `:focus-visible` ring (2px focus, offset 2), min height 38/32 (44 under 880px). Device: `Pressable`, pressed fill replaces hover, min height 44, `hitSlop` 8 on sm.

**Notes.** Shipping. **Flagged:** the web `loading` ships with no visible mark; draw the spinner as the native Button does.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
