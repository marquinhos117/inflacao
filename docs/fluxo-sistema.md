# Fluxo do Sistema

O funcionamento do sistema segue uma jornada lógica dividida entre Administração e Consulta.

## 1. Fluxo de Alimentação de Dados (Admin)
1.  **Cadastro de Produto:** O administrador registra um novo produto no sistema.
2.  **Lançamento de Preços:** Periodicamente, novas cotações são inseridas para os produtos existentes.
3.  **Processamento:** O backend atualiza automaticamente os indicadores de variação média.

## 2. Fluxo de Consulta (Cidadão/Pesquisador)
1.  **Dashboard:** O usuário visualiza o índice geral de inflação do mês atual.
2.  **Exploração:** O usuário navega por categorias para ver quais itens tiveram maior alta ou baixa.
3.  **Simulação:**
    -   Usuário adiciona itens a uma "Cesta Virtual".
    -   Define as quantidades.
    -   O sistema retorna o custo total e a comparação com o mês anterior.

## 3. Fluxo de API (Integradores)
1.  **Autenticação:** (Preparado para OAuth2/JWT).
2.  **Request:** Envio de parâmetros de filtro (data, categoria).
3.  **Response:** Recebimento de dados estruturados em JSON para uso em outros sistemas.
