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
| PasswordField | yes | yes | Reveal flips `type`, so a password manager still sees one field; the native eye is drawn with `react-native-svg` (0.7.1) |
| Switch | yes | yes | Commits on the spot; native uses the platform control |
| Checkbox | yes | yes | Part of a form. `indeterminate` is a DOM property on the web and `"mixed"` on native |
| RadioGroup | yes | yes | The group owns the label and the error, so a reader can count "2 of 3" |
| Chip | yes | yes | Semantic tones, not domain ones; an app maps paid to success and overdue to danger. `size: 'md'` is a chip people tap, and it carries the touch target |
| EmptyState | yes | yes | Always offers one way out; the error tone announces itself |
| Section | yes | yes | Sentence case heading (D-18), mono meta, one quiet action; `plain` opens the block with a hairline on both renderers (0.7.1) |
| Eyebrow | yes | yes | Mono uppercase label before a title; optional index and accent dot (0.6.0 web, 0.7.1 native) |
| Divider | yes | yes | Decorative and hidden from assistive technology; native uses the platform hairline |
| Select | yes | yes | Two different controls: a combobox popover on the web, a bottom sheet on a device |
| Modal | yes | yes | Centred dialog with focus trap on the web; bottom sheet with stacked actions on a device |
| Toast | yes | yes | Auto-dismiss 6s, 10s with an action, paused on hover; an error never dismisses itself. `leaving`/`onExited` play the exit on a device; the web accepts and ignores them (0.8.0) |
| MoneyInput | yes | yes | Value is digits in cents; fills from the right so the caret never moves. Focus selects the amount, so typing replaces a pre-filled figure |
| PeriodInput | yes | yes | Value is up to six digits; the slash is drawn, never stored |
| AppBar | no | yes | Native only. iOS 44 pt bar with the previous screen's name; Android 64 dp bar, no large title. Optional `eyebrow` above the large title, iOS only (0.7.1) |
| TabBar | no | yes | Native only. iOS 60 pt + safe inset, Android 80 dp with the pill; no badge, ever |
| ListRow | yes | yes | 52 pt row; `List` draws the hairline so no row knows it is the first |
| Banner | yes | yes | A standing condition, never a decision: no timer, no primary action |
| Skeleton | yes | yes | `SkeletonGroup` carries the only announcement; the pulse stops under reduced motion |
| PracticeTile | yes | yes | 64 pt toggling tile; `partial` is the checkbox `mixed` state and a half fill, not a colour |
| AffirmationCard | yes | yes | A sentence with its source; `onToggle` makes it a disclosure, otherwise the source stays visible |
| AIAction / AIPanel | yes | yes | The action is quiet, never primary; `unavailable` is a panel state, not an error |
| BillRow | yes | yes | Read-only row with one trailing 44 pt control; the name truncates, the figure never does |
| DateStrip | yes | yes | A week of days; the dot is never the only signal — each day's label says it in words |
| AnimatedNumber | yes | yes | Settles on a new value with the core tween; the moving text is hidden from the reader, who hears the final value once (0.7.0 web, 0.8.0 native) |
| ProgressBar | yes | yes | `role="meter"` for a measured share, not a loading indicator; first paint fills from 0, later changes transition (0.7.0 web, 0.8.0 native) |
| Reveal | yes | no | Scroll-driven fade-up on `animation-timeline: view()`; pure CSS, no JS, content never waits hidden (0.7.0) |

## Where the shared base pays

The masks are the clearest case: `formatMoney`, `moneyDigits`, `formatPeriod` and `periodValue` are
pure functions in `design-core`, covered by tests once and used by both renderers unchanged. The two
inputs on top of them are thin, because the hard part is not the rendering.

The value is always the digits, never the formatted string. Typing appends and backspace removes,
so the caret stays at the end and never has to be repositioned — the trap that breaks masked inputs,
and the one thing DOM and a phone keyboard could never have agreed on.

## Motion

Movement is how the system says "something changed". The tokens are `--ds-motion-fast/base/slow/reveal`
(150/220/320/560 ms) and `--ds-ease-out`, `--ds-ease-in-out`, `--ds-ease-spring`. The tween math —
`easeOutCubic` and `tweenValue` — is pure in `design-core`, tested once, so a number and a bar settle at
the same pace on both renderers.

