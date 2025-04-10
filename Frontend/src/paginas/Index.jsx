import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Cabecera from "../plantillas/Cabecera"
import HeroPrincipal from "../componentes/HeroPrincipal"
import CardCategoria from "../componentes/CardCategoria"
import Footer from "../plantillas/Footer"
import CardProducto from "../componentes/CardProducto";

//(Información estatica)

//Categorias del fruver
const categorias = ['Frutas', 'Verduras', 'Pulpas de fruta', 'Carnes', 'Huevos'];

//Caracteristicas del fruver 
const caracteristicas = [
  {
    titulo: 'Envíos gratis a tu domilicio',
    descripcion: 'Llevamos tu compra hasta la puerta de tu casa de lunes a domingo sin ningún costo',
  },
  {
    titulo: 'Productos frescos y de calidad',
    descripcion: 'Disponemos de productos de alta calidad, seleccionados directamente del campo a tus manos',
  },
  {
    titulo: 'Paga con cualquier metodo de pago',
    descripcion: 'Contraentrega, transferencia, billeteras virtuales y mucho más',
  },
];


const Index = () => {

  const [productosDes, setProductosDes] = useState([]);

  useEffect(() => {
    const obtenerProductosDes = async () => {
      const url = 'https://losprecios.co/tienda/detalles?ID=6&MunicipioID=1&ClaveAPI=nfJrn941ba90fn2x&Categor%C3%ADa=frutas%20y%20verduras&P%C3%A1gina=2'
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setProductosDes(resultado.Datos.Ítems.slice(0, 3));
    };
    obtenerProductosDes();
  }, []);

  return (
    <>

      <Cabecera />
      <HeroPrincipal />

      <div className="index-categoria_contenedor">
        <div>
          <h3>¡Aqui encontrarás todo lo que necesitas!</h3>
          <div className="index-categoria_contenido">
            {
              categorias.map((categoria, index) => (
                <CardCategoria
                  nombre={categoria}
                  index={index}
                  key={index}
                />
              ))
            }
          </div>
        </div>
      </div>

      <div className="index-caracteristicas">
        <div className="index-caracteristicas_contenedor">
          {
            caracteristicas.map((caracteristica, index) => {
              const { titulo, descripcion } = caracteristica;
              return (
                <div className="index-caracteristicas_contenido" key={index}>
                  <img src={`/imagenes/caracteristica_${index + 1}.webp`} />
                  <div>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>


      <div className="index-productosDestacados">
        <div>
          <h2>Productos destacados</h2>
          <div className="index-productosDes_contenedor">
            {
              productosDes.map((producto, index) => (
                <CardProducto
                  key={index}
                  producto={producto}
                />
              ))
            }
          </div>
        </div>
      </div>


      <div className="index-bannerContenedor">
        <div className="index-bannerContenedor_sombreado">
          <div>
            <p>Te invitamos a explorar todos los productos de nuestro fruver:<span> frutas frescas, verduras recién cosechadas, pulpas naturales y mucho más, listos para llegar a tu mesa</span></p>
            <Link className="index-bannerBtn" to="/productos/Frutas">Ir a comprar <BsArrowRight className="index-icono" /> </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>

  )
}

export default Index