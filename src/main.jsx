import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const syncAppViewportHeight = () => {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  const viewportHeight = isStandalone
    ? Math.max(window.innerHeight, window.screen.height)
    : Math.round(window.visualViewport?.height ?? window.innerHeight)

  document.documentElement.style.setProperty(
    '--app-height',
    `${viewportHeight}px`,
  )
}

syncAppViewportHeight()
window.requestAnimationFrame(syncAppViewportHeight)
window.addEventListener('pageshow', syncAppViewportHeight)
window.addEventListener('resize', syncAppViewportHeight)
window.addEventListener('orientationchange', syncAppViewportHeight)
window.visualViewport?.addEventListener('resize', syncAppViewportHeight)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