On a device the same movement runs on `Animated` and `Easing` alone — no Reanimated, no other
library — with the native driver on everything that is a `transform` or an `opacity`, and `false`
only where the property is not one of those (the check's `strokeDashoffset`). The cubic curves are
the token control points through `Easing.bezier`; the spring, which the web writes as a CSS
`linear(...)`, has no such syntax in React Native and is translated to
`Animated.spring({ damping: 14, stiffness: 180, mass: 1 })` — the constants the web curve was tuned
around. Reduced motion comes from `AccessibilityInfo` (`isReduceMotionEnabled` plus the
`reduceMotionChanged` listener) through one internal hook, and pays the same fallback the web does:
the final state paints directly, at most a fast fade, and a list that loads already marked never
animates on mount.

The rules every animation pays:

- Only `transform`, `opacity`, `stroke-dashoffset`, `background-color` and `border-color` animate.
  Never `transition: all`.
- Every animation has a `prefers-reduced-motion: reduce` fallback that removes the displacement, scale
  and drawing — the final state paints directly — and keeps at most a `--ds-motion-fast` fade.
- The drawn check: a 16 px SVG with `pathLength=1`, its stroke drawn by `stroke-dashoffset` 60 ms after
  the box pops with the spring. It plays only on a *new* marking (`useTurnedOn` counts the rising edge
  after mount); a list that loads already marked paints its checks settled, and every new marking
  replays it through the element's `key`.
- `Reveal` is the one animation with no clock at all: it is bound to the view timeline and runs on the
  scroll itself, so it exists only where `animation-timeline: view()` is supported.
- The native Toast rises 12 pt while it fades in, and leaves falling 8 pt through the contract's
  `leaving` and `onExited`; the native ProgressBar fills with a `scaleX` plus a compensating
  `translateX` that plants the left edge, because `transformOrigin` is newer than the package's
  React Native peer range and both transforms stay on the native driver; the sheet's panel keeps
  the platform slide while its scrim fades on top of it.

## Known gaps

- **The web Toast accepts the exit and ignores it.** The contract carries `leaving` and `onExited`,
  and the native renderer plays the out through them; the web toast has no exit animation of its own,
  so it accepts both props and does nothing with them. Writing one there is the web round's job, not
  the contract's: the exit is the application's state in both renderers.
- **Reveal needs a view timeline.** It is web-only, and on the web it only moves where
  `animation-timeline: view()` is supported (Chrome and Safari). Firefox — and a reduced-motion user, on
  purpose — sees the content ready. Nothing is ever left invisible waiting for the timeline.
- **The native package carries `react-native-svg` as a peer.** Since 0.7.1 the PasswordField eye is
  drawn with `Svg`, `Path` and `Circle` instead of the old circle glyphs, and since 0.8.0 the drawn
  check is a `Path` whose `strokeDashoffset` the `Animated` API drives. The dependency stays a
  peer (`>=15`), never a dependency of the package: the app already ships the library and the system
  carries no icon set of its own, so a consumer that does not have it must install it. The repo keeps
  it as a devDependency so the typecheck resolves.
- **Fonts on native — closed for consumers that bundle the files.** `design-tokens` now publishes
  `nativeFonts`, the family names per platform (Android matches the asset file name, iOS the
  PostScript name), and the native `Text` reads them. The files themselves can only live in an app:
  an app that has not bundled Libre Franklin and IBM Plex Mono resolves nothing and falls back to the
  platform font, which is a silent, non-breaking degradation.
- **The native notch.** A native border cannot be cut, so the floating label paints the colour
  behind the frame. The component cannot know what that is, so `surfaceBehind` declares it and
  defaults to the surface colour, which is right inside a Card. Without it a disabled field paints
  its own grey fill over a white card and leaves a visible block.
- **Sheet gestures.** The native sheet closes by tapping the scrim, not by dragging. Dragging needs
  a gesture library and which one is the application's decision, so the sheet stays gesture-free and
  an app can wrap it.
- **Line height.** The web sets a unitless ratio; the native Text leaves it to the platform rather
  than converting the ratio wrongly. Revisit now that the fonts are bundled by the first app.
- **No icon set.** `AppBar`, `ListRow`, `TabBar`, `Banner`, `BillRow` and `DateStrip` take icons as
  nodes the app injects; their own glyphs (`‹`, `→`, `›`, `✓`, `⌄`) are text, so the chrome works
  before an app picks an icon library.
- **The native money caret.** On the web the MoneyInput moves a stray caret back to the end, so a
  digit always fills from the right. On native, focus selects the amount (`selectTextOnFocus`), but a
  tap inside an already focused field still drops the caret where it lands: forcing it means a
  controlled `selection`, which fights the select-on-focus. Revisit if it shows up in use.
- **Nothing counts, nothing formats.** `BillRow` takes the amount already formatted and
  `AIPanel` takes the generated text already validated: the system draws figures and never produces
  them, which is what keeps a model's output from reaching a screen through a component.
