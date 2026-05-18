# Tasks para o Projeto Todo-List MVC

## Estratégia de Implementação
O desenvolvimento seguirá de forma estrita o fluxo Spec-Driven Development. O modelo econômico (Lite) deve ser mantido ativo. Comandos interativos ou loops de teste em segundo plano são proibidos para controle de custos da API.

---

## Fase 1: Setup do Mono-repo & Documentação

- [X] T001 Inicializar estrutura mono-repo criando diretórios `/apps/api`, `/apps/web` e `/docs`.
- [X] T002 Configurar a documentação inicial em MkDocs na pasta `/docs` com suporte básico a Markdown.
- [X] Configurar o arquivo global do GitHub Actions para validar build e preparo para produção.

---

## Fase 2: Back-end (Model & Controller em Memória)

- [X] T004 [P] Criar servidor básico com Node.js (Express ou Fastify) + TypeScript em `/apps/api`.
- [X] T005 [P] Implementar o Model em memória (`TodoStore`) e regras de validação para criação e remoção.
- [X] T006 [P] Criar Controllers e expor as rotas de listagem, cadastro, toggle e remoção de tarefas.
- [X] T007 [P] Criar testes unitários (Vitest) para garantir o comportamento das rotas e do estado em memória.

---

## Fase 3: Front-end (View & Integração)

- [ ] T008 [P] Inicializar projeto React + Vite + TypeScript + TailwindCSS em `/apps/web`.
- [ ] T009 [P] Criar serviço de API base integrado ao back-end local do monorepo.
- [ ] T010 Criar componentes de UI mobile-first: Formulário de cadastro (com seletor de data/hora para lembrete), Listagem de tarefas e Card de Alerta de Lembrete Ativo.
- [ ] T011 Implementar lógica para checar lembretes ativos em background (via setInterval simples na View ou Notification API).
- [ ] T012 [P] Criar testes unitários e de comportamento (Vitest + Testing Library) para os fluxos da View.

---

## Fase 4: Deploy & Encerramento

- [X] T013 Publicar a documentação do MkDocs em um provedor gratuito (GitHub Pages / Read the Docs).
- [X] T014 Colocar a API e a View em produção em um servidor gratuito (Render, Railway, Fly.io ou Vercel).
- [X] T015 Revisar documentação final gerando o arquivo com os links solicitados para submissão.
