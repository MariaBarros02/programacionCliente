import { Link } from 'react-router-dom'


const CardCategoria = ({ nombre, index }) => {
  return (
    <div className="cardCategoria-contenido">
      <img src={`../imagenes/categoria_${index + 1}.webp`} alt={`imagen-${nombre}`} />
      <Link to={`/productos/${nombre}`} className='cardCategoria-link'></Link>
      <div >
        <p><Link className='CardCategoria-TextoLink' to={`/productos/${nombre}`}>{nombre}</Link></p>
      </div>
    </div>
  )
}

export default CardCategoria