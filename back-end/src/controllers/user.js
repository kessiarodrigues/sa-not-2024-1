import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  try {

    // Criptografando a senha
    req.body.password = await bcrypt.hash(req.body.password, 12)

    await prisma.user.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.user.findMany()
    // Retorna o resultado com HTTP 200: OK (implícito)

    // Exclui o campo "password" do resultado
    for(let user of result) {
      if(user.password) delete user.password
    }

    res.send(result)
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    })

    console.log({result})

    // Exclui o campo "password" do resultado
    if(result?.password) delete result.password

    // Resultado encontrado ~> HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Resultado não encontrado ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.update = async function(req, res) {
  try {

    // Se tiver sido passado o campo 'password' no body
    // da requisição, precisamos criptografá-lo antes de
    // enviar ao banco de dados
    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

    const result = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou ~> HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()
    // Não encontrou (e não excluiu) ~> vai para o catch
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.login = async function(req, res) {
  try {
    // Busca o usuário pelo username
    const user = await prisma.user.findUnique({
      where: { username: req.body.username.toLowerCase() }
    })

    // Se o usuário não for encontrado ~>
    // HTTP 401: Unauthorized
    if(! user) return res.status(401).end()

    // Usuário encontrado, vamos conferir a senha
    const passwordMatches = await bcrypt.compare(req.body.password, user.password)

    // Se a senha estiver incorreta ~>
    // HTTP 401: Unauthorized
    if(! passwordMatches) return res.status(401).end()

    // Se chegamos até aqui, username + password estão OK
    // Vamos criar o token e retorná-lo como resposta

    // O token inclui as informações do usuário. Vamos excluir o campo
    // da senha antes de prosseguir
    if(user.password) delete user.password

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,   // Senha de criptografia do token
      { expiresIn: '24h' }  // Prazo de validade do token
    )

    // Retorna o token com status HTTP 200: OK (implícito)
    res.send({token})

  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

export default controller