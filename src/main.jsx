import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Screens from './Screens.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Screens initial="chatbot" />
  </StrictMode>,
)
