# Arquitetura e Decisões Técnicas

Este documento descreve os princípios fundamentais e as boas práticas que guiaram o desenvolvimento do projeto.

## 1. Monorepo
A decisão de utilizar a arquitetura de monorepo (via NPM Workspaces) centraliza o código fonte do Front-end e do Back-end. Isso facilita o compartilhamento de configurações, padroniza scripts no `package.json` base e unifica o histórico de versão em um único repositório Git.

## 2. Padrão MVC (Model-View-Controller)
A separação de responsabilidades foi definida de maneira clara:

* **Model (Back-end):** Localizado na estrutura interna de `apps/api/src/models`. Gerencia o estado e as regras de negócio das tarefas (TodoTask). Para a versão MVP (Minimum Viable Product), a arquitetura utiliza armazenamento isolado em memória (através de estruturas da linguagem como `Map`), garantindo agilidade e dispensando banco de dados provisoriamente.
* **Controller (Back-end):** Localizado em `apps/api/src/controllers`. Intermedeia as requisições HTTP da interface com as regras do Model. Usa o Express.js para expor endpoints RESTful seguros.
* **View (Front-end):** Toda a pasta `apps/web`. Uma aplicação React focada inteiramente na interface do usuário (UI) e experiência de uso (UX), consumindo os dados da API.

## 3. TypeScript Estrito
Para mitigar erros em tempo de execução, melhorar a capacidade de manutenção, a escalabilidade e o suporte das IDEs, ambos os ambientes usam TypeScript configurado no modo estrito (`"strict": true`). Isso impede que problemas lógicos passem pelo processo de *build*.

## 4. Testes Automatizados
Foi adotado o **Vitest** como framework de testes para todo o repositório, devido a sua performance superior nativa para TypeScript:
* No **Back-end**, os testes garantem as regras da memória (`TodoStore`) e validam as rotas com auxílio do `supertest` para simular requisições reais.
* No **Front-end**, os testes validam fluxos da UI (renderização de componentes, submissões e digitação) usando o `@testing-library/react` num ambiente `jsdom`.
