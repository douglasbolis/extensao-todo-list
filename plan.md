# Plano Técnico de Engenharia: Todo-List MVC Monorepo

## 1. Estrutura de Diretórios do Monorepo
O projeto será organizado de forma estrita na seguinte estrutura de pastas:
* `/apps/api/` - Back-end em Node.js + TypeScript (Model e Controller em memória).
* `/apps/web/` - Front-end em React + Vite + TailwindCSS (View).
* `/docs/` - Documentação do projeto gerenciada via MkDocs.

## 2. Stack Tecnológica por Módulo

### Back-end (`/apps/api`)
* **Runtime & Linguagem:** Node.js com TypeScript.
* **Framework:** Express ou Fastify para exposição das rotas.
* **Banco de Dados:** Nenhum (Persistência em memória usando estruturas nativas do JS como Arrays ou Maps).
* **Testes:** Vitest.

### Front-end (`/apps/web`)
* **Framework & Bundler:** React com Vite e TypeScript.
* **Estilização:** TailwindCSS (Design Responsivo e Mobile-first).
* **Gerenciamento de Estado:** React Context API ou Zustand.
* **Testes:** Vitest + React Testing Library.

### Documentação (`/docs`)
* **Gerador:** MkDocs rodando localmente e preparado para deploy estático.

## 3. Estratégia de Integração e Deploy
* A comunicação entre o Front-end e o Back-end será feita via requisições HTTP (`fetch` ou `axios`) consumindo os endpoints `/api/todos`.
* O deploy será preparado para servidores gratuitos isolados (ex: Vercel para o Front-end/Docs, Render/Railway para a API).
