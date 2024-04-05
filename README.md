# Projeto back-end

## Comando de criação do projeto
npx @aka-demy/create-express-app

Perguntas que o comando faz:
* Ok to proceed? y
* Give a name for the app: back-end
* Choose a language: JavaScript
* Choose a template engine: None
* Choose a package manager: npm

# Comandos para execução do projeto
cd back-end
npm run dev

# Comandos de instalação e configuração do Prisma
npm install prisma --save-dev
npx prisma init

# Comando para executar uma migration
npx prisma migrate dev --name nome-da-migration

# Comando para exibir/editar os dados do BD
npx prisma studio