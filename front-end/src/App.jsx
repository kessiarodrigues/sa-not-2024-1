import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <hr />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
