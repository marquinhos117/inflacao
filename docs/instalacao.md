# Instalação do Sistema

Siga os passos abaixo para configurar o ambiente de desenvolvimento local.

## Pré-requisitos
-   **Python 3.9+**
-   **Node.js 18+**
-   **Gerenciador de pacotes (npm ou yarn)**

## 1. Backend
1.  Acesse a pasta do backend: `cd backend`
2.  Crie um ambiente virtual: `python -m venv venv`
3.  Ative o ambiente:
    -   Windows: `venv\Scripts\activate`
    -   Linux/Mac: `source venv/bin/activate`
4.  Instale as dependências: `pip install -r requirements.txt`
5.  Configure o `.env` (use o `.env.example` como base).

## 2. Frontend
1.  Acesse a pasta do frontend: `cd frontend`
2.  Instale as dependências: `npm install`
3.  Configure as variáveis de ambiente (URL da API).
