// Gallery: every component and every input state, for validating a tarball in a web app.
import { Button, Card, Spinner, Text, TextField } from '@lucasfeitosatech/components-react';
import '@lucasfeitosatech/components-react/styles.css';
import '@lucasfeitosatech/design-tokens/tokens.css';
import { BUTTON_VARIANTS } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { useState } from 'react';

export function WebGallery() {
  const [empty, setEmpty] = useState('');
  const [filled, setFilled] = useState('Lucas Feitosa');
  return (
    <div style={{ display: 'grid', gap: space[4], padding: space[5], maxWidth: 420 }}>
      <Text as="h2" size="2xl" weight="semibold">Planner</Text>
      <Card tone="raised" style={{ display: 'grid', gap: space[3] }}>
        {BUTTON_VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
        <Button variant="primary" loading>carregando</Button>
      </Card>
      <Card style={{ display: 'grid', gap: space[4] }}>
        <TextField label="Vazio" hint="rótulo em repouso" value={empty} onValueChange={setEmpty} />
        <TextField label="Preenchido" value={filled} onValueChange={setFilled} />
        <TextField label="Valor" mono mode="decimal" value="1.234,56" onValueChange={() => {}} prefix="R$" />
        <TextField label="Com erro" error="Obrigatório" value="" onValueChange={() => {}} />
        <TextField label="Desabilitado" disabled value="não editável" onValueChange={() => {}} />
        <Spinner label="Carregando" />
      </Card>
    </div>
  );
}
