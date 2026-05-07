from fastapi import APIRouter
from app.schemas.inflacao import ResultadoInflacao, CestaRequest
from app.services.inflacao import inflacao_service

router = APIRouter()

@router.get("/indice-atual", response_model=ResultadoInflacao)
def obter_indice_atual():
    return inflacao_service.calcular_indice_atual()

@router.post("/simular-cesta", response_model=ResultadoInflacao)
def simular_cesta(cesta: CestaRequest):
    return inflacao_service.simular_cesta(cesta)
