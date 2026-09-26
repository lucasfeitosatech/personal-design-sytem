import type { TextWeight } from '@lucasfeitosatech/design-core';
import { nativeFonts } from '@lucasfeitosatech/design-tokens';
import { Platform, StyleSheet } from 'react-native';

/**
 * The families an app bundles: Android resolves them by asset file name, iOS by PostScript name, and
 * the token map carries both. An app that has not bundled the files resolves nothing and the platform
 * falls back to its own font, which is why `fontWeight` is still set beside the family.
 */
const families = Platform.select({ ios: nativeFonts.ios, android: nativeFonts.android, default: nativeFonts.ios });

/** Mono ships two faces, so anything heavier than regular renders as Medium. */
export function fontFamily(weight: TextWeight, mono: boolean): string {
  if (mono) return weight === 'regular' ? families.monoRegular : families.monoMedium;
  if (weight === 'semibold') return families.uiSemibold;
  if (weight === 'medium') return families.uiMedium;
  return families.uiRegular;
}

export const styles = StyleSheet.create({
  base: { lineHeight: undefined },
});
