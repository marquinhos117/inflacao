# Entidades do Sistema

O domínio do sistema é composto pelas seguintes entidades principais:

## 1. Produto (Product)
Representa um item que pode ser comercializado e monitorado.
-   `id`: Identificador único (UUID ou Int).
-   `nome`: Nome descritivo (ex: Arroz Agulhinha).
-   `categoria_id`: Vínculo com a categoria.
-   `unidade`: kg, un, l, etc.
-   `descricao`: Detalhes adicionais.

## 2. Categoria (Category)
Agrupamento lógico de produtos.
-   `id`: Identificador único.
-   `nome`: Nome da categoria (ex: Alimentação).
-   `icone`: Identificador visual para o frontend.

## 3. Cotação (PriceEntry)
Registro de um preço específico em um ponto do tempo.
-   `id`: Identificador único.
-   `produto_id`: Referência ao produto.
-   `valor`: Preço em R$.
-   `data_coleta`: Data em que o preço foi verificado.
-   `estabelecimento`: Local onde o dado foi coletado (Opcional).

## 4. IndiceInflacao (InflationIndex)
Resultado processado de cálculos temporais.
-   `periodo`: Mês/Ano de referência.
-   `valor`: Índice percentual acumulado.
-   `variacao`: Variação em relação ao mês anterior.
