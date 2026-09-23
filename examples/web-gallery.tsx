// Gallery: every component and state, for validating a tarball in a web app.
import {
  Button, Card, Checkbox, PasswordField, RadioGroup, Spinner, Switch, Text, Textarea, TextField,
} from '@lucasfeitosatech/components-react';
import '@lucasfeitosatech/components-react/styles.css';
import '@lucasfeitosatech/design-tokens/tokens.css';
import { BUTTON_VARIANTS } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { useState } from 'react';

export function WebGallery() {
  const [empty, setEmpty] = useState('');
  const [filled, setFilled] = useState('Lucas Feitosa');
  const [note, setNote] = useState('');
  const [secret, setSecret] = useState('senha-secreta');
  const [on, setOn] = useState(true);
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
  const [choice, setChoice] = useState('mensal');

  return (
    <div style={{ display: 'grid', gap: space[4], padding: space[5], maxWidth: 420 }}>
      <Text as="h2" size="2xl" weight="semibold">Componentes</Text>

      <Card tone="raised" style={{ display: 'grid', gap: space[3] }}>
        {BUTTON_VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
        <Button variant="primary" loading>carregando</Button>
      </Card>

      <Card style={{ display: 'grid', gap: space[4] }}>
        <TextField label="Vazio" hint="rótulo em repouso" value={empty} onValueChange={setEmpty} />
        <TextField label="Preenchido" value={filled} onValueChange={setFilled} />
        <TextField label="Valor" mono mode="decimal" value="1.234,56" onValueChange={() => {}} prefix="R$" />
        <PasswordField label="Senha" value={secret} onValueChange={setSecret} />
        <TextField label="Com erro" error="Obrigatório" value="" onValueChange={() => {}} />
        <TextField label="Desabilitado" disabled value="não editável" onValueChange={() => {}} />
      </Card>

      <Card style={{ display: 'grid', gap: space[4] }}>
        <Textarea label="Anotação" hint="cresce com o texto" rows={3} maxRows={8} value={note} onValueChange={setNote} />
      </Card>

      <Card style={{ display: 'grid', gap: space[4] }}>
        <Switch checked={on} onCheckedChange={setOn} label="Usar IA neste espaço" description="Nada é gerado sem um toque seu." />
        <Switch checked={false} onCheckedChange={() => {}} label="Desabilitado" disabled />
        <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v)} label="Selecionar tudo" description="parcialmente marcado" />
        <Checkbox checked={false} onCheckedChange={() => {}} label="Com erro" error="Escolha ao menos um" />
        <RadioGroup
          label="Recorrência"
          value={choice}
          onValueChange={setChoice}
          options={[
            { value: 'mensal', label: 'Mensal', description: 'todo mês, no mesmo dia' },
            { value: 'anual', label: 'Anual' },
            { value: 'unica', label: 'Única', disabled: true },
          ]}
        />
        <Spinner label="Carregando" />
      </Card>
    </div>
  );
}
