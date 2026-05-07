# Regras de Negócio

Este documento descreve as lógicas fundamentais que regem o cálculo de inflação e a gestão de produtos no SMIM.

## 1. Gestão de Produtos
-   Cada produto deve pertencer a uma **Categoria** (ex: Alimentação, Higiene, Limpeza).
-   Cada produto possui uma **Unidade de Medida** obrigatória para garantir a comparabilidade (kg, litro, unidade).
-   Não é permitido excluir um produto que possua histórico de cotações (integridade referencial).

## 2. Cálculo de Inflação (Índice Local)
Diferente da versão original mockada, o novo sistema utiliza a seguinte lógica:
-   **Variação de Preço:** Calculada comparando a cotação atual com a cotação do período anterior.
-   **Média Ponderada:** Os itens da cesta básica possuem pesos diferentes conforme a relevância no consumo familiar típico em Morrinhos.
-   **Fórmula Base:** `((Preço Atual - Preço Anterior) / Preço Anterior) * 100`.

## 3. Cesta Personalizada
-   O usuário pode selecionar quantidades arbitrárias de produtos.
-   O sistema calcula o custo total da cesta e a variação percentual baseada no histórico de preços cadastrados.

## 4. Validações
-   Cotações não podem ter valores negativos.
-   Datas de cotação não podem ser futuras.
