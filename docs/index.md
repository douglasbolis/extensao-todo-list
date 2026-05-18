# Bem-vindo ao Todo-List MVC

Este é um projeto de gerenciamento de tarefas (Todo List) construído com base na arquitetura **MVC** (Model-View-Controller) utilizando uma estrutura de **Monorepo**.

O objetivo do projeto é demonstrar uma separação clara de responsabilidades entre a interface de usuário (Front-end/View) e a lógica de negócios e persistência de dados (Back-end/Controller/Model).

## Estrutura do Monorepo

O repositório está dividido em duas aplicações principais dentro da pasta `apps/`:

- **`apps/api`**: Back-end desenvolvido em Node.js com Express e TypeScript. Atua como o **Controller** e o **Model** (armazenando dados em memória).
- **`apps/web`**: Front-end desenvolvido em React com Vite e TailwindCSS. Atua como a **View**.

Além disso, temos a pasta `docs/` que armazena esta documentação (feita no formato MkDocs).

## Como Executar Localmente

O projeto utiliza `npm workspaces` para gerenciar as dependências de forma centralizada.

1. **Instalação Geral:**
   Na raiz do projeto, execute:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Iniciando a API (Back-end):**
   ```bash
   npm run dev -w apps/api
   ```
   A API estará rodando em `http://localhost:3000/api`

3. **Iniciando a Web (Front-end):**
   ```bash
   npm run dev -w apps/web
   ```
   O Front-end estará disponível em `http://localhost:5173/` (ou outra porta livre indicada pelo Vite no terminal).

## Scripts Úteis na Raiz

- `npm run test --workspaces --if-present`: Executa as suítes de testes de todos os pacotes.
- `npm run build --workspaces --if-present`: Faz o build (transpilação TypeScript, bundler do Vite) de todos os pacotes.
