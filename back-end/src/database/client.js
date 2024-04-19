import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  // Exibir todas as consultas SQL geradas no console
  log: [
    {
      emit: 'stdout',
      level: 'query'
    }
  ]
})

export default prisma