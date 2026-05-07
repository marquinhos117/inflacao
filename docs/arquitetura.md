# Arquitetura do Sistema

O SMIM adota uma arquitetura de sistemas distribuídos moderna, separando claramente as responsabilidades entre Backend, Frontend e Documentação.

## 1. Topologia Geral
O sistema é dividido em dois grandes blocos que se comunicam via protocolo HTTP (REST):

### Backend (FastAPI)
-   **Core:** Configurações globais e segurança.
-   **Routes:** Definição dos contratos de API.
-   **Services:** Lógica de negócio (cálculos de índices, validações complexas).
-   **Repositories:** Camada de abstração de dados (preparada para banco de dados).
-   **Models/Schemas:** Definição das entidades e contratos Pydantic.

### Frontend (React + Vite)
-   **Components:** UI reutilizável.
-   **Services:** Integração com a API via Axios/Fetch.
-   **Hooks/State:** Gerenciamento de estado global e cache de requisições.

## 2. Padrões de Projeto (Design Patterns)
-   **Repository Pattern:** Para isolar a lógica de persistência.
-   **Dependency Injection:** Nativo do FastAPI para serviços e configurações.
-   **Singleton:** Para instâncias de conexão e configurações globais.
-   **DTO (Data Transfer Objects):** Implementados via Pydantic Schemas.

## 3. Fluxo de Dados
1. O Usuário interage com o **Frontend**.
2. O Frontend faz uma requisição para o **Backend**.
3. O **Middleware** valida CORS e Logs.
4. A **Router** direciona para o **Service** correspondente.
5. O **Service** solicita dados ao **Repository**.
6. O **Repository** acessa o Mock (ou DB) e retorna objetos de **Model**.
7. O **Service** processa e retorna um **Schema** (JSON) para o Frontend.
