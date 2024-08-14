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

Antes de executar a aplicação, é necessário configurar as variáveis de ambiente. Modifique o arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=443
(caminho para o certificado digital)
SSL_KEY_PATH=./certs/key.pem 
SSL_CERT_PATH=./certs/cert.pem

(dados do banco de dados Mysql)
DB_HOST=localhost
DB_NAME=db
DB_USER=user
DB_PASS=pass
DB_PORT=port

(chave secreta para token JWT)
SECRET_KEY=ds9j0sd9jfds90jf9sdjf
(tempo de duração do token JWT)
TOKEN_TIME=24H

(usuario root do sistema)
MASTER_USER=root
MASTER_EMAIL=admin@admin
MASTER_PASS=user
```
## Sincronizar as tabelas do banco
Inicie a aplicação com

```
npm start
```
e depois acesse ```/api/sync``` para criar as tabelas do banco

## Acessar a Documentação

Você pode acessar a documentação da API em ```/api-docs```