from app.repositories.base import produto_repo, cotacao_repo
from app.schemas.inflacao import ResultadoInflacao, CestaRequest
from datetime import date, timedelta

class InflacaoService:
    def calcular_indice_atual(self) -> ResultadoInflacao:
        # Lógica simplificada: média das variações dos produtos que tiveram cotação no último mês
        hoje = date(2026, 5, 7)
        mes_atual = hoje.month
        ano_atual = hoje.year
        
        cotacoes_atuais = [c for c in cotacao_repo.get_all() if c.data_coleta.month == mes_atual and c.data_coleta.year == ano_atual]
        
        variacoes = []
        for c_atual in cotacoes_atuais:
            # Busca cotação do mês anterior
            mes_ant = mes_atual - 1 if mes_atual > 1 else 12
            ano_ant = ano_atual if mes_atual > 1 else ano_atual - 1
            
            c_anterior = next((c for c in cotacao_repo.get_all() 
                              if c.produto_id == c_atual.produto_id 
                              and c.data_coleta.month == mes_ant 
                              and c.data_coleta.year == ano_ant), None)
            
            if c_anterior:
                var = ((c_atual.valor - c_anterior.valor) / c_anterior.valor) * 100
                variacoes.append(var)
        
        indice_medio = sum(variacoes) / len(variacoes) if variacoes else 0.0
        
        return ResultadoInflacao(
            indice_geral=round(indice_medio, 2),
            total_itens=len(cotacoes_atuais),
            variacao_mensal=round(indice_medio, 2),
            descricao=f"Índice baseado em {len(cotacoes_atuais)} produtos coletados em Morrinhos-GO."
        )

    def simular_cesta(self, cesta: CestaRequest) -> ResultadoInflacao:
        # Simulação baseada no custo total comparado ao mês anterior
        total_atual = 0.0
        total_anterior = 0.0
        
        for item in cesta.itens:
            cotacoes = cotacao_repo.get_by_produto(item.produto_id)
            if not cotacoes: continue
            
            # Pega as duas últimas cotações
            cotacoes_sorted = sorted(cotacoes, key=lambda x: x.data_coleta, reverse=True)
            c_atual = cotacoes_sorted[0]
            total_atual += c_atual.valor * item.quantidade
            
            if len(cotacoes_sorted) > 1:
                c_anterior = cotacoes_sorted[1]
                total_anterior += c_anterior.valor * item.quantidade
            else:
                total_anterior += c_atual.valor * item.quantidade # Se não tiver anterior, assume igual
                
        variacao = ((total_atual - total_anterior) / total_anterior * 100) if total_anterior > 0 else 0.0
        
        return ResultadoInflacao(
            indice_geral=round(variacao, 2),
            total_itens=len(cesta.itens),
            variacao_mensal=round(variacao, 2),
            descricao=f"Custo total da cesta: R$ {total_atual:.2f}. Variação de {variacao:.2f}%."
        )

inflacao_service = InflacaoService()
