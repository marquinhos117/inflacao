# Endpoints da API

Abaixo estão listados os principais endpoints disponíveis no sistema.

## Produtos (`/api/v1/produtos`)
-   `GET /`: Lista todos os produtos com suporte a paginação e filtros.
-   `POST /`: Cadastra um novo produto.
-   `GET /{id}`: Detalhes de um produto específico.
-   `PUT /{id}`: Atualiza dados do produto.
-   `DELETE /{id}`: Remove um produto (se permitido).

## Cotações (`/api/v1/cotacoes`)
-   `GET /`: Lista histórico de preços.
-   `POST /`: Registra um novo preço coletado.
-   `GET /produto/{id}`: Histórico de preços de um produto específico.

## Inflação (`/api/v1/inflacao`)
-   `GET /indice-atual`: Retorna o índice oficial do mês vigente.
-   `POST /simular-cesta`: Recebe itens e retorna a variação simulada.

## Status (`/`)
-   `GET /health`: Verifica a saúde do sistema.
