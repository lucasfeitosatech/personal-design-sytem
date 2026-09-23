# components-react-native

React Native components of the design system.

This package ships **TypeScript source**, not a build. Metro compiles it with the React Native Babel
preset, which avoids the two classic failures of pre-bundled native libraries: a second copy of React
and a JSX transform that does not match the host app. The trade-off is that the consuming app must
not exclude this package from transpilation.
