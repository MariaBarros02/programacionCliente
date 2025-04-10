import Cabecera from "../plantillas/Cabecera"
import Footer from "../plantillas/Footer"
import { formatearDinero } from "../funciones";
import { BsArrowLeftCircle, BsTrash3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"


const RealizarPedido = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocal);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((acumulador, producto) => acumulador + producto.Subtotal, 0);
  };

  const [datosFormulario, setDatosFormulario] = useState({
    cedula: "",
    nombreCompleto: "",
    direccion: "",
    celular: "",
    correoElectronico: "",
    datosAdicionales: "",
    notas: "",
  });

  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!datosFormulario.cedula || datosFormulario.cedula.length < 5) {
      nuevosErrores.cedula = "La cedula o NIT debe tener al menos 5 digitos.";
    }

    if (!datosFormulario.nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = "Por favor, ingresa tu nombre completo.";
    }

    if (!datosFormulario.direccion.trim()) {
      nuevosErrores.direccion = "Por favor, ingresa una direccion válida.";
    }

    if (!datosFormulario.celular || datosFormulario.celular.length < 7 || datosFormulario.celular.length > 10) {
      nuevosErrores.celular = "El número de celular debe tener entre 7 y 10 dígitos.";
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datosFormulario.correoElectronico || !correoRegex.test(datosFormulario.correoElectronico)) {
      nuevosErrores.correoElectronico = "Por favor, ingresa un correo electronico válido.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;

  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      console.log("Formulario válido. Enviar datos: ", datosFormulario)
    }
  }

  return (
    <>
      <Cabecera />
      <div className="realizarPedido">
        <div className="realizarPedido-contenedor">
          <div className="realizarPedido-contenedor1">
            <div className="realizarPedido-contenedor_titulo">
              <Link onClick={() => navigate(-1)}><BsArrowLeftCircle className="realizarPedido-contenedor_titulo_iconoVolver" /></Link>
              <h2>Detalles de compra</h2>
            </div>
            <form className="realizarPedido-contenedor_formulario" onSubmit={manejarEnvio}>
              <div>
                <label>Cedula o Nit sin digito de verificacion</label>
                <input type="number" name="cedula" value={datosFormulario.cedula} onChange={manejarCambio} />
                {errores.cedula && <p className="error">{errores.cedula}</p>}
              </div>
              <div>
                <label>Nombres y Apellidos completos</label>
                <input name="nombreCompleto" value={datosFormulario.nombreCompleto} onChange={manejarCambio} />
                {errores.nombreCompleto && <p className="error">{errores.nombreCompleto}</p>}
              </div>
              <div>
                <label>Direccion</label>
                <input
                  name="direccion"
                  placeholder="Direccion con nomenclatura completa (casa o unidad, bloque y # apto, barrio-localidad)"
                  value={datosFormulario.direccion}
                  onChange={manejarCambio}
                />
                {errores.direccion && <p className="error">{errores.direccion}</p>}
              </div>
              <div>
                <label>No. Celular</label>
                <input type="number" name="celular" value={datosFormulario.celular} onChange={manejarCambio} />
                {errores.celular && <p className="error">{errores.celular}</p>}
              </div>
              <div>
                <label>Direccion de correo electronico</label>
                <input name="correoElectronico" value={datosFormulario.correoElectronico} onChange={manejarCambio} />
                {errores.correoElectronico && <p className="error">{errores.correoElectronico}</p>}
              </div>
              <div>
                <label>Datos adicionales de tu direccion (opcional)</label>
                <input
                  name="datosAdicionales"
                  placeholder="Habitacion, referencias, etc. (Opcional)"
                  value={datosFormulario.datosAdicionales}
                  onChange={manejarCambio}
                />
              </div>
              <div>
                <label>Notas del pedido (opcional)</label>
                <textarea
                  name="notas"
                  placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega"
                  value={datosFormulario.notas}
                  onChange={manejarCambio}
                />
              </div>
              <button type="submit">Realizar compra</button>

            </form>

          </div>

          
            <div className="realizarPedido-carritoContenedor">
              <h2 className="realizarPedido-carritoTitulo">Resumen de tu pedido</h2>
              <div className="realizarPedido-carritoContenido">

                <table>
                  <tbody className="realizarPedido-carritoTbody">
                    <tr className="navegacion-carritoEncabezado">
                      <td className="primera-colCarrito" colSpan="2">Producto</td>
                      <td className="cantidad">Cantidad</td>
                      <td className="subtotal">Subtotal</td>
                    </tr>

                    {carrito.length > 0 ? (
                      carrito.map((producto, index) => {
                        const { Producto, Complemento, Unidad, Tamaño, Precio, Cantidad } = producto;
                        return (
                          <tr className="navegacion-carritoProducto" key={Producto + Tamaño}>
                            <td><img src={`/imagenes/productos/${Producto}${Complemento ? ` ${Complemento}` : ``}.webp`} /></td>
                            <td>
                              <p>{Producto} x {Tamaño}{Unidad}</p>
                              <p>{formatearDinero(Precio, 'COP')}</p>
                            </td>
                            <td className="realizarPedido-cantidad">
                              {Cantidad}
                            </td>
                            <td className="subtotal">{formatearDinero((Precio * Cantidad), 'COP')}</td>

                          </tr>
                        );
                      })
                    ) : null
                    }
                  </tbody>
                </table>


              </div>
              {carrito.length > 0 && (
                <>
                  <div className="realizarPedido-carritoTotal">
                    <p className="totalLabel">Total A Pagar:</p>
                    <p>{formatearDinero(calcularTotal(), 'COP')}</p>
                  </div>

                </>
              )}
            </div>

          </div>




        </div>
   



      <Footer />

    </>
  )
}

export default RealizarPedido