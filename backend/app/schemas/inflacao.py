from pydantic import BaseModel
from typing import List

class ItemCesta(BaseModel):
    produto_id: int
    quantidade: float

class CestaRequest(BaseModel):
    itens: List[ItemCesta]

class ResultadoInflacao(BaseModel):
    indice_geral: float
    total_itens: int
    variacao_mensal: float
    descricao: str
