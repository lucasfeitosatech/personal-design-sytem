// Gallery: every component and state, for validating a tarball in a web app.
import {
  Button, Card, Checkbox, Chip, Divider, EmptyState, Modal, PasswordField, RadioGroup, Section,
  MoneyInput, PeriodInput, Select, Spinner, Switch, Text, Textarea, TextField, Toast, ToastRegion,
} from '@lucasfeitosatech/components-react';
import '@lucasfeitosatech/components-react/styles.css';
import '@lucasfeitosatech/design-tokens/tokens.css';
import { BUTTON_VARIANTS, CHIP_TONES } from '@lucasfeitosatech/design-core';
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
  const [picked, setPicked] = useState<string>('accent');
  const [banco, setBanco] = useState('nubank');
  const [cents, setCents] = useState('123456');
  const [period, setPeriod] = useState('032026');
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<'default' | 'error' | null>(null);

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

      <Section title="Etiquetas" meta="6 tons" action={<Text size="xs" tone="accent">ver todos</Text>}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[2] }}>
          {CHIP_TONES.map((t) => (
            <Chip key={t} label={t} tone={t} selected={picked === t} onClick={() => setPicked(t)} />
          ))}
        </div>
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: space[2] }}>
          <Chip label="1.234,56" tone="neutral" mono />
          <Chip label="removível" tone="accent" onRemove={() => {}} />
        </div>
      </Section>

      <EmptyState
        title="Nada registrado em setembro ainda."
        body="Comece marcando uma prática ou escrevendo uma linha."
        actions={<Button variant="secondary" size="sm">Escrever no diário</Button>}
      />
      <EmptyState tone="error" title="Não foi possível carregar." actions={<Button variant="primary" size="sm">Tentar de novo</Button>} />

      <Card style={{ display: 'grid', gap: space[4] }}>
        <Select
          label="Banco"
          hint="popover ancorado, com setas e busca por letra"
          value={banco}
          onValueChange={setBanco}
          options={[
            { value: 'nubank', label: 'Nubank', description: 'conta corrente' },
            { value: 'itau', label: 'Itaú' },
            { value: 'bb', label: 'Banco do Brasil' },
            { value: 'caixa', label: 'Caixa', disabled: true },
          ]}
        />
        <Select label="Com erro" error="Escolha um banco" options={[{ value: 'a', label: 'Opção A' }]} onValueChange={() => {}} />
        <MoneyInput label="Valor" hint="preenche da direita, como uma máquina registradora" value={cents} onValueChange={setCents} />
        <MoneyInput label="Vazio" value="" onValueChange={() => {}} />
        <PeriodInput label="Período" value={period} onValueChange={setPeriod} />
        <PeriodInput label="Mês inválido" value="132026" error="Mês entre 01 e 12" onValueChange={() => {}} />
        <Button variant="danger" onClick={() => setConfirm(true)}>Abrir confirmação</Button>
        <Button variant="secondary" onClick={() => setToast('default')}>Mostrar aviso</Button>
        <Button variant="ghost" onClick={() => setToast('error')}>Mostrar erro</Button>
      </Card>

      <Modal
        open={confirm}
        alert
        title="Excluir a conta Netflix?"
        body="As ocorrências já pagas continuam no histórico. Isso não pode ser desfeito."
        primaryAction={{ label: 'Excluir', onPress: () => setConfirm(false) }}
        secondaryAction={{ label: 'Cancelar' }}
        onClose={() => setConfirm(false)}
      />

      <ToastRegion>
        {toast ? (
          <Toast
            message={toast === 'error' ? 'Não foi possível salvar.' : 'Conta marcada como paga.'}
            tone={toast}
            actionLabel={toast === 'default' ? 'Desfazer' : undefined}
            onAction={() => setToast(null)}
            onDismiss={() => setToast(null)}
          />
        ) : null}
      </ToastRegion>
    </div>
  );
}
