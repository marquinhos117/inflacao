# Execução do Projeto

Instruções para rodar as aplicações simultaneamente.

## 1. Rodando o Backend (API)
A partir da pasta `backend/`:
```bash
uvicorn app.main:app --reload --port 8000
```
-   A API estará disponível em: `http://localhost:8000`
-   Documentação Swagger: `http://localhost:8000/docs`

## 2. Rodando o Frontend (Web)
A partir da pasta `frontend/`:
```bash
npm run dev
```
-   O dashboard estará disponível em: `http://localhost:5173` (ou porta padrão do Vite).

## 3. Orquestração (Opcional)
Para fins de demonstração, recomenda-se abrir dois terminais separados para monitorar os logs de ambos os serviços.
