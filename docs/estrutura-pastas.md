# Estrutura de Pastas

O projeto está organizado seguindo as melhores práticas de mercado para aplicações Fullstack.

```text
sistema-profissional/
├── backend/                # API FastAPI
│   ├── app/                # Código fonte principal
│   │   ├── main.py         # Inicialização do app
│   │   ├── core/           # Configurações globais, segurança
│   │   ├── routes/         # Endpoints da API
│   │   ├── services/       # Lógica de negócio
│   │   ├── models/         # Entidades de domínio
│   │   ├── schemas/        # DTOs (Pydantic)
│   │   ├── repositories/   # Acesso a dados
│   │   ├── mock/           # Dados iniciais de teste
│   │   └── utils/          # Helpers e utilitários
│   ├── docs/               # Documentação técnica do backend
│   └── requirements.txt    # Dependências Python
│
├── frontend/               # SPA React
│   ├── src/                # Código fonte principal
│   │   ├── components/     # UI Reutilizável
│   │   ├── pages/          # Telas do sistema
│   │   ├── services/       # Chamadas à API
│   │   ├── assets/         # Imagens e estilos globais
│   │   └── hooks/          # Hooks customizados
│   ├── docs/               # Documentação do frontend
│   └── package.json        # Dependências Node.js
│
└── docs/                   # Documentação Geral (Visão de Negócio)
```
