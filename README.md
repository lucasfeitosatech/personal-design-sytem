# Design system

One identity, one contract, two renderers: React (web) and React Native.

```
tokens/source/   DTCG JSON — the only place a value is edited
tokens/core/     shared contract vocabulary (sizes, variants) as const arrays + types
src/headless/    platform-free logic: validation, formatting, masks, state
src/web/         React DOM components + CSS Modules
src/native/      React Native components
docs/            the design decisions and one contract per primitive
```

**The dependency rule.** `headless` never imports `web` or `native`. `web` and `native` never import
each other. Both consume `tokens` and `headless`. No entry point loads both renderers, and the types
of one must never reference the other. That is what keeps React Native out of a browser bundle.

## Entry points

| Import | Serves |
|---|---|
| `@lucasfeitosatech/design-system/tokens` | both |
| `@lucasfeitosatech/design-system/tokens.css` | web |
| `@lucasfeitosatech/design-system/headless` | both |
| `@lucasfeitosatech/design-system/web` | web |
| `@lucasfeitosatech/design-system/native` | React Native |

## Tokens

`npm run tokens:build` turns `tokens/source/*.tokens.json` into three artifacts with three unit
policies: CSS custom properties with values verbatim, and TypeScript constants where dimensions and
durations are numbers. Colours reach TypeScript as `rgba()` because React Native does not parse the
modern `rgb(r g b / a)` syntax. Font stacks and shadow recipes are web-only by nature; native needs a
family name and its own elevation recipe, so they are exported apart from the palette.

Names are exactly the ones already shipping on the web, so adopting this package is a value-for-value
swap with no renaming. The `finance` group in the source keeps the domain vocabulary visible; it is
flattened on output until the apps are ready to rename.

## Not everything crosses

Some components only make sense on one platform. A DataGrid is not a DataGrid on a phone. The package
declares those under a single renderer instead of faking an equivalent.

Navigation, form bindings, list virtualisation, gestures, animation drivers and file pickers stay in
the applications. What is shared there is the intent, the schema, the labels and the protocol.
