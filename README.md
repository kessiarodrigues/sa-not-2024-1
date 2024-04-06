# Projeto back-end

## Comando de criação do projeto
npx @aka-demy/create-express-app

Perguntas que o comando faz:
* Ok to proceed? y
* Give a name for the app: back-end
* Choose a language: JavaScript
* Choose a template engine: None
* Choose a package manager: npm

## Comandos para execução do projeto
cd back-end
npm run dev

## Comandos de instalação e configuração do Prisma
npm install prisma --save-dev
npx prisma init

## Comando para executar uma migration
npx prisma migrate dev --name nome-da-migration

## Comando para exibir/editar os dados do BD
npx prisma studio

# Projeto front-end

## Comando para criação do projeto
npm create vite@latest

Perguntas feitas pelo comando:
* OK to proceed? y
* Project name: front-end
* Select a framework: React
* Select a variant: JavaScript

# Instalação de dependências e inicialização do projeto
cd front-end
npm install
npm run dev

# Instalação da biblioteca de roteamento
npm install react-router-dom