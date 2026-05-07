import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { LayoutDashboard, ShoppingCart, Package, Info, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1'
});

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ indice_geral: 0, total_itens: 0, descricao: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [prodRes, statsRes] = await Promise.all([
        api.get('/produtos'),
        api.get('/inflacao/indice-atual')
      ]);
      setProducts(prodRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Activity size={24} color="#3b82f6" />
          <span>Inflação Morrinhos</span>
        </div>
        <nav className="nav-links">
          <a onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a onClick={() => setActiveTab('produtos')} className={`nav-item ${activeTab === 'produtos' ? 'active' : ''}`}>
            <Package size={20} /> Produtos
          </a>
          <a onClick={() => setActiveTab('cesta')} className={`nav-item ${activeTab === 'cesta' ? 'active' : ''}`}>
            <ShoppingCart size={20} /> Simulador
          </a>
          <a onClick={() => setActiveTab('sobre')} className={`nav-item ${activeTab === 'sobre' ? 'active' : ''}`}>
            <Info size={20} /> Sobre o SMIM
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <p>Monitoramento em tempo real do município de Morrinhos-GO.</p>
        </header>

        {activeTab === 'dashboard' && (
          <div className="tab-content">
            <div className="stats-grid">
              <div className="card">
                <div className="card-title">Índice de Inflação (Mensal)</div>
                <div className="card-value">{stats.indice_geral}%</div>
                <div className={`card-trend ${stats.indice_geral > 0 ? 'trend-up' : 'trend-down'}`}>
                  {stats.indice_geral > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stats.indice_geral > 0 ? 'Alta' : 'Baixa'} em relação ao mês anterior</span>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Produtos Monitorados</div>
                <div className="card-value">{products.length}</div>
                <div className="card-trend">
                  <Activity size={16} />
                  <span>Atualizado hoje</span>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Cesta Básica Local</div>
                <div className="card-value">R$ 542,30</div>
                <div className="card-trend trend-up">
                  <TrendingUp size={16} />
                  <span>+1.2% este mês</span>
                </div>
              </div>
            </div>

            <div className="table-container">
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>
                Últimas Atualizações de Preços
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Último Preço</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map(p => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.categoria_id === 1 ? 'Alimentação' : p.categoria_id === 2 ? 'Higiene' : 'Limpeza'}</td>
                      <td>R$ {(10 + Math.random() * 20).toFixed(2)}</td>
                      <td><span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 600 }}>ESTÁVEL</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'produtos' && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Unidade</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{p.unidade}</td>
                    <td>{p.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'cesta' && (
           <div className="card">
             <h3>Simulador de Cesta de Consumo</h3>
             <p style={{marginBottom: '1rem'}}>Selecione os itens para calcular a inflação da sua cesta personalizada.</p>
             <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                {products.map(p => (
                  <div key={p.id} className="card" style={{width: '200px', cursor: 'pointer'}}>
                    <strong>{p.nome}</strong>
                    <div style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>Clique para adicionar</div>
                  </div>
                ))}
             </div>
             <button className="btn btn-primary" style={{marginTop: '2rem'}}>Calcular Variação</button>
           </div>
        )}

        {activeTab === 'sobre' && (
          <div className="card">
            <h3>Sobre o Projeto SMIM</h3>
            <p style={{marginTop: '1rem'}}>
              Este sistema foi desenvolvido como parte de um projeto de modernização tecnológica para a análise de dados econômicos locais.
            </p>
            <p style={{marginTop: '1rem'}}>
              <strong>Tecnologias:</strong> FastAPI (Backend), React (Frontend), Pydantic (Validação).
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
