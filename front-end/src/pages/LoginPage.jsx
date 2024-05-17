import React from 'react'
import myfetch from '../lib/myfetch'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()    // Evita o recarregamento da tela
    try {
      // Em aplicações de produção, aqui deveria ser mostrado
      // algum feedback de espera para o usuário
      //const result = await myfetch.post('/users/login', { username, password })
      await myfetch.post('/users/login', { username, password })

      // Armazena o token recebido no localStorage
      // ATENÇÃO: ABORDAGEM NÃO SEGURA, há outros meios
      // mais adequados de armazenar o token com segurança
      // window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, result.token)

      // Deu certo, vamos navegar para a página inicial
      navigate('/')
    }
    catch(error) {
      // Deu errado, permanecemos na página de login e 
      // informamos o usuário
      alert('Usuário ou senha inválidos.')
    }
  }

  return(
    <>
      <h1>Autentique-se</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>
            <span>Usuário:</span><br />
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            <span>Senha:</span><br />
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
          </label>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>

      </form>
    </>
  )
}