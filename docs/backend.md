# Documentação do Backend

O backend é o motor de processamento do SMIM, construído com foco em performance e manutenibilidade.

## Tecnologias Utilizadas
-   **FastAPI:** Framework moderno e rápido para Python.
-   **Pydantic v2:** Validação de dados e serialização.
-   **Uvicorn:** Servidor ASGI de alta performance.
-   **Python Decouple:** Gestão de configurações.

## Destaques da Implementação
-   **Injeção de Dependência:** Utilizada para desacoplar a camada de serviços da camada de dados.
-   **Tratamento de Erros Global:** Middleware que captura exceções e formata em JSON padronizado.
-   **CORS:** Configurado para aceitar requisições seguras do domínio do frontend.
-   **Schemas Reutilizáveis:** Herança de schemas Pydantic para evitar duplicação de definições de dados.

## Segurança
-   Filtros de entrada rigorosos.
-   Sanitização de strings.
-   Estrutura preparada para implementação de JWT.
