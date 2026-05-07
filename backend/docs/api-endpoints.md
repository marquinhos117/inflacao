# API Endpoints - Backend SMIM

Abaixo detalhamos os endpoints da API v1.

## Auth (Opcional/Futuro)
*Preparado para segurança JWT.*

## Produtos
### `GET /api/v1/produtos`
Retorna a lista de produtos.
-   **Query Params:** `skip`, `limit`, `categoria`.

### `POST /api/v1/produtos`
Cria um novo produto.
-   **Body:** `ProdutoCreate` (nome, categoria_id, unidade, descricao).

### `GET /api/v1/produtos/{id}`
Busca detalhes de um produto.

## Cotações
### `GET /api/v1/cotacoes`
Histórico geral de preços.

### `POST /api/v1/cotacoes`
Registra um novo preço.
-   **Body:** `CotacaoCreate` (produto_id, valor, data_coleta).

## Inflação
### `GET /api/v1/inflacao/indice-atual`
Retorna o índice consolidado do último mês.

### `POST /api/v1/inflacao/simular-cesta`
Calcula a variação de uma cesta específica.
-   **Body:** `CestaRequest` (itens: [{produto_id, quantidade}]).
