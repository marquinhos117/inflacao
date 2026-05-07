# Exemplos de Requisições

## Criar Produto
`POST /api/v1/produtos`
```json
{
  "nome": "Arroz Cristal 5kg",
  "categoria_id": 1,
  "unidade": "un",
  "descricao": "Arroz tipo 1"
}
```

## Registrar Cotação
`POST /api/v1/cotacoes`
```json
{
  "produto_id": 1,
  "valor": 29.90,
  "data_coleta": "2026-05-01"
}
```
