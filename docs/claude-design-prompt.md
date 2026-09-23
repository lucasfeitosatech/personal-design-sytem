What we're designing

A component library, not an application. One design system serving two renderers: React for the browser
and React Native for iOS and Android. The output is a specimen sheet: every component with every state,
side by side, so two implementations can be built from the same page.

Six components already exist and ship (Text, Button, Card, Spinner, Field, TextField). They are listed
below so the new ones match them. Do not redesign them unless something is clearly broken.

The design system already exists. Reuse it exactly, do not invent a palette or a type scale.

Palette, light theme
bg #faf9f7 · bg-page #f3f1ed · surface #ffffff · surface-raised #f0ede8 · surface-muted #fcfbf9
border #e6e2dc · border-soft #f0ede8
text #1e1c19 · text-secondary #55504a · text-tertiary #6f685f · text-disabled #a8a199
accent #2f6b4f · accent-hover #21503b · accent-soft #eaf2ed · accent-border #d6e6dc · accent-tint #f4f8f5
on-accent #ffffff · focus #2f6b4f · scrim rgb(20 19 17 / 0.45)
danger (also "overdue") #b4462a · danger-soft #fbede8 · danger-border #ebc9bc · on-danger #ffffff
warning (also "due soon") #8a6520 · warning-soft #fdf6e9 · muted mark #8f877c

Palette, dark theme
bg #141311 · bg-page #0f0e0d · surface #1c1a17 · surface-raised #262320 · surface-muted #191714
border #332f2a · text #ece8e1 · text-secondary #b5aea4 · text-tertiary #8f887e · text-disabled #6b655c
accent #6fb08f · accent-hover #86c2a3 · accent-soft #1e2b24 · accent-tint #1a231e · on-accent #141311
danger #e07b5c · warning #d9a24a · scrim rgb(0 0 0 / 0.6)

Type scale, closed. 11 / 12 / 13 / 14 / 16 / 20 / 26. Libre Franklin for interface text, IBM Plex Mono
for figures, dates, codes and metadata, always with tabular numbers. Weights 400, 500 and 600 only.

Spacing 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Radius 6 / 10 / 13 and a pill. Motion 150ms and 220ms.
Minimum touch target 44.

Rules the system already follows, and that the new components must follow
- Layers separate by luminance and a 1px border. No drop shadows except a single overlay recipe.
- One accent colour. Danger is reserved for destructive or overdue, never for emphasis.
- Status is never carried by colour alone: a glyph or a label always comes with it.
- Calm, plain pt-BR, sentence case, no exclamation marks, no motivational copy, no shame, no streaks.
- WCAG AA contrast, in both themes. Placeholders use the tertiary tone; the disabled tone fails.
- Inputs float their label: it rests inside the frame and lifts onto the border line when the field has
  focus or content, cutting a notch in the border. This already ships; match it.

What to design

Group A, form controls. These are the priority.
1. Textarea: the multi-line sibling of TextField, same floating label and frame, with a resize affordance
   on the web and a growing height on a device. Show it at two and at six lines.
2. PasswordField: TextField with a reveal control inside the frame. Show hidden and revealed.
3. Switch: on, off, disabled, and with a description line under the label.
4. Checkbox: unchecked, checked, indeterminate, disabled, and with an error. Also a group of three.
5. RadioGroup: three options with one selected, disabled, and with an error.
6. Select: closed, open with options, one selected, disabled, with an error. The web opens a popover
   anchored to the field; a device opens a sheet from the bottom. Design both, they are not the same
   control wearing different clothes.
7. MoneyInput and PeriodInput: masked fields. Money reads "R$ 1.234,56" right aligned in mono; period
   reads "MM/AAAA". Show empty, mid-typing and complete.

Group B, presentation.
8. Chip: neutral, accent, and the status tones. Selectable and removable variants.
9. EmptyState: title, one line of body, one action. Show a default and an error tone.
10. Section: a heading, an optional mono meta on the right, an optional quiet action, and its content.
11. Divider, horizontal and vertical.

Group C, feedback and overlay. These differ most between platforms, so design each properly.
12. Modal: title, body, two actions. On the web it is a centred dialog over a scrim; on a phone it is a
    sheet from the bottom with a drag handle and the safe area respected.
13. Toast: a short message, an optional undo action, and a dismiss. It sits at the bottom on a phone,
    above the tab bar and the safe area; on the web it is bottom-left. Show default and error tones.

Already shipping, draw them once for reference and consistency
Text at every scale step and tone · Button in primary, secondary, ghost and danger, at two sizes, with
loading and disabled and full width · Card in its three surface tones · Spinner at two sizes · Field
showing label, hint, error and required · TextField resting, filled, focused, error and disabled.

States every component must show
Default, hovered (web) or pressed (device), focused with a visible focus ring, disabled, and where it
applies: loading, error, empty, selected, and read-only. Draw the focus ring explicitly; it is the state
most often forgotten and the one that decides whether the system is usable by keyboard.

Platform requirements
Draw each component for the browser and for a device. Where the two genuinely differ, show both and say
why in a caption: a Select is a popover on the web and a sheet on a phone; hover does not exist on touch;
a device has a safe area and a keyboard that covers the lower half of the screen. Where they do not
differ, one drawing is enough. Both themes for everything.

Deliverables
A specimen sheet per group, at browser width and at 390pt phone width, in light and dark. Each component
labelled with its name and each state labelled with its name, because those labels become the props.
Export a handoff for Claude Code when done, as a share link or a .zip bundle.

Codebase link
Link https://github.com/lucasfeitosatech/personal-design-sytem so you inherit the exact tokens and the
component contracts already written under packages/core/src/contracts.
