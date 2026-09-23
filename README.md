# Design system

Reusable components for React and React Native, one identity across both. Four packages published
from one repository, so a token change and the two implementations that follow it land together.

| Package | Serves | Ships |
|---|---|---|
| `@lucasfeitosatech/design-tokens` | both | CSS custom properties and TypeScript constants, generated from one DTCG source |
| `@lucasfeitosatech/design-core` | both | component contracts and headless logic; imports no renderer |
| `@lucasfeitosatech/components-react` | browser | React components with CSS Modules |
| `@lucasfeitosatech/components-react-native` | iOS and Android | React Native components |

**The dependency rule.** `design-core` never imports a renderer. The two component packages never
import each other. Both depend on tokens and core. That is what keeps React Native out of a browser
bundle and the DOM out of a native build.

## A component lives in three places

The contract is written once in `design-core`: the variants, the sizes, the states every
implementation must cover. Each renderer then implements it in its own idiom. The web Button is a
`<button>` with `:hover` and `:focus-visible`; the native Button is a `Pressable` with `hitSlop` and
an accessibility role. Same name, same variants, same version, two files of about forty lines.

## Not everything crosses

Some components only make sense on one platform. A DataGrid is not a DataGrid on a phone. Those are
published under a single renderer instead of faking an equivalent.

Navigation, form bindings, list virtualisation, gestures, animation drivers and file pickers stay in
the applications. What is shared there is the intent, the schema, the labels and the protocol.

## Building

```
npm install
npm run build      # tokens first, then the packages that consume them
npm run typecheck
```

`design-tokens` generates `src/` from `source/*.tokens.json` and then compiles it, so a token change
is visible as a source diff before it becomes a build artifact.
