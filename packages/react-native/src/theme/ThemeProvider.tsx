import { darkPalette, lightPalette, type Palette } from '@lucasfeitosatech/design-tokens';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export type ThemePreference = 'light' | 'dark' | 'system';
export type Theme = { palette: Palette; scheme: 'light' | 'dark' };

const ThemeContext = createContext<Theme>({ palette: lightPalette, scheme: 'light' });

/** Resolves the palette from the device scheme, or from an explicit preference when the user sets one. */
export function ThemeProvider({ preference = 'system', children }: { preference?: ThemePreference; children: ReactNode }) {
  const device = useColorScheme();
  const value = useMemo<Theme>(() => {
    const scheme = preference === 'system' ? (device === 'dark' ? 'dark' : 'light') : preference;
    return { scheme, palette: scheme === 'dark' ? darkPalette : lightPalette };
  }, [preference, device]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
