import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import "./estilos.css"
import './sass/estilos.scss'

import { CarritoProvider } from './context/CarritoContext.jsx'

createRoot(document.getElementById('root')).render(
  <CarritoProvider>
    <App />
  </CarritoProvider>
    
)
