import React, { useState } from 'react';
import '../sass/paginas/_soporte.scss';

const Soporte = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState('');

  const buscarTodos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/soporte');

      if (!res.ok) {
        throw new Error('Error al obtener los mensajes');
      }

      const data = await res.json();
      setMensajes(data);
      setError('');
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

  return (
    <div className="soporte-wrapper">
      <h1 className="soporte-titulo">Sección de soporte</h1>

      <input
        type="text"
        className="soporte-busqueda"
        placeholder="Escribe un ID para buscar"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table className="soporte-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {mensajes.length > 0 ? (
            mensajes.map((msg) => (
              <tr key={msg._id}>
                <td>{msg._id}</td>
                <td>{msg.nombre}</td>
                <td>{msg.correo}</td>
                <td>{msg.ciudad}</td>
                <td>{msg.direccion}</td>
                <td>{msg.mensaje}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay resultados</td>
            </tr>
          )}
        </tbody>
      </table>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="soporte-botones">
        <button onClick={buscarPorID}>Buscar por ID</button>
        <button onClick={buscarTodos}>Buscar todos</button>
      </div>
    </div>
  );
};

export default Soporte;