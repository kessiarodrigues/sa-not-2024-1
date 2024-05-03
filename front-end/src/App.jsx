import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppRoutes from './routes/AppRoutes'
import AuthUserContext from './contexts/AuthUserContext'

function App() {
  const [authUser, setAuthUser] = React.useState(null)

  return (
    <>
      <BrowserRouter>
        <AuthUserContext.Provider value={{authUser, setAuthUser}}>
          <AppHeader />
          <hr />
          <AppRoutes />
        </AuthUserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
