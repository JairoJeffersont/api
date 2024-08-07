# API Gabinete Digital

## Clonar o Repositório Git

Para começar, clone este repositório Git executando o seguinte comando:

```
git clone https://github.com/JairoTSantos/api
```

## Instalar as Dependências

Após clonar o repositório, navegue até a pasta do projeto e instale as dependências utilizando o npm:

```
cd api
npm install
```

## Configurar as Variáveis de Ambiente

Antes de executar a aplicação, é necessário configurar as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
PORT=443
SSL_KEY_PATH=./certs/key.pem
SSL_CERT_PATH=./certs/cert.pem

DB_HOST=localhost
DB_NAME=db
DB_USER=user
DB_PASS=pass
DB_PORT=port


SECRET_KEY=ds9j0sd9jfds90jf9sdjf
TOKEN_TIME=24H

MASTER_USER=root
MASTER_EMAIL=admin@admin
MASTER_PASS=user
```
## Sincronizar as tabelas do banco
Inicie a aplicação com

```
npm start
```
e depois acesse /api/sync para criar as tabelas do banco

## Acessar a Documentação

Depois de configurar as variáveis de ambiente, você pode acessar a documentação da API navegando para:

```
/api-docs
```

Isso abrirá a documentação onde você pode explorar os endpoints disponíveis e fazer solicitações à API.
