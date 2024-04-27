import React from 'react'
import myfetch from '../lib/myfetch'
import './UserList.css'
import { Link } from 'react-router-dom'

export default function UserList() {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result = await myfetch.get('/users')
      setUsers(result)
    }
    catch(error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <>
      <h1>Listagem de usuários</h1>

      <table>
        <tr>
          <th>Cód.</th>
          <th>Nome completo</th>
          <th>Nome de usuário</th>
          <th>É admin?</th>
          <th>Editar</th>
        </tr>
        {
          users.map(u => (
            <tr>
              <td>{u.id}</td>
              <td>{u.fullname}</td>
              <td>{u.username}</td>
              <td>{u.is_admin ? 'Sim' : ''}</td>
              <td><Link to={`./${u.id}`}>[Editar]</Link></td>
            </tr>
          ))
        }
      </table>
    </>
  )
}