# PasswordField

TextField with a reveal button inside the frame.

**When to use.** Sign-in and secrets. Never pre-fill a revealed password.

**Props.** TextField props (minus `secret`, `suffix`) + `revealed` · `onRevealedChange`.

**Platforms.** Reveal target 32px web, 44pt device. Device: `secureTextEntry` toggles; `textContentType="password"`.

**Notes.** New. The button is `aria-pressed` with label "Mostrar senha"/"Ocultar senha" and never submits the form.

States drawn in the specimen card: default, hover (web) or pressed (device), focus, disabled, and where they apply loading, error, empty, selected and read-only. The state labels are the prop names.
