import React, { useState } from 'react';
import '../sass/paginas/_soporte.scss';
import Cabecera from '../plantillas/Cabecera';
import Footer from '../plantillas/Footer';
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import { HiHome } from "react-icons/hi";
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Alerta from '../componentes/Alerta';


const Soporte = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState('');
  const [alerta, setAlerta] = useState({})


  useEffect(() => { mostrarMensajes() }, [])

  const mostrarMensajes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/soporte', { withCredentials: true });
      setMensajes(response.data);
    } catch (error) {
      setError(err.message);
    }
  }
  const eliminarMensaje = async (id) => {
    const confirmar = confirm('¿Desea eliminar este mensaje?')
    if (!confirmar) {
      return
    }
    try {
      const response = await axios.delete(`http://localhost:4000/api/soporte/${id}`, { withCredentials: true });

      mostrarMensajes();

      setAlerta({ msg: 'Se ha eliminado correctamente el mensaje', error: false });

      setTimeout(() => {
        setAlerta({})
      }, 5000);

    } catch (err) {
      setError(err.message);
    }
  };



  const buscarPorID = async () => {
    if (!busqueda.trim()) {
      setError('Escribe un ID');
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/soporte/${busqueda}`);

      if (!res.ok) {
        setMensajes([]); // Limpiar resultados si no se encuentra
        throw new Error('Mensaje no encontrado');
      }

      const data = await res.json();
      setMensajes([data]);
      setError('');
      setBusqueda('');
    } catch (err) {
      setError(err.message);
    }
  };

  const { msg } = alerta;
  return (
    <>
      <Cabecera />

      <div className="soporte-wrapper">
        <Breadcrumb className='mb-3' aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" icon={HiHome}>
            Inicio
          </BreadcrumbItem>
          <BreadcrumbItem href="/administracion">Administración</BreadcrumbItem>
          <BreadcrumbItem>Mensajes de soporte</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="soporte-titulo">Sección de soporte</h1>

        <input
          type="text"
          className="soporte-busqueda"
          placeholder="Escribe un ID para buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="soporte-botones">
          <button onClick={buscarPorID}>Buscar por ID</button>
          <button onClick={mostrarMensajes}>Buscar todos</button>
        </div>
        {msg && <Alerta alerta={alerta} />}

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table className="soporte-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Mensaje</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {mensajes.length > 0 ? (
              mensajes.map((msg, index) => (
                <tr key={msg._id} style={{ "--i": index }}>
                  <td>{msg._id}</td>
                  <td>{msg.nombre}</td>
                  <td>{msg.correo}</td>
                  <td>{msg.ciudad}</td>
                  <td>{msg.direccion}</td>
                  <td>{msg.mensaje}</td>
                  <td>
                    <button onClick={() => eliminarMensaje(msg._id)} className="btn-eliminar">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay resultados</td>
              </tr>
            )}
          </tbody>
        </table>




      </div>
      <Footer />
    </>

  );
};

export default Soporte;