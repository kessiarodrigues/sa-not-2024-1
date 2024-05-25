import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import myfetch from '../lib/myfetch'
import './UserForm.css'
import getUserModel from '../models/User'
import { ZodError } from 'zod'

export default function UserForm() {
  const [state, setState] = React.useState({
    user: {},
    inputErrors: null,
    changePassword: false
  })
  const {
    user,
    inputErrors,
    changePassword
  } = state

  const editPasswordRef = React.useRef()

  const navigate = useNavigate()
  const params = useParams()

  React.useEffect(() => {
    if(params.id) fetchData()
  }, [])

  async function fetchData() {
    try {
      const result = await myfetch.get(`/users/${params.id}`)
      setState({ ...state, user: result })
    }
    catch(error) {
      alert('ERRO: ' + error.message)
    }
  }

  function handleFieldChange(e) {
    const userCopy = { ...user }
    userCopy[e.target.name] = e.target.value
    setState({ ...state, user: userCopy})
  }

  function handleEditPasswordToggle(e) {
    if(e.target.checked) editPasswordRef.current.style.display = 'block'
    else editPasswordRef.current.style.display = 'none'

    setState({ ...state, changePassword: e.target.checked })
  }

  function handleIsAdminClick(e) {
    const userCopy = { ...user }
    userCopy.is_admin = e.target.checked
    setState({ ...state, user: userCopy })
  }

  async function handleSubmit(event) {
    event.preventDefault()    // Impede o recarregamento da página
    try {
      // Invoca a validação do Zod por meio do model User
      const User = getUserModel(changePassword)
      User.parse(user)

      // Exclui o campo password2
      if('password2' in user) delete user.password2

      // Se a rota tiver o parâmetro id, significa que estamos editando
      // um usuário
      if(params.id) await myfetch.put(`/users/${params.id}`, user)

      // Senão, estaremos criando um novo usuário
      else await myfetch.post('/users', user)

      alert('Dados salvos com sucesso.')
    }
    catch(error) {
      console.error(error)

      // Verifica se há erros de validação do Zod
      if(error instanceof ZodError) {
        // Formamos um objeto contendo os erros do Zod e os colocamos
        // na variável de estado inputErrors
        const messages = {}
        for(let i of error.issues) messages[i.path[0]] = i.message
        setState({ ...state, inputErrors: messages })
        alert('Há campos com valores inválidos no formulário. Verifique.')
      }
      else alert(error.message)
    }
  }

  return (
    <>
      <h1>{ params.id ? `Editando usuário #${params.id}` : 'Novo usuário' }</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label>
            <span>Nome completo:</span>
            <input name="fullname" value={user.fullname} onChange={handleFieldChange} />
            <div className="input-error">
              { inputErrors?.fullname }
            </div>
          </label>
        </div>

        <div>
          <label>
            <span>Nome de usuário:</span>
            <input name="username" value={user.username} onChange={handleFieldChange} />
            <div className="input-error">
              { inputErrors?.username }
            </div>
          </label>
        </div>

        <div>
          <input type="checkbox" onClick={handleEditPasswordToggle} />
          &nbsp;<span>Alterar senha</span>
        </div>

        <div ref={editPasswordRef} className="edit-password">
          <label>
            <span>Digite a senha:</span>
            <input name="password" type="password" value={user.password} onChange={handleFieldChange} />
            <div className="input-error">
              { inputErrors?.password }
            </div>
          </label>
          
          <label>
            <span>Repita a senha:</span>
            <input name="password2" type="password" value={user.password2} onChange={handleFieldChange} />
            <div className="input-error">
              { inputErrors?.password2 }
            </div>
          </label>
        </div>

        <div>
          <input type="checkbox" checked={user.is_admin} onClick={handleIsAdminClick} />
          &nbsp;<span>Usuário é administrador</span>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>

      </form>
    </>
  )
}