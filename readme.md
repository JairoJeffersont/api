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

## Dependências Utilizadas

As dependências necessárias para a aplicação são as seguintes:

```
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "fs": "^0.0.1-security",
    "https": "^1.0.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.10.3",
    "sequelize": "^6.37.3"
}

```