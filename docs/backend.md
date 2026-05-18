# Back-end (API)

A aplicação de Back-end (Controller e Model da arquitetura) está contida na pasta `apps/api`. Foi desenvolvida em **Node.js** utilizando o micro-framework **Express**.

## Estrutura Interna

- `src/models/TodoStore.ts`: Classe *singleton* responsável pelo controle dos dados em memória. Realiza operações clássicas de CRUD (Create, Read, Update, Delete) utilizando um objeto `Map`.
- `src/controllers/todosController.ts`: Rotas HTTP instanciadas via `Express Router` e mapeadas para interagir com o `TodoStore`.
- `src/server.ts`: Ponto de entrada do sistema. Configura as dependências de integração, bibliotecas de segurança (como o `cors`) e habilita o *parsing* de JSON (`express.json()`).

## Contrato de Dados (TodoTask)

```typescript
export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  reminderAt?: string;
  hasReminderActive: boolean;
}
```

## Endpoints

A API baseiza-se localmente na porta 3000: `http://localhost:3000/api`.

### Sistema de Tarefas (`/api/todos`)

- **`GET /api/todos`**: Retorna um array com todas as tarefas existentes.
- **`POST /api/todos`**: Salva uma nova tarefa na memória.
  - Payload Aceito: `{ title: string, reminderAt?: string (em padrão de data ISO) }`
- **`PATCH /api/todos/:id/toggle`**: Modifica a situação (concluída/aberta) da tarefa correspondente ao ID repassado.
- **`DELETE /api/todos/:id`**: Efetua a exclusão da tarefa apontada.

### Health Check (`/api/health`)
- **`GET /api/health`**: Utilitário interno para o sistema Front-end confirmar de forma ágil e barata se a API encontra-se online.

## Executando os Testes

Para acionar as suítes do servidor API isoladamente:
```bash
npm run test -w apps/api
```
