from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.domain import Produto, ProdutoCreate
from app.repositories.base import produto_repo

router = APIRouter()

@router.get("/", response_model=List[Produto])
def listar_produtos():
    return produto_repo.get_all()

@router.post("/", response_model=Produto, status_code=201)
def criar_produto(produto: ProdutoCreate):
    return produto_repo.create(produto)

@router.get("/{id}", response_model=Produto)
def obter_produto(id: int):
    p = produto_repo.get_by_id(id)
    if not p:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return p
