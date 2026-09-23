# Component contracts

One file per component, stating what it means, which props it owns and which states every renderer
must cover. The contract types live in `@lucasfeitosatech/design-core`; this folder explains them.

A renderer may add platform props on top (`type="submit"` on the web, `hitSlop` on a device). It may
not remove a contract prop, rename it, or change what it means.

## Shipping

| Component | Web | Native | Notes |
|---|---|---|---|
| Text | yes | yes | Native has no cascade: every string goes through it or leaves the scale |
| Button | yes | yes | Hover becomes pressed; `loading` blocks interaction and announces busy |
| Card | yes | yes | Border and luminance, never a shadow |
| Spinner | yes | yes | `label` is required and announced on both |
| Field | yes | yes | Web binds by `htmlFor`; native puts the label on the control and hides the visible one |
| TextField | yes | yes | Binding differs (`target.value` vs `onChangeText`), contract does not |
| Textarea | yes | yes | Label rests at the first line, not centred |
| PasswordField | yes | yes | Reveal flips `type`, so a password manager still sees one field |
| Switch | yes | yes | Commits on the spot; native uses the platform control |
| Checkbox | yes | yes | Part of a form. `indeterminate` is a DOM property on the web and `"mixed"` on native |
| RadioGroup | yes | yes | The group owns the label and the error, so a reader can count "2 of 3" |
| Chip | yes | yes | Semantic tones, not domain ones; an app maps paid to success and overdue to danger |
| EmptyState | yes | yes | Always offers one way out; the error tone announces itself |
| Section | yes | yes | Sentence case heading (D-18), mono meta, one quiet action |
| Divider | yes | yes | Decorative and hidden from assistive technology; native uses the platform hairline |

## Known gaps

- **Fonts on native.** The tokens carry CSS font stacks, which a device cannot use. UI text falls
  back to the system font and mono to Menlo or `monospace` until Libre Franklin and IBM Plex Mono
  are bundled into the app.
- **The native notch.** A native border cannot be cut, so the floating label paints the colour
  behind the frame. The component cannot know what that is, so `surfaceBehind` declares it and
  defaults to the surface colour, which is right inside a Card. Without it a disabled field paints
  its own grey fill over a white card and leaves a visible block.
- **Line height.** The web sets a unitless ratio; the native Text leaves it to the platform rather
  than converting the ratio wrongly. Revisit when the fonts are bundled.
