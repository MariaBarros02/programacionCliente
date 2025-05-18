import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Index from "./paginas/Index.jsx"
import Productos from "./paginas/Productos.jsx"
import Nosotros from "./paginas/Nosotros.jsx"
import Garantias from "./paginas/Garantias.jsx"
import RealizarPedido from "./paginas/RealizarPedido.jsx"
import Soporte from "./paginas/Soporte.jsx";
import IniciarSesion from "./paginas/IniciarSesion.jsx"
import Registrarse from "./paginas/Registrarse.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import Administracion from "./paginas/Administracion.jsx"
import PrivateRoute from "./componentes/PrivateRoute.jsx"
import Proveedores from "./paginas/Proveedores.jsx"



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/productos/:categoria" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/garantias" element={<Garantias />} />
          <Route path="/realizarPedido" element={<RealizarPedido />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/iniciarSesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          
          <Route path="/administracion" element={<PrivateRoute requiredRole="admin"/>}>
            <Route index element={<Administracion/>}/>
            <Route path="soporte" element={<Soporte/>} />
            <Route path="proveedores" element={<Proveedores/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>


  )
}

export default App
