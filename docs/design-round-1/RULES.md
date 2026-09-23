One identity across two renderers: React for the browser, React Native for iOS and Android. A component is written once as a contract in `design-core` (variants, sizes, the states every renderer must cover), then implemented in each renderer's own idiom. Same name, same props, same meaning; the binding differs (`event.target.value` on the web, `onChangeText` on a device), the contract does not.

## Voice

Calm, plain pt-BR, sentence case. No exclamation marks, no motivational copy, no shame, no streaks.

- Say what happened and what to do next: "Não foi possível salvar. Tente de novo." Never "Ops!" or "Algo deu errado!".
- Errors name the fix: "Informe um valor maior que zero.", "Mês inválido. Use de 01 a 12.", "Escolha uma categoria."
- Confirmations are past tense and short: "Conta marcada como paga."
- Destructive questions state the consequence: "A conta "Internet" e os 12 pagamentos registrados serão removidos. Não é possível desfazer."
- Figures, dates, codes and metadata are set in mono: "R$ 1.234,56", "23/09/2026", "03/2026".

## Colour

- One accent. `ds-color-accent` carries primary actions, checked controls, selection, the focused field and the focus ring. Nothing else competes with it.
- Danger is `ds-color-overdue`. Use it for destructive actions, errors and overdue bills only, never for emphasis.
- Status is never colour alone. Every status chip carries a glyph and a word (✓ Paga, ◌ Pendente, clock Vence em 3 dias, ! Atrasada, → Pulada); every error has a message.
- Text: `ds-color-text` for body, `ds-color-text-secondary` for supporting copy, `ds-color-text-tertiary` for hints, resting labels, placeholders and metadata. `ds-color-text-disabled` is for disabled labels only and fails contrast on purpose.
- Marks only, never text: `ds-color-pending`, `ds-color-skipped`, `ds-color-due-soon-mark`.
- Put `ds-color-on-accent` on accent fills and `ds-color-on-overdue` on danger fills. In dark both are near-black, because the dark accent and danger are light.

## Layers

Layers separate by luminance and a 1px `ds-color-border`, never by shadow. From the bottom: `ds-color-bg-page` → `ds-color-bg` → `ds-color-surface` → `ds-color-surface-raised`. `ds-color-surface-muted` is a quiet alternative to surface for empty states and read-only fields.

The one exception is `ds-shadow-overlay`, used only by things that float over the page: the Select popover, the Modal dialog and sheet, the Toast. Native shares the name, not the recipe (iOS shadow props, Android elevation).

## Type

Closed scale, seven steps: 11 / 12 / 13 / 14 / 16 / 20 / 26 (`xs` `sm` `md` `base` `lg` `xl` `2xl`). Points on a device, pixels on the web. Weights 400, 500 and 600 only.

- Libre Franklin (`--ds-font-ui`) for interface text. IBM Plex Mono (`--ds-font-mono`) for figures, dates, codes and metadata, always `font-variant-numeric: tabular-nums`.
- Body and control values `base` 14. Field group labels `sm` medium. Hints, errors and floating labels `xs`. Buttons `md` medium (`sm` for small). Section titles `lg` semibold, dialog titles `xl` semibold, page titles `2xl` semibold.
- Line height 1.45; 1.3 at `xl`, 1.25 at `2xl`.
- On a device every string goes through `Text`: React Native has no cascade.

## Space, radius, motion, touch

- Spacing 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 (`ds-space-1` … `ds-space-8`). Card padding `ds-space-4`, dialog padding `ds-space-5`.
- Radius `ds-radius-sm` 6 for buttons, fields and checkboxes; `ds-radius-md` 10 for cards, popovers and toasts; `ds-radius-lg` 13 for dialogs and sheet tops; `ds-radius-pill` for chips, switch tracks and handles.
- Motion 150ms (`--ds-motion-fast`: hover, the label lift, a switch) and 220ms (`--ds-motion-base`: overlays). Respect reduced motion.
- Minimum touch target `ds-tap` 44 on a device and on the web under 880px. A smaller visual (a 28pt chip remove, a small button) grows its hit area with `hitSlop`.

