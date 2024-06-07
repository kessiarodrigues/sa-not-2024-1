import React from 'react';
import AuthUserContext from '../contexts/AuthUserContext';
export default function AuthGuard({ userLevel = 0, children }) {
  /*
    userLevel:
    0 ~> qualquer usuário autenticado ou não
    1 ~> somente usuários autenticados
    2 ~> somente usuário administrador
  */
  //API3:2023 – Falha de autenticação a nível de propriedade.
  //Validações de acesso no front-end
  //podem ser quebradas
  //caso as rotas no back-end não validem acesso
  //o usuário pode facilmente ver informações que não deveria
  //para evitar esta vulnerabilidade, o back-end deve retornar um código de status
  //informando que o usuário não pode acessar o recurso
  //impedindo que dados sejam expostos

  const { authUser } = React.useContext(AuthUserContext);

  if (
    userLevel === 0 ||
    (userLevel === 1 && authUser) ||
    (userLevel === 2 && authUser?.is_admin)
  )
    return children;
  else
    return (
      <>
        <h1>Não autorizado</h1>
        <p>Você não tem permissão para acessar este recurso.</p>
      </>
    );
}
