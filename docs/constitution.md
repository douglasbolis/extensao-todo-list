# Constitution

This document outlines the core principles and best practices guiding the development of the Todo-List MVC project.

## 1. TypeScript Estrito

To ensure code quality, maintainability, and early error detection, we enforce strict TypeScript configurations. This includes enabling all compiler checks to catch potential issues during development rather than at runtime. Strict TypeScript leads to more robust and understandable code, especially in team environments.

## 2. Separação de Responsabilidades (MVC Pattern)

The Model-View-Controller (MVC) pattern is fundamental to our architectural design:

*   **Model:** Responsible for managing the application's data and business logic. In this project, it handles the state of tasks and reminders, operating entirely in memory for the initial MVP.
*   **View:** The user interface layer, built with React, Vite, and TailwindCSS. It focuses on presenting data to the user and capturing user input in a mobile-first, responsive manner.
*   **Controller:** Acts as the intermediary between the Model and the View. It exposes API endpoints (using Node.js and Express) to handle requests from the View, orchestrates data operations with the Model, and returns responses.

This separation ensures that each component has a distinct role, making the codebase modular, easier to test, and simpler to scale.

## 3. Armazenamento Isolado em Memória

For the Minimum Viable Product (MVP) phase, all data will be stored in memory. This architectural choice dramatically simplifies the project setup by eliminating the need for a database. It reduces infrastructure costs, lowers deployment complexity, and ensures rapid data access. The state will be managed within a dedicated backend service, providing a fast and isolated data environment for the application's core functionality.
