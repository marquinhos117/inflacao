from app.mock.data import PRODUTOS_MOCK, COTACOES_MOCK
from app.schemas.domain import Produto, ProdutoCreate, Cotacao, CotacaoCreate

class BaseRepository:
    def __init__(self, data_list):
        self._data = data_list

    def get_all(self):
        return self._data

    def get_by_id(self, id: int):
        return next((item for item in self._data if item.id == id), None)

class ProdutoRepository(BaseRepository):
    def __init__(self):
        super().__init__(PRODUTOS_MOCK)

    def create(self, produto: ProdutoCreate) -> Produto:
        new_id = max([p.id for p in self._data]) + 1 if self._data else 1
        new_produto = Produto(id=new_id, **produto.model_dump())
        self._data.append(new_produto)
        return new_produto

class CotacaoRepository(BaseRepository):
    def __init__(self):
        super().__init__(COTACOES_MOCK)

    def create(self, cotacao: CotacaoCreate) -> Cotacao:
        new_id = max([c.id for c in self._data]) + 1 if self._data else 1
        new_cotacao = Cotacao(id=new_id, **cotacao.model_dump())
        self._data.append(new_cotacao)
        return new_cotacao
    
    def get_by_produto(self, produto_id: int):
        return [c for c in self._data if c.produto_id == produto_id]

produto_repo = ProdutoRepository()
cotacao_repo = CotacaoRepository()
