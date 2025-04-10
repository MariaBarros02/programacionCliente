import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState } from "react"
import Index from "./paginas/Index.jsx" 
import Productos from "./paginas/Productos.jsx"
import Nosotros from "./paginas/Nosotros.jsx"
import Garantias from "./paginas/Garantias.jsx"
import RealizarPedido from "./paginas/RealizarPedido.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index/>}/>
        <Route path="/productos/:categoria" element={<Productos/>}/>
        <Route path="/nosotros" element={<Nosotros/>}/>
        <Route path="/garantias" element={<Garantias/>}/>
        <Route path="/realizarPedido" element={<RealizarPedido/>}/>
            
        
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
