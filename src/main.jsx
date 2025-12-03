import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/variables.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { SoundProvider } from './context/SoundContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SoundProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SoundProvider>
  </StrictMode>,
)
