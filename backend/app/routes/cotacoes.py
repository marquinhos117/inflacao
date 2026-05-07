from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.domain import Cotacao, CotacaoCreate
from app.repositories.base import cotacao_repo

router = APIRouter()

@router.get("/", response_model=List[Cotacao])
def listar_cotacoes():
    return cotacao_repo.get_all()

@router.post("/", response_model=Cotacao, status_code=201)
def registrar_cotacao(cotacao: CotacaoCreate):
    return cotacao_repo.create(cotacao)

@router.get("/produto/{produto_id}", response_model=List[Cotacao])
def listar_cotacoes_por_produto(produto_id: int):
    return cotacao_repo.get_by_produto(produto_id)
