# Especificação Técnica: Todo-List MVC (Mono-repo)

## 1. Arquitetura e Justificativas (Constitution)

### Boas Práticas Fundamentais:

*   **TypeScript Estrito:** A utilização de TypeScript com configurações estritas (como `strict: true` no `tsconfig.json`) garante a detecção precoce de erros em tempo de compilação, melhora a manutenibilidade do código, fornece autocompletar inteligente e documentação implícita, reduzindo a probabilidade de bugs em produção e facilitando o desenvolvimento em equipe.

*   **Separação de Responsabilidades (MVC):** A adoção do padrão Model-View-Controller é crucial para organizar a aplicação. O **Model** encapsulará a lógica de negócio e o estado dos dados (tarefas e lembretes). A **View** será a interface do usuário (React/Vite/TailwindCSS), focada na apresentação e interação direta do usuário. O **Controller** (Node.js/Express) atuará como a ponte, gerenciando as requisições da View e orquestrando as operações no Model. Essa separação promove um código mais limpo, testável e escalável.

*   **Armazenamento Isolado em Memória:** Para este MVP, a persistência dos dados será realizada inteiramente em memória. Essa escolha simplifica a arquitetura inicial, elimina a necessidade de configurar e gerenciar um banco de dados, reduz custos de infraestrutura e acelera o ciclo de desenvolvimento e deploy. O estado será mantido em uma estrutura de dados dedicada no backend, garantindo que as operações sejam rápidas e isoladas.

### Estrutura do Projeto:
*   **Mono-repo:** Centraliza o Front-end (View) e o Back-end (Controller/Model) no mesmo repositório para simplificar a esteira de deploy e o gerenciamento de tipos compartilhados.

## 2. Modelagem de Dados (Contratos)

```typescript
export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  reminderAt?: Date;
  hasReminderActive: boolean;
}
```

## 3. Contrato da API (Endpoints)

* `GET /api/todos` - Lista todas as tarefas.

* `POST /api/todos` - Cria uma nova tarefa (com ou sem lembrete).

* `DELETE /api/todos/:id` - Remove uma tarefa específica.

* `PATCH /api/todos/:id/toggle` - Inverte o status de completada.
