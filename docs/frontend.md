# Front-end (Web View)

A aplicação do Front-end (Camada *View* da arquitetura) fica na pasta `apps/web`. Trata-se de uma *Single Page Application* (SPA) construída com a biblioteca **React**, utilizando o **Vite** para um empacotamento ágil.

## Tecnologias e Visual

- **React & Vite:** Proporcionam atualizações instantâneas de tela (HMR) e carregamento otimizado na versão final de produção.
- **TailwindCSS:** A aplicação foi integralmente estilizada usando o modelo de classes utilitárias. O design segue o conceito de *Mobile-First*, criando telas leves, com bom espaçamento e clareza visual, sem a necessidade de manter complexas planilhas de estilo separadas.
- **Axios:** Cliente robusto encarregado da gestão de requests assíncronos HTTP configurado na pasta `src/services/api.ts`.

## Composição Visual (Componentes)

### `App.tsx` (Contêiner Principal)
Maneja a complexidade geral da interface. Fica ao encargo deste arquivo:
1. Requisitar a lista de atividades na montagem inicial e em atualizações.
2. Interagir via Axios em operações com o banco em memória (concluir e deletar), manipulando a fila (optimistic updates).
3. **Mecanismo de Lembretes:** Atua executando um `setInterval` invisível de segundo em background (a cada 60s) recarregando estados que disparem notificações em tela quando uma tarefa agendada cruzar a linha do horário atual sem estar concluída.

### `TodoForm.tsx` (Componente de Formulário)
Elemento isolado para cadastro. Contém:
- Campo de inserção de texto descritivo.
- Suporte nativo ao componente de inputs complexos de data/hora do HTML5 (`type="datetime-local"`).
- Sistema de restrição (*disabled state*) que impede requisições duplas durante *loadings* de API.

### `TodoItem.tsx` (Componente de Lista)
Lida com as renderizações unitárias das tarefas.
- Altera sua marcação com classes do Tailwind (`line-through`) caso a flag `completed` retorne verdadeira.
- Destaca criticidade (fundo de alerta vermelho pálido e fonte enfatizada) para itens que excederam o *timer* do lembrete, desde que não tenham sido marcados como concluídos.

## Executando os Testes

Utilizamos no *Front-end* **Vitest** acompanhado do **React Testing Library**. Há verificação do DOM Virtual validando eventos como: comportamentos passivos da interface de erro, submissões vazias bloqueadas, clicks em checklists, entre outros.

Para acionar as suítes da Interface isoladamente:
```bash
npm run test -w apps/web
```
