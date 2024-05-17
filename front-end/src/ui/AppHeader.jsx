import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthUserContext from '../contexts/AuthUserContext'
import myfetch from '../lib/myfetch'
import MenuItem from '../ui/MenuItem'

export default function AppHeader() {
  const { authUser, setAuthUser } = React.useContext(AuthUserContext)
  const navigate = useNavigate()
  const location = useLocation()

  // useEffect() que será executado toda vez que a rota do
  // front-end (location) for alterada perguntando ao 
  // back-end qual é o usuário autenticado e guardando 
  // essa informação em authUser
  React.useEffect(() => {
    (async function() {
      try {
        const result = await myfetch.get('/users/me')
        setAuthUser(result)
      }
      catch(error) {
        console.error(error)
        setAuthUser(null)
        // Redirecionar para a página de login
        // navigate('/login')
      }
    })()
  }, [location])

  async function handleLogoutClick() {
    if(confirm('Deseja realmente sair?')) {
      try {
        await myfetch.post('/users/logout')
        navigate('/login')
      }
      catch(error) {
        console.error(error)
        alert('ERRO DO SERVIDOR: ' + error.message)
      }
    }
  }

  function AuthControl() {
    if(authUser) return (
      <li style={{ marginLeft: '36px' }}>
        <span>{authUser.username}</span>&nbsp;
        (<a href="#" onClick={handleLogoutClick}>Sair</a>)
      </li>
    )
    else return (
      <li style={{ marginRight: '12px' }}>
        <Link to="/login">ENTRAR</Link>
      </li>
    )
  }

  return (
    <>
      <h1>Segurança no Desenvolvimento de Aplicações</h1>
      <hr />
      <ol style={{ listStyleType: 'none', display: 'flex' }}>
        <MenuItem dest="/">Página inicial</MenuItem>
        <MenuItem userLevel={2} dest="/users">Usuários</MenuItem>
        <MenuItem userLevel={1} dest="/brute-force">Força bruta</MenuItem>
        <AuthControl key="#" />
      </ol>
    </>
  )
}