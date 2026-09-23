# Field

Label, hint and error around any control; an error replaces the hint, they never stack.

**When to use.** Wrap custom controls (a chip set, a slider). Framed fields already use it with `hideLabel` and float their own label.

**Props.** `label` · `hideLabel` · `hint` · `error` · `required` (adds " *", announced "obrigatório") · `disabled` · `children` (web: a function receiving id, aria-describedby, aria-invalid).

**Platforms.** Web binds by `htmlFor`. Device: the control carries the label; the visible label is hidden from the reader.

**Notes.** Shipping.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
