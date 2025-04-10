import { useEffect, useState, useContext } from "react";
import { formatearDinero } from "../funciones";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const CardProducto = ({ producto, index}) => {
  const { ID, Producto, Complemento, Marca, Tamaño, Unidad, ÍtemsTiendas} = producto;
  const [mostrarModal, setMostrarModal] = useState(false);
  const [valor, setValor] = useState(1);
  const [alerta, setAlerta] = useState(null);

  const { agregarProducto, carrito } = useContext(CarritoContext);
  


  // modal control
  useEffect(() => {
    if (mostrarModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [mostrarModal]);


  const agregarAlCarrito = () => {
    const nuevoProducto = {
      ID,
      Producto,
      Complemento,
      Marca,
      Tamaño,
      Unidad,
      Precio: ÍtemsTiendas[0].Precio,
      Cantidad: valor,
      Subtotal: valor * ÍtemsTiendas[0].Precio,
    };

    agregarProducto(nuevoProducto); // Llama a la función del contexto
    cerrarModal();
    setValor(1);
    setAlerta({ mensaje: "El producto ha sido agregado al carrito correctamente", tipo: "success" });

    // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      setAlerta(null);
    }, 3000);
  };





  // Funciones del modal y de control de cantidad
  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const incrementar = () => setValor(prev => prev + 1);
  const decrementar = () => { if (valor > 0) setValor(prev => prev - 1); };
  
  const manejarCambio = (e) => {
    const nuevoValor = parseInt(e.target.value, 10);
    if (!isNaN(nuevoValor) && nuevoValor > 0) setValor(valor + nuevoValor);
  };

  return (
    <>

      {alerta && (
        <div className={`alerta ${alerta.tipo}`}>
          {alerta.mensaje}
        </div>
      )}
      <div className="cardProducto_contenedor" data-id={ID}>
        <img src={`../imagenes/productos/${Producto}${Complemento ? ` ${Complemento}` : ``}.webp`} alt={`imagen_${Producto}`} />
        <div>
          <p>{Producto} {Complemento}  x {Tamaño}{Unidad}</p>
          <p className="cardProducto-marca">{Marca}</p>
          <p>{formatearDinero(ÍtemsTiendas[0].Precio, 'COP')}</p>
        </div>
        <Link to="#" onClick={abrirModal} className="cardProducto-btnAnadirCarrito">Añadir al carrito</Link>
      </div>

      {mostrarModal && (
        <div className="cardProducto-modal">
          <div className="cardProducto-modal_contenido">
            <div className="cardProducto-modal_cerrar"><button onClick={cerrarModal}>x</button></div>
            <div className="cardProducto-modal_informacion">
              <img src={`../imagenes/productos/${Producto}${Complemento ? ` ${Complemento}` : ``}.webp`} alt={`imagen_${Producto}`} />
              <div>
                <p className="cardProducto-modal_id">ID: {ID}</p>
                <p className="cardProducto-modal_nombre">{Producto} {Complemento}  x {Tamaño}{Unidad}</p>
                <p className="cardProducto-modal_marca">Marca: {Marca}</p>
                <p className="cardProducto-modal_precio">{formatearDinero(ÍtemsTiendas[0].Precio, 'COP')}</p>
                <div className="cardProducto-modal_contenedorBtn">
                  <div className="inputNumerico">
                    <button onClick={decrementar}>-</button>
                    <input type="text" value={valor} onChange={manejarCambio} />
                    <button onClick={incrementar}>+</button>
                  </div>
                  <button onClick={agregarAlCarrito} className="cardProducto-modal_anadirCarrito">Añadir al carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default CardProducto