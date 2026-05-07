from app.schemas.domain import Produto, Categoria, Cotacao
from datetime import date

CATEGORIAS_MOCK = [
    Categoria(id=1, nome="Alimentação"),
    Categoria(id=2, nome="Higiene"),
    Categoria(id=3, nome="Limpeza")
]

PRODUTOS_MOCK = [
    Produto(id=1, nome="Arroz Tipo 1 (5kg)", categoria_id=1, unidade="un", descricao="Arroz agulhinha"),
    Produto(id=2, nome="Feijão Carioca (1kg)", categoria_id=1, unidade="un", descricao="Feijão novo"),
    Produto(id=3, nome="Óleo de Soja (900ml)", categoria_id=1, unidade="un", descricao="Óleo vegetal"),
    Produto(id=4, nome="Creme Dental", categoria_id=2, unidade="un", descricao="90g"),
    Produto(id=5, nome="Sabão em Pó", categoria_id=3, unidade="kg", descricao="Lavagem de roupas")
]

COTACOES_MOCK = [
    Cotacao(id=1, produto_id=1, valor=25.90, data_coleta=date(2026, 3, 1)),
    Cotacao(id=2, produto_id=1, valor=27.50, data_coleta=date(2026, 4, 1)),
    Cotacao(id=3, produto_id=1, valor=29.90, data_coleta=date(2026, 5, 1)),
    
    Cotacao(id=4, produto_id=2, valor=6.50, data_coleta=date(2026, 4, 1)),
    Cotacao(id=5, produto_id=2, valor=7.20, data_coleta=date(2026, 5, 1)),
]
