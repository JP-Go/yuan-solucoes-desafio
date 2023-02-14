# Guarda-rotas

Aplicação que guarda suas rotas de trânsito favoritas


# Rodando a aplicação em modo `dev`

## Requisitos

São requisitos para rodar essa aplicação:

- Uma chave da API de mapas do Google
  [https://developers.google.com/maps/documentation/places/web-service](https://developers.google.com/maps/documentation/places/web-service)
- `node>=18.13.0` [https://nodejs.org/en/](https://nodejs.org/en/) 

**Nota:** Esses requisitos podem mudar com o tempo. Caso encontre algum erro ao
tentar rodar a aplicação [crie uma issue](https://github.com/JP-Go/yuan-solucoes-desafio/issues/new) 


## Passos
Primeiro clone esse repositório para sua máquina

Depois execute os seguintes passos em um terminal

1. cd até o diretório
1. Execute `npm (yarn|pnpm) install` para instalar as dependências
1. adicione um arquivo `.env` com as seguintes variáveis:
  ```
  VITE_GEOCODING_API_BASE_URL=https://maps.googleapis.com/maps/api/geocode/json
  VITE_GOOGLE_API_KEY=<google-maps-api-key>
  ```
4. execute `npm (yarn|pnpm) run dev` para executar a aplicação
4. abra o navegador no endereço `http://localhost:5173`
