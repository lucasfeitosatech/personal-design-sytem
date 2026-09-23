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

## Known gaps

- **Fonts on native.** The tokens carry CSS font stacks, which a device cannot use. UI text falls
  back to the system font and mono to Menlo or `monospace` until Libre Franklin and IBM Plex Mono
  are bundled into the app.
- **Line height.** The web sets a unitless ratio; the native Text leaves it to the platform rather
  than converting the ratio wrongly. Revisit when the fonts are bundled.
