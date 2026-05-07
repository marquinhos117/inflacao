from pydantic import BaseModel
from typing import Optional
from datetime import date

class ProdutoBase(BaseModel):
    nome: str
    categoria_id: int
    unidade: str
    descricao: Optional[str] = None

class ProdutoCreate(ProdutoBase):
    pass

class Produto(ProdutoBase):
    id: int

    class Config:
        from_attributes = True

class CotacaoBase(BaseModel):
    produto_id: int
    valor: float
    data_coleta: date

class CotacaoCreate(CotacaoBase):
    pass

class Cotacao(CotacaoBase):
    id: int

    class Config:
        from_attributes = True

class Categoria(BaseModel):
    id: int
    nome: str
