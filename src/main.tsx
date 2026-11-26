import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AdminApp from './admin/AdminApp'
import './index.css'

const root = document.getElementById('root')!
const isAdminRoute = window.location.pathname.replace(/\/+$/, '') === '/admin'

createRoot(root).render(
  <StrictMode>
    {isAdminRoute ? <AdminApp /> : <App />}
  </StrictMode>,
)
