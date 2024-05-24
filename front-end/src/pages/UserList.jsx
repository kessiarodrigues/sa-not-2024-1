import React from 'react'
import myfetch from '../lib/myfetch'

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

      <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <tr style={{ border: '1px solid black' }}>
          <th>Cód.</th>
          <th>Nome completo</th>
          <th>Nome de usuário</th>
          <th>É admin?</th>
        </tr>
        {
          users.map(u => (
            <tr style={{ border: '1px solid black' }}>
              <td>{u.id}</td>
              <td>{u.fullname}</td>
              <td>{u.username}</td>
              <td>{u.is_admin ? 'Sim' : ''}</td>
            </tr>
          ))
        }
      </table>
    </>
  )
}