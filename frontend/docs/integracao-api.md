# Integração com a API

O frontend utiliza **Axios** para as requisições.

## Configuração
-   Base URL definida em `.env`.
-   Interceptors para tratamento de erros 401/500 globalmente.

## Exemplo de chamada
```javascript
const getProdutos = async () => {
  const response = await api.get('/produtos');
  return response.data;
}
```
