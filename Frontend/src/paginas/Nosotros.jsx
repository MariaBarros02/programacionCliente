import { useState } from "react";
import Cabecera from "../plantillas/Cabecera"
import Navegacion from "../plantillas/Navegacion";
import HeroPrincipal from "../componentes/HeroPrincipal"
import Footer from "../plantillas/Footer"

const Nosotros = () => {
  const [formularioInfo, setFormularioInfo] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});

  const actualizarInformacion = (e) => {

    const { name, value } = e.target;
    console.log(e.target);
    setFormularioInfo({
      ...formularioInfo,
      [name]: value
    });
  };


  const validar = () => {
    const errores = {};

    // Validación para el campo Nombre
    if (!formularioInfo.nombre) {
      errores.nombre = 'Este campo es obligatorio';
    } else if (/\d/.test(formularioInfo.nombre)) {
      errores.nombre = 'Nombre inválido (no debe contener números)';
    }

    // Validación para el campo Correo
    if (!formularioInfo.correo) {
      errores.correo = 'Este campo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formularioInfo.correo)) {
      errores.correo = 'Correo inválido';
    }

    // Validación para el campo Dirección
    if (!formularioInfo.direccion) {
      errores.direccion = 'Este campo es obligatorio';
    }

    // Validación para el campo Ciudad
    if (!formularioInfo.ciudad) {
      errores.ciudad = 'Este campo es obligatorio';
    } else if (/\d/.test(formularioInfo.ciudad)) {
      errores.ciudad = 'Ciudad inválida (no debe contener números)';
    }

    // Validación para el campo Teléfono
    if (!formularioInfo.telefono) {
      errores.telefono = 'Este campo es obligatorio';
    } else if (!/^\d{10}$/.test(formularioInfo.telefono)) {
      errores.telefono = 'Teléfono inválido (debe ser de 10 dígitos)';
    }

    // Validación para el campo Mensaje
    if (!formularioInfo.mensaje) {
      errores.mensaje = 'Este campo es obligatorio';
    } else if (formularioInfo.mensaje.length > 1000) {
      errores.mensaje = 'El mensaje debe tener menos 1000 caracteres';
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };


  const enviarFormulario = (e) => {
    e.preventDefault();
    if (validar()) {
      console.log('Formulario enviado:', formularioInfo);
    }
  };
  return (
    <>
      <Cabecera />
      <Navegacion />
      <div className="nosotros-seccion">
        <div className="nosotros-seccion__contenedor">
          <div className="nosotros-seccion__contenido">
            <h2>¿Quienes somos?</h2>
            <p>
              Somos un equipo apasionado por la frescura, la calidad y la salud, y creemos firmemente que una buena alimentación debe ser accesible,
              cómoda y placentera para todos. Nos enfocamos en ofrecer una experiencia de compra innovadora
              y eficiente, pensada para satisfacer las necesidades de nuestros usuarios en un mundo cada vez más digitalizado y en constante cambio.
            </p>
          </div>
          <div></div>
        </div>

      </div>

      <section className="nosotros-MisionVision">
        <h2>Misión y Visión</h2>
        <div className="nosotros-tarjetas">
          <div className="nosotros-tarjeta mision">
            <p>
              Nuestra misión es transformar la manera en que las personas compran frutas y verduras al ofrecer una plataforma digital que priorice la frescura,
              calidad y conveniencia. Creemos en una experiencia de compra que sea fácil y accesible para todos, en la que el usuario pueda encontrar lo que
              necesita de manera rápida y eficiente, con un diseño atractivo y amigable. Trabajamos de la mano con productores locales y sostenibles para garantizar
              que nuestros productos sean de la mejor calidad posible, mientras apoyamos el desarrollo de la economía local. Nos esforzamos por innovar continuamente
              en nuestras herramientas tecnológicas para mejorar la experiencia del cliente, asegurando que cada compra sea cómoda, rápida y segura.
            </p>
          </div>
          <div className="nosotros-tarjeta vision">
            <p>
              Convertirnos en la plataforma digital de frutas y verduras de referencia en el mercado, brindando a nuestros usuarios una experiencia de compra ágil,
              dinámica y atractiva. Nos esforzamos por ofrecer siempre los productos más frescos y saludables. Queremos ser reconocidos por nuestro compromiso con la sostenibilidad, el servicio
              personalizado y la tecnología, promoviendo un estilo de vida saludable en cada rincón donde llegamos.
              Visualizamos un futuro en el que adquirir frutas y verduras frescas sea tan sencillo y satisfactorio como hacer clic, y en el que nuestra marca inspire
              confianza y cuidado en cada paso de la cadena de suministro.
            </p>
          </div>
        </div>
      </section>

      <section className="nosotros-proveedores">
        <div className="nosotros-proveedoresGrid">
          <div className="nosotros-texto">
            <p>Nuestros Proveedores</p>
          </div>
          {/*Cambiar los circulos por imagenes */}
          <div className="nosotros-proveedoresContenedor">
              <img className="circle" src="/imagenes/proveedor1.webp" alt=""/>
              <img className="circle" src="/imagenes/proveedor2.webp" alt=""/>
              <img className="circle" src="/imagenes/proveedor3.webp" alt=""/>
          </div>
        </div>
      </section>

      <div className="formulario">
        <div className="formulario-contenido">
          <form onSubmit={enviarFormulario} className="contact-form">
            <p>Si deseas contactarnos enviarnos tu mensaje llenando el formulario</p>
            <p className="formulario-leyenda">Te responderemos en cuanto veamos tu mensaje</p>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formularioInfo.nombre}
              onChange={actualizarInformacion}
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}

            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formularioInfo.correo}
              onChange={actualizarInformacion}
            />
            {errores.correo && <span className="error">{errores.correo}</span>}

            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formularioInfo.direccion}
              onChange={actualizarInformacion}
            />
            {errores.direccion && <span className="error">{errores.direccion}</span>}

            <label>Ciudad:</label>
            <input
              type="text"
              name="ciudad"
              value={formularioInfo.ciudad}
              onChange={actualizarInformacion}
            />
            {errores.ciudad && <span className="error">{errores.ciudad}</span>}

            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formularioInfo.telefono}
              onChange={actualizarInformacion}
            />
            {errores.telefono && <span className="error">{errores.telefono}</span>}

            <label>Mensaje:</label>
            <textarea
              name="mensaje"
              value={formularioInfo.mensaje}
              onChange={actualizarInformacion}
            />
            {errores.mensaje && <span className="error">{errores.mensaje}</span>}

            <button type="submit">Enviar</button>
          </form>

        </div>


      </div>
      <Footer />
    </>
  )
}

export default Nosotros