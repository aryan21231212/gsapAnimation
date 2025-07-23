import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Noob from './Noob.jsx'
import Practice from './practice.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Practice></Practice>
  </StrictMode>,
)
