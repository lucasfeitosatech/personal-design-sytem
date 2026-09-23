/**
 * Smoke screen: proves the published design system resolves, types and renders on a device.
 * Replace with the real navigation once the design round lands.
 */
import { Button, Card, Spinner, Text, TextField, ThemeProvider } from '@lucasfeitosatech/components-react-native';
import { BUTTON_VARIANTS } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { darkPalette, lightPalette } from '@lucasfeitosatech/design-tokens';

function Screen() {
  const [name, setName] = useState('');
  const palette = useColorScheme() === 'dark' ? darkPalette : lightPalette;
  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: palette.bgPage }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text size="2xl" weight="semibold">
          Planner
        </Text>
        <Text size="sm" tone="tertiary" mono>
          {palette.accent}
        </Text>
        <Card tone="raised" style={styles.card}>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} onPress={() => setName(variant)}>
              {variant}
            </Button>
          ))}
          <Button variant="primary" loading>
            carregando
          </Button>
        </Card>
        <Card style={styles.card}>
          <TextField label="Nome" hint="Como te chamam" value={name} onValueChange={setName} />
          <TextField label="Valor" mono mode="decimal" error="Obrigatório" prefix={<Text tone="tertiary">R$</Text>} />
          <Spinner label="Carregando" />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Screen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: space[4], gap: space[4] },
  card: { gap: space[3] },
});
