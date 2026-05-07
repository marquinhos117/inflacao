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
  
  // Estados do Simulador
  const [basket, setBasket] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Estados de Gerenciamento de Produtos
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ nome: '', categoria_id: 1, unidade: 'un', descricao: '' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct.id) {
        await api.put(`/produtos/${currentProduct.id}`, currentProduct);
      } else {
        await api.post('/produtos', currentProduct);
      }
      setIsEditing(false);
      setCurrentProduct({ nome: '', categoria_id: 1, unidade: 'un', descricao: '' });
      fetchProducts();
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Erro ao excluir produto", error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

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

  const toggleProductInBasket = (product) => {
    const exists = basket.find(item => item.produto_id === product.id);
    if (exists) {
      setBasket(basket.filter(item => item.produto_id !== product.id));
    } else {
      setBasket([...basket, { ...product, produto_id: product.id, quantidade: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    setBasket(basket.map(item => {
      if (item.produto_id === productId) {
        const newQty = Math.max(1, item.quantidade + delta);
        return { ...item, quantidade: newQty };
      }
      return item;
    }));
  };

  const handleSimulate = async () => {
    if (basket.length === 0) return;
    
    try {
      setIsSimulating(true);
      const payload = {
        itens: basket.map(item => ({
          produto_id: item.produto_id,
          quantidade: item.quantidade
        }))
      };
      const response = await api.post('/inflacao/simular-cesta', payload);
      setSimulationResult(response.data);
    } catch (error) {
      console.error("Erro na simulação", error);
      alert("Erro ao processar simulação");
    } finally {
      setIsSimulating(false);
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
          <div className="tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Gerenciamento de Catálogo</h3>
              {!isEditing && (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>+ Novo Produto</button>
              )}
            </div>

            {isEditing && (
              <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--primary)' }}>
                <h4>{currentProduct.id ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h4>
                <form onSubmit={handleSubmitProduct} style={{ marginTop: '1rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Nome</label>
                    <input
                      type="text"
                      required
                      value={currentProduct.nome}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, nome: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Categoria</label>
                    <select
                      value={currentProduct.categoria_id}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, categoria_id: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                    >
                      <option value={1}>Alimentação</option>
                      <option value={2}>Higiene</option>
                      <option value={3}>Limpeza</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Unidade</label>
                    <input
                      type="text"
                      required
                      value={currentProduct.unidade}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, unidade: e.target.value })}
                      placeholder="ex: kg, un, l"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Descrição</label>
                    <textarea
                      value={currentProduct.descricao || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, descricao: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', minHeight: '60px' }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn" onClick={() => { setIsEditing(false); setCurrentProduct({ nome: '', categoria_id: 1, unidade: 'un', descricao: '' }); }}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                  </div>
                </form>
              </div>
            )}

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Unidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td>{p.nome}</td>
                      <td>{p.categoria_id === 1 ? 'Alimentação' : p.categoria_id === 2 ? 'Higiene' : 'Limpeza'}</td>
                      <td>{p.unidade}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button onClick={() => handleEditProduct(p)} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Editar</button>
                          <button onClick={() => handleDeleteProduct(p.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cesta' && (
          <div className="tab-content">
            <div className="card">
              <h3>Simulador de Cesta de Consumo</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Selecione os itens abaixo e ajuste as quantidades para calcular a variação de preços da sua cesta personalizada.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {products.map(p => {
                  const isInBasket = basket.find(item => item.produto_id === p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProductInBasket(p)}
                      className={`card ${isInBasket ? 'active' : ''}`}
                      style={{
                        cursor: 'pointer',
                        border: isInBasket ? '2px solid var(--primary)' : '1px solid var(--border)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{p.nome}</strong>
                        {isInBasket && <ShoppingCart size={16} color="var(--primary)" />}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{p.unidade}</div>
                    </div>
                  );
                })}
              </div>

              {basket.length > 0 && (
                <div className="table-container" style={{ marginBottom: '2rem' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>
                    Itens Selecionados
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket.map(item => (
                        <tr key={item.produto_id}>
                          <td>{item.nome}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.produto_id, -1) }} className="btn" style={{ padding: '2px 8px' }}>-</button>
                              <span>{item.quantidade}</span>
                              <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.produto_id, 1) }} className="btn" style={{ padding: '2px 8px' }}>+</button>
                            </div>
                          </td>
                          <td>
                            <button onClick={(e) => { e.stopPropagation(); toggleProductInBasket(item) }} style={{ color: '#ef4444', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>Remover</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-primary"
                      onClick={handleSimulate}
                      disabled={isSimulating}
                    >
                      {isSimulating ? 'Calculando...' : 'Simular Inflação da Cesta'}
                    </button>
                  </div>
                </div>
              )}

              {simulationResult && (
                <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <TrendingUp size={24} color="var(--primary)" />
                    <div>
                      <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Resultado da Simulação</h4>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        {simulationResult.indice_geral}% <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-muted)' }}>(Variação Acumulada)</span>
                      </div>
                      <p>{simulationResult.descricao}</p>
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Itens</div>
                          <div style={{ fontWeight: 600 }}>{simulationResult.total_itens}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Variação Mensal</div>
                          <div style={{ fontWeight: 600, color: simulationResult.variacao_mensal > 0 ? '#ef4444' : '#22c55e' }}>
                            {simulationResult.variacao_mensal > 0 ? '+' : ''}{simulationResult.variacao_mensal}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
