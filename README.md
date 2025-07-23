# CLAUCIA API

API para gerenciamento de dados da aplicação CLAUCIA para monitoramento de feridas e amostras médicas.

## Sobre o Projeto

Esta API foi desenvolvida para suportar o aplicativo móvel CLAUCIA, facilitando o gerenciamento de dados de pacientes, feridas, amostras médicas, profissionais de saúde e instituições. O sistema permite o acompanhamento de feridas e suas amostras, com autenticação segura para profissionais de saúde.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs eficientes e escaláveis em Node.js
- **TypeScript**: Linguagem de programação fortemente tipada
- **MySQL**: Sistema de gerenciamento de banco de dados relacional
- **TypeORM**: ORM para TypeScript e JavaScript
- **JWT**: Autenticação baseada em tokens
- **Swagger**: Documentação de API
- **Helmet**: Segurança HTTP
- **Compression**: Compressão de resposta HTTP

## Pré-requisitos

- Node.js (versão 16+)
- MySQL (versão 8+)
- npm ou yarn

## Configuração do Ambiente

1. Clone o repositório:

   ```
   git clone https://github.com/Eduardo-RFarias/CLAUCIA-api.git
   cd CLAUCIA-api
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```
   NODE_ENV=development
   PORT=3000
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USERNAME=claucia
   MYSQL_PASSWORD=claucia
   MYSQL_DATABASE=claucia
   JWT_SECRET=seu_jwt_secret
   THROTTLE_TTL=60
   THROTTLE_LIMIT=10
   ```

4. Configure o banco de dados:

   ```
   # Crie o banco de dados
   mysql -u root -p
   CREATE DATABASE claucia;
   CREATE USER 'claucia'@'localhost' IDENTIFIED BY 'claucia';
   GRANT ALL PRIVILEGES ON claucia.* TO 'claucia'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. Execute as migrações:
   ```
   npm run migration:run
   ```

## Executando a Aplicação

### Modo de Desenvolvimento

```
npm run start:dev
```

### Modo de Produção

```
npm run build
npm run start:prod
```

## Documentação da API

Após iniciar a aplicação, a documentação Swagger estará disponível em:

```
http://localhost:3000/docs
```

## Comandos Úteis

- Gerar uma nova migração: `npm run migration:generate -- src/migrations/NomeDaMigracao`
- Executar migrações: `npm run migration:run`
- Reverter última migração: `npm run migration:revert`
- Criar uma migração vazia: `npm run migration:create src/migrations/NomeDaMigracao`
- Formatar código: `npm run format`
- Lint: `npm run lint`

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
