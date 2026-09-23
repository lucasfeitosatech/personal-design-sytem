import { Platform, StyleSheet } from 'react-native';

/**
 * The UI font is deliberately the system one: the CSS stack in the tokens is a list of fallbacks,
 * and a device needs the family name of a font that is installed or bundled. Bundling Libre
 * Franklin and IBM Plex Mono is its own task; until then mono falls back to the platform default.
 */
export const monoFamily = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

export const styles = StyleSheet.create({
  base: { lineHeight: undefined },
});
