# Serviços (Lógica de Negócio)

Os serviços isolam a inteligência do sistema.

## `InflacaoService`
-   `calcular_variacao(preco_antigo, preco_novo)`: Retorna % de variação.
-   `calcular_indice_mensal()`: Varre todas as cotações do mês e gera a média ponderada.

## `ProdutoService`
-   Valida se o nome do produto já existe antes de criar.
-   Gerencia a lógica de soft-delete ou restrições de exclusão.
