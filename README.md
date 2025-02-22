# API NLW Connect - Node.js

![image](https://github.com/user-attachments/assets/ac651803-ee36-4249-a2d6-e6961b589025)


## Descrição

Este projeto foi desenvolvido durante o evento **NLW Connect - Node.js**, organizado pela Rocketseat. O objetivo é criar uma aplicação back-end utilizando **Node.js** com **TypeScript**, integrando bibliotecas como **Fastify**, **Drizzle ORM**, **PostgreSQL**, **Redis**, **Zod** e **Swagger**. A aplicação também está configurada para deploy, utilizando Docker para gerenciar os serviços de banco de dados e cache, além de ser documentada de forma interativa com Swagger.

## Funcionalidades

- **Cadastro de Inscrição**: Permite que o usuário se inscreva no evento, podendo ser por indicação de outro inscrito.
- **Convite por Indicação**: Os usuários podem convidar outros para se inscrever, gerando links de convite únicos.
- **Contabilização de Cliques**: Registra e gerencia a quantidade de cliques em links de convite.
- **Ranking**: Gera um ranking de participantes baseado nas inscrições por indicação e cliques.
- **Documentação Interativa com Swagger**: A API é documentada de forma interativa, permitindo testar rotas diretamente pelo navegador.
- **CORS Configurado**: A API está configurada para ser acessada por endereços Web externos.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Fastify** como micro-framework
- **PostgreSQL** para banco de dados
- **Redis** para cache e funcionalidades de ranking
- **Drizzle ORM** para interação com o banco de dados
- **Zod** para validação de dados
- **Swagger** para documentação interativa da API
- **Docker** para orquestração dos serviços

## Instruções para Execução Local

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js**: [Instalar Node.js](https://nodejs.org)
- **Docker**: [Instalar Docker](https://www.docker.com/get-started)
- **Git**: [Instalar Git](https://git-scm.com/)

### Passos para Executar

1. **Clonar o repositório**

   Clone este repositório para a sua máquina local:
  git clone https://github.com/devrafcks/Api-NLW-Connect.git
  cd Api-NLW-Connect


2. **Instalar Dependências**

Execute o comando abaixo para instalar as dependências do projeto:
npm install


3. **Configurar o Banco de Dados e Redis com Docker**

O projeto utiliza Docker para rodar o PostgreSQL e Redis. Execute o comando abaixo para iniciar os containers:
docker-compose up -d

4. **Configurar as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente (exemplo):

WEB_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=nlw_connect
REDIS_HOST=localhost
REDIS_PORT=6379

5. **Rodar o Projeto**

Após configurar as variáveis de ambiente, inicie o servidor com o comando:
npm run dev

6. **Acessar a API**

A API estará disponível em `http://localhost:3000`. Você pode acessar a documentação interativa do Swagger em `http://localhost:3000/documentation`.

## Rotas da API

A API possui as seguintes rotas principais:

- **POST /invites/:subscriberId**: Inscrição no evento por meio de um link de convite.
- **GET /invites/:subscriberId**: Consulta o ranking e dados de cliques de um convite.
- **GET /ranking**: Retorna a lista de participantes no ranking.
- **GET /ranking/:subscriberId**: Consulta a posição de um participante no ranking.

## Configuração de Swagger

A documentação da API está configurada utilizando Swagger. Acesse a documentação interativa através do seguinte endereço:
http://localhost:3000/documentation

## Deploy

Para realizar o deploy do projeto, o Docker está configurado para facilitar a execução em qualquer ambiente. Siga os passos abaixo para realizar o deploy:

1. **Gerar Build da Aplicação**

   Utilize o `tsup` para gerar o build da aplicação:
npm run build


2. **Subir o Contêiner Docker**

Utilize o `docker-compose` para rodar a aplicação no ambiente de produção:
docker-compose -f docker-compose.prod.yml up -d
