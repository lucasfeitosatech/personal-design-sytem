// Temporary: proves the published package resolves, types and ships its stylesheet.
import { Button, Card, Field, Spinner, Text, TextField } from '@lucasfeitosatech/components-react';
import '@lucasfeitosatech/components-react/styles.css';
import '@lucasfeitosatech/design-tokens/tokens.css';
import { BUTTON_VARIANTS, type ButtonVariant } from '@lucasfeitosatech/design-core';
import { lightPalette, space } from '@lucasfeitosatech/design-tokens';

export function DsSmoke() {
  const variants: readonly ButtonVariant[] = BUTTON_VARIANTS;
  return (
    <Card tone="raised" style={{ display: 'grid', gap: space[3] }}>
      <Text as="h2" size="xl" weight="semibold">
        Amostra
      </Text>
      <Text size="sm" tone="tertiary" mono>
        {lightPalette.accent}
      </Text>
      {variants.map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
      <TextField label="Nome" hint="Como te chamam" onValueChange={() => {}} />
      <TextField label="Valor" mono mode="decimal" error="Obrigatório" prefix="R$" />
      <Field label="Bloco">{(control) => <input {...control} />}</Field>
      <Spinner label="Carregando" />
    </Card>
  );
}
