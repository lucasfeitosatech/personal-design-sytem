# Handoff for Claude Code: design round 1

Repository: `lucasfeitosatech/personal-design-sytem`, designed against `main@cf8fcdb`.
Design system (live specimen sheets, both themes): https://claude.ai/artifact/R2bL4aMQYHQnVJTy3Gg7fp

## What is in this bundle

| Path | What |
|---|---|
| `specimen/*.html` | The specimen sheets, viewable offline (open in a browser). `Sheet*Light/Dark.html` are the deliverables: one per group, browser width 1280 and 390pt phone, per theme. The other pages are one component each. |
| `design-system/tokens.json` | Tokens as imported from `packages/tokens/source` (unchanged values). |
| `design-system/components/index.d.ts` | Contracts: the six shipping ones mirrored from `packages/core`, and the proposed new ones. |
| `design-system/components/<Comp>/README.md` | Per-component guidance: when to use, props, platform differences, notes. |
| `design-system/components/bundle.js`, `bundle.css` | The web reference rendition the sheets are drawn with. A reference for visuals and states, not the package code: it is plain `createElement` with `ds-` global classes, while `packages/react` uses CSS Modules. |
| `design-system/README.md` | Rules: voice, colour, layers, type, states, fields, platforms, flagged issues. |

## Labels are props

Every state label in the sheets is the prop or pseudo-state to implement. Mono upright labels (`checked`, `error`, `readOnly`, `rows={6}`) are props. Italic accent labels starting with `:` (`:hover`, `:focus-visible`, `:pressed`) are interaction states, not props. The bundle's `state` prop only exists to force those states for drawing; don't port it.

## Work plan

1. **Contracts first** (`packages/core/src/contracts`). One file per concern, same style as `button.ts` (const arrays, then derived types): `textarea.ts`, `password.ts`, `toggle.ts` (Switch, Checkbox, CheckboxGroup, RadioGroup), `select.ts`, `masked.ts` (MoneyInput, PeriodInput, plus the pure `formatMoney`, `formatPeriod` and the month check; headless logic belongs in core), `chip.ts` (`CHIP_TONES`), `presentation.ts` (EmptyState, Section, Divider), `overlay.ts` (Modal, Toast). Take the shapes from `index.d.ts`. Export from `src/index.ts`. Add each to the table in `docs/component-contracts/README.md`.
2. **Web** (`packages/react/src/<Comp>`): CSS Modules over the `--ds-*` variables. Reuse the TextField frame for every framed field. Extract the fieldset/legend/label part of `TextField` into a shared internal `Frame` rather than copying it.
3. **Native** (`packages/react-native/src/<Comp>`): `Pressable` with `hitSlop` up to 44pt, `useTheme()` palette, `Text` for every string. The Select and Modal sheets need a bottom-sheet primitive. The app owns gestures (see the root README), so ship a plain `Modal`-based sheet with a handle and `useSafeAreaInsets` padding, and let the app swap in its gesture library.
4. **Galleries**: extend `examples/web-gallery.tsx` and `examples/native-gallery.tsx` with every new component and state.

## Platform differences to implement (drawn in the sheets)

- **Select**: web is a `combobox` button with a `listbox` popover anchored under the field (radius md, `--ds-shadow-overlay`, 36px rows, arrows, type-ahead, Enter, Esc; the active row is separate from the selected one). Native is a bottom sheet over the scrim: handle 36×5, the label as title (lg semibold), 52pt rows with a check on the selected one, bottom padding = 16 + safe area; tapping a row selects and closes.
- **Modal**: web is a centred 440px dialog, radius lg, padding 24, actions right-aligned. Native is a bottom sheet with a handle and actions stacked full width, primary above Cancelar; swiping down equals Cancelar. With `alert`, use role alertdialog and put initial focus on the secondary action.
- **Toast**: web region bottom-left at 24px, max 420px. Native spans the width minus 16 and sits at bottom = tab bar 60 + safe area 34 + 8. Default role status, auto-dismiss after 6s (10s with an action), paused while hovered or focused. Error tone: role alert, no auto-dismiss.
- **Textarea**: web `resize: vertical` with a grip glyph. Native autogrows from `rows` (2) to `maxRows` (6) and then scrolls.
- **MoneyInput / PeriodInput**: native `keyboardType="number-pad"`, and the form must scroll the focused field above the pad (291pt).
- **Sizes**: Switch track 40×24 on the web, 51×31 native. Chip 28px on the web, 32pt native. Checkbox and radio rows 32px on the web, 44pt native. The reveal button and chip remove get a 44pt hit area on native.

## Measurements

- Framed fields: see `input.ts` (56/48; label 14 at rest, 11 lifted). Textarea padding is 18 top and 12 bottom. The label rests 28 from the top and lifts 34.
- Switch: thumb 18 with a 3 inset; on shows a check in the thumb (12, 2px stroke, accent). Off track is `text-tertiary`, on track is `accent`, thumb is `surface`.
- Checkbox and radio box: 20, border 1.5 `text-tertiary`, radius sm (checkbox) or pill (radio). Checked is an accent fill with an `on-accent` glyph. The radio dot is 10 in accent. On error the border turns overdue, and the message sits under the label at 32px indent.
- Chip tones (fill / border / text / glyph): neutral raised/border/secondary; accent accent-soft/accent-border/accent; paid paid-soft/accent-border/paid ✓; pending surface/border/secondary with a dashed ring in `pending`; due-soon due-soon-soft/border/due-soon with a clock in `due-soon-mark`; overdue overdue-soft/overdue-border/overdue with alert; skipped skipped-soft/border/tertiary with skip in `skipped`. A selected filter chip is accent-soft/accent/accent with a check.
- EmptyState: surface-muted, 1px border, radius md, padding 32/24, a 40 mark circle, title lg semibold, body base secondary, one Button.
- Section head: title lg semibold, meta sm mono tertiary, action ghost sm; gap 12.
- Disabled pressables use opacity 0.55, matching Button.

## Flagged fixes to the shipping six

1. `packages/react/src/Button`: `loading` has no visible mark on the web. Render a small spinner before the label, as native does.
2. `packages/react/src/TextField` (and native): the focus border is 1px accent. The sheets draw 2px so keyboard focus is unmistakable. On the web, set `border-width: 2px` and `padding: 0 7px` on the fieldset under `:focus-within`. On native, set `borderWidth: 2` and compensate the padding by 1.
3. Fields have no hover. Proposed: border `text-tertiary` on `:hover`.
4. Known and kept: `border` is 1.3:1 on surface in light. Dark `text-tertiary` on `surface-raised` is 4.46:1, so avoid small tertiary text there.

## Not decided here

- Icon set: none in the repository. The sheets use placeholder 1.5px-stroke glyphs (the paths are in `bundle.js`, `G`). Choose a set, then keep the rule that a glyph never carries meaning alone.
- Fonts on native are still the known gap (bundle Libre Franklin and IBM Plex Mono).
