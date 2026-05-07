# Modelos e Entidades - Backend

Definição das estruturas de dados internas.

## Produto
-   `id`: int
-   `nome`: str
-   `categoria_id`: int
-   `unidade`: str (un, kg, l)

## Categoria
-   `id`: int
-   `nome`: str

## Cotacao
-   `id`: int
-   `produto_id`: int
-   `valor`: float
-   `data_coleta`: date
