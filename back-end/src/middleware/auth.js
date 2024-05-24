import jwt from 'jsonwebtoken'

export default function(req, res, next) {

  /*
    Algumas rotas, como /users/login, devem poder ser acessadas
    sem a necessidade de fornecimento de um token. Tais rotas
    são cadastradas no vetor bypassRoutes.
  */
  const bypassRoutes = [
    { url: '/users/login', method: 'POST' },
    { url: '/users', method: 'POST' }
  ]

  /*
    Verifica se a rota atual está cadastrada em bypassRoutes. Caso
    esteja, passa para o próximo middleware (next()) sem verificar
    o token.
  */
  for(let route of bypassRoutes) {
    if(route.url === req.url && route.method === req.method) {
      next()
      return
    }
  }

  /*
    Para todas as demais rotas, é necessário que o token tenha sido
    enviado no cabeçalho (header) 'authorization'.
  */
  const authHeader = req.headers['authorization']

  /*
    Se o cabeçalho 'authorization' não existir na requisição, retornamos
    HTTP 403: Forbidden
  */
  if(! authHeader) return res.status(403).end()

  /*
    O cabeçalho 'authorization' é enviado como uma string no formato
    "Bearer: XXXXX", onde "XXXXX" é o token. Portanto, para extrair o
    token, precisamos recortar a string no ponto onde há um espaço em
    branco e pegar somente a segunda parte
  */
  const [ , token] = authHeader.split(' ')

  // VERIFICAÇÃO E VALIDAÇÃO DO TOKEN
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {

    /* 
      Se há erro, significa que o token é inválido ou está expirado
      HTTP 403: Forbidden
    */
    if(error) return res.status(403).end()

    /*
      Se chegamos até aqui, o token está OK e temos as informações
      do usuário autenticado no parâmetro 'user'. Vamos guardá-lo
      dentro do 'req' para futura utilização
    */
    req.authUser = user

    // Continuamos para o próximo middleware
    next()

  })

}