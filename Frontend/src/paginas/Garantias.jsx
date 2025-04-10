import Cabecera from "../plantillas/Cabecera"
import HeroPrincipal from "../componentes/HeroPrincipal"
import Footer from "../plantillas/Footer"
import { BsEnvelopePaper, BsClipboard2Pulse, BsCartCheck } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const preguntasFrecuentes = [
  {
    pregunta: "¿Qué hago si recibo un producto que no es de la calidad que esperaba?",
    respuesta: "Entendemos que la calidad es fundamental en cada compra. Si el producto que recibiste no está fresco o no cumple con nuestros estándares de calidad, por favor envíanos una foto y una breve descripción del problema. Nuestro equipo de atención al cliente revisará el caso y procederemos a realizar un reemplazo o, si lo prefieres, un reembolso completo."
  },
  {
    pregunta: "¿Puedo devolver un producto si no estoy satisfecho con su sabor o frescura?",
    respuesta: "¡Por supuesto! Nos esforzamos para que cada producto sea de calidad y tenga el sabor esperado. Si sientes que no cumple con tus expectativas de frescura o sabor, contáctanos dentro de las primeras 24 horas de recibido el pedido para poder asistirte. Estaremos encantados de reemplazarlo o gestionar un reembolso."
  },
  {
    pregunta: "¿Cómo puedo asegurarme de recibir los productos más frescos?",
    respuesta: "Nuestra logística está diseñada para minimizar el tiempo desde la cosecha hasta la entrega. Además, cada producto es inspeccionado antes de salir a reparto. Sin embargo, si sientes que alguno de los productos que recibiste no está en óptimas condiciones, estamos aquí para resolverlo. Solo contáctanos para que podamos ofrecerte una solución."
  },
  {
    pregunta: "¿Qué productos están cubiertos por la garantía de frescura?",
    respuesta: "Nuestra garantía cubre todos los productos frescos, como frutas, verduras y hierbas. Si alguno de estos productos llega en mal estado o no cumple con los estándares de frescura, te ofrecemos reemplazo o reembolso. Los productos procesados, como jugos o conservas, también están cubiertos en caso de defectos de calidad o sabor."
  },
  {
    pregunta: "¿Hay algún costo adicional por solicitar una garantía?",
    respuesta: "No, no hay costos adicionales por hacer válida una garantía. Si necesitas un reemplazo o reembolso debido a un problema de calidad, nosotros cubriremos todos los costos asociados al proceso."
  }
]

const Garantias = () => {

  const [mostrarAcordeon, setMostrarAcordeon] = useState(null);
  const cambiarEstadoAcordeon = (index) => {
    setMostrarAcordeon(mostrarAcordeon === index ? null : index);
  };



  return (
    <>
      <Cabecera />
      <HeroPrincipal />
      <div className="garantias-contenedor">
        <div className="garantias-contenedor_contenidoTexto">
          <h2>Garantías de cambio y calidad</h2>
          <p>En Fruver del campo, tu satisfacción es nuestra priorida y estamos
            comprometidos a garantizar tu completa satisfacción en cada compra.
            Si por alguna razón no estás satisfecho con un producto, Cuentas con
            24 horas a partir de la fecha de recibido tú pedido para realizar el
            reclamo teniendo en cuenta los siguientes pasos:
          </p>
        </div>
        <div className="garantias-contenedor_contenidoPasos">
          <div className="garantias-contenedor_pasos verde">
            <IoChatbubblesOutline className="garantias-contenedor_icono" />
            <h2>Paso 1</h2>
            <p>Escríbenos a nuestro email o número de atención al cliente,
              o contáctanos a través de nuestras redes sociales.</p>
          </div>
          <div className="garantias-contenedor_pasos">
            <BsEnvelopePaper className="garantias-contenedor_icono" />
            <h2>Paso 2</h2>
            <p>Incluye una breve descripción del problema y una foto del
              producto, en caso de que sea necesario.</p>
          </div>
          <div className="garantias-contenedor_pasos verde">
            <BsClipboard2Pulse className="garantias-contenedor_icono" />
            <h2>Paso 3</h2>
            <p>Se revisará tu caso y nos pondremos en contacto contigo para
              hacer efectivo tu reclamo.
            </p>
          </div>
          <div className="garantias-contenedor_pasos">
            <BsCartCheck className="garantias-contenedor_icono" />
            <h2>Paso 4</h2>
            <p>El producto por el cual se genero la inconformidad sera
              reembolsado o enviado nuevamente segun lo acordado con el cliente.</p>
          </div>
        </div>
      </div>
      <div className="garantias-preguntasFrecuentes">
        <h2>Preguntas Frecuentes</h2>
        <div className="garantias-preguntasFrecuentes_contenedor">
          {preguntasFrecuentes.map((preg, index) => {
            const { pregunta, respuesta } = preg
            const acordeonAbierto = mostrarAcordeon === index;
            return (
              <div key={index} className={`acordeon ${acordeonAbierto ? 'abierto' : ''}`}>
                <div className="acordeon-pregunta" onClick={() => cambiarEstadoAcordeon(index)}>
                <p>{pregunta}</p>
                <span className="acordeon-icono">{acordeonAbierto ? <IoIosArrowUp/> : <IoIosArrowDown/>}</span>
                </div>
                {acordeonAbierto && <div className="acordeon-contenido">{respuesta}</div>}
              </div>
            )
          })
        }
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Garantias