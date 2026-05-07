# Arquitetura do Backend

O backend segue o padrão de **Camadas** para garantir o desacoplamento.

## Camadas
1.  **Routes (Controllers):** Responsável por receber o HTTP Request, validar o Schema Pydantic e chamar o Service.
2.  **Services:** Contém toda a lógica de negócio (ex: cálculo de inflação, validação de regras).
3.  **Repositories:** Interface de comunicação com a persistência de dados.
4.  **Schemas (DTOs):** Modelos de dados para entrada e saída da API.
5.  **Core:** Configurações centralizadas (CORS, Logging, App Info).

## Injeção de Dependências
Utilizamos o sistema de `Depends` do FastAPI para injetar serviços nas rotas, facilitando testes unitários.
