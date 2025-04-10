import Cabecera from "../plantillas/Cabecera"
import HeroPrincipal from "../componentes/HeroPrincipal"
import Footer from "../plantillas/Footer"
import CardProducto from "../componentes/CardProducto"
import { useState, useEffect } from "react"
import { Link, useNavigate , useParams } from "react-router-dom";

const categoriasInfo = [
  {
    nombre: "Frutas",
    url: "Categoría=frutas%20y%20verduras&Subcategoría=frutas",
    totalPaginas: 6
  },
  {
    nombre: "Verduras",
    url: "Categoría=frutas%20y%20verduras&Subcategoría=verduras",
    totalPaginas: 7
  },
  {
    nombre: "Pulpas de fruta",
    url: "Categoría=frutas%20y%20verduras&Subcategoría=pulpas%20de%20fruta",
    totalPaginas: 4
  },
  {
    nombre: "Carnes",
    url: "Categoría=carnes%20y%20pescados&Subcategoría=res",
    totalPaginas: 5
  },
  {
    nombre: "Huevos",
    url: "Categoría=despensa&Subcategoría=huevos",
    totalPaginas: 1
  }
]

const Productos = () => {
  const navigate = useNavigate();
  const {categoria: categoriaParams} = useParams();
  const [categoria, setCategoria] = useState(categoriaParams); 
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(categoriasInfo[0].totalPaginas);




  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    })
    const obtenerProductos = async () => {
      const categoriaSeleccionada = categoriasInfo.find(cat => cat.nombre === categoria);


      const url = `https://losprecios.co/tienda/detalles?ID=6&MunicipioID=1&ClaveAPI=nfJrn941ba90fn2x&${categoriaSeleccionada.url}&P%C3%A1gina=${paginaActual}`
      try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado.Datos.Ítems)
        setProductos(resultado.Datos.Ítems);
      } catch (error) {
        console.error('Error al obtener los productos', error);
      }
      navigate(`/productos/${categoriaSeleccionada.nombre}`);

    };
    obtenerProductos();
  }, [paginaActual, categoria]);


  const cambiarPagina = (numeroPagina, nuevaCategoria = categoria) => {
    setPaginaActual(numeroPagina);
    setCategoria(nuevaCategoria);
    const categoriaSeleccionada = categoriasInfo.find(cat => cat.nombre === nuevaCategoria);
    setTotalPaginas(categoriaSeleccionada.totalPaginas);
    
   
  }

  return (
    <>
      <Cabecera />
      <HeroPrincipal />
      <div className="productos-categoria_select">
        <p>Categorias: </p>
        <select onChange={(e) => cambiarPagina(1, e.target.value)}>
          {categoriasInfo.map((categoria) => (
            <option key={categoria.nombre} value={categoria.nombre}>
              {categoria.nombre}
            </option>
          ))
          }
        </select>
      </div>
      <div className="productos-contenedor">
        <div className="productos-categoria">
          <p>Categorias</p>
          {categoriasInfo.map((cat) => (
            <Link to="#"  key={cat.nombre}
             onClick={() => cambiarPagina(1, cat.nombre)}
             className={`productos-categoria_opcion ${categoria === cat.nombre ? 'activo' : ''}`}
            >
              {cat.nombre}
            </Link>
            ))
          }
        </div>
        <div className="productos-contenedor_distribucion">
          <div className="productos-productos_contenedor">
            {
              productos.map((producto, index) => (
                <CardProducto
                  key={index}
                  producto={producto}
                />
              ))
            }
          </div>
          <div className="productos-paginacion">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                onClick={() => cambiarPagina(i + 1)}
                className={paginaActual === i + 1 ? 'activo' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
        </div>


      </div>
      <Footer />
      

    </>
  )
}

export default Productos