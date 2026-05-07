from fastapi import APIRouter
from app.routes import produtos, inflacao, cotacoes

api_router = APIRouter()

api_router.include_router(produtos.router, prefix="/produtos", tags=["Produtos"])
api_router.include_router(cotacoes.router, prefix="/cotacoes", tags=["Cotações"])
api_router.include_router(inflacao.router, prefix="/inflacao", tags=["Inflação"])