## States

Every component draws: default, hovered (web) or pressed (device), focused, disabled, and where it applies loading, error, empty, selected and read-only.

- Focus: 2px solid `ds-color-focus`, offset 2px, on every pressable control. Framed fields show focus as an accent border and an accent floating label.
- Disabled: 0.55 opacity for pressables; a `ds-color-surface-raised` fill and `ds-color-text-disabled` for fields.
- Read-only fields: `ds-color-surface-muted` fill and a dashed border, still selectable.
- Loading blocks interaction and announces busy; it is never just a visual.

## Fields

Every framed field (TextField, Textarea, PasswordField, Select, MoneyInput, PeriodInput) shares one frame: 56 tall (48 at `sm`), `ds-radius-sm`, a floating label that rests inside at 14 in tertiary and lifts onto the border at 11 when the field has focus or content, cutting a notch. Hint below in `xs` tertiary; an error replaces the hint and turns the border and label to danger. Required adds " *" and is announced as "obrigatório". On a device the border cannot be notched, so the label paints the surface behind itself.

## Platforms

Where the two renderers differ, the specimen draws both and says why:

- Hover does not exist on touch; a device draws pressed.
- Select is a popover on the web, a bottom sheet on a phone.
- Modal is a centred dialog on the web, a bottom sheet with a drag handle on a phone.
- Toast sits bottom-left on the web; on a phone it spans the width above the 60pt tab bar and the 34pt safe area.
- Textarea resizes with a grip on the web and grows with its content on a device.
- A device keyboard covers the lower half of the screen (291pt number pad): forms scroll the focused field above it.

## Iconography

The repository ships no icon set. The specimen uses a small set of 1.5px-stroke glyphs on a 16 grid drawn for it (check, minus, chevron, x, alert, clock, dashed circle, skip, eye, eye-off, inbox, grip), in `currentColor`. They are placeholders: replace them with the product's icon set when one is chosen, keeping the stroke weight and the rule that a glyph never carries meaning alone.

## Flagged

- **Web Button `loading` has no visible mark.** It ships as disabled + `aria-busy`, which looks identical to disabled; the native Button shows an ActivityIndicator. The specimen draws the spinner on both; add it to `packages/react/src/Button`.
- **Field focus is a 1px hue change.** The shipping TextField turns its 1px border accent. The specimen draws focus at 2px for every framed field so keyboard focus is unmistakable; apply the same to TextField.
- **Fields have no hover.** Proposed: the border goes to `ds-color-text-tertiary` on hover (3:1 on surface), which also gives the frame a visible edge while pointed at.
- **Control borders are faint.** `ds-color-border` is 1.3:1 on surface in light, under the 3:1 WCAG asks of control boundaries. Kept as shipped: the floating label and the fill identify the field. Checkboxes, radios and the switch track use `ds-color-text-tertiary` instead, which passes.
- **Dark tertiary on raised.** `ds-color-text-tertiary` on `ds-color-surface-raised` is 4.46:1 in dark, just under AA. Avoid small tertiary text on raised surfaces in dark.

## Not synced

From `lucasfeitosatech/personal-design-sytem` at `main@cf8fcdb`: every colour, the shadow, the type scale, spacing, radii, layout and tap target came over exactly; the six shipping components were ported from `packages/react` into the web bundle one to one (class names prefixed `ds-`). Not brought in: the motion durations and the two font stacks are CSS variables in `bundle.css`, because this format has no motion family; font files (the repository references Libre Franklin and IBM Plex Mono by name only; the previews load them from Google Fonts); logos and icons (none in the repository). The thirteen new components exist only here, as a web rendition for the specimen; route: hand-written from the contracts in `packages/core/src/contracts` and the brief in `docs/claude-design-prompt.md`, not built from the repository.
