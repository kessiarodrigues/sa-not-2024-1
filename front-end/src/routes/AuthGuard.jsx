import React from 'react'
import AuthUserContext from '../contexts/AuthUserContext'

export default function AuthGuard({ userLevel = 0, children}) {
  /*
    userLevel:
    0 ~> qualquer usuário autenticado ou não
    1 ~> somente usuários autenticados
    2 ~> somente usuário administrador
  */
  
  const { authUser } = React.useContext(AuthUserContext)

  if((userLevel === 0) || 
     (userLevel === 1 && authUser) ||
     (userLevel === 2 && authUser?.is_admin)
  ) return children
  
  else return (
    <>
      <h1>Não autorizado</h1>
      <p>Você não tem permissão para acessar este recurso.</p>
    </>
  )
}