import Navegacion from "../plantillas/Navegacion"

//Texto y encabezado de cada hero
const textoHeros = [
  {
    titulo: 'Sabores Frescos y Autenticos',
    parrafo: 'Frutas, verduras y pulpas 100% puras al mejor precio'
  },
  {
    titulo: 'Disfruta de la frescura del campo',
    parrafo: 'Nuestras frutas y verduras seleccionadas con amor'
  },
  {
    titulo: 'El sabor auténtico de la naturaleza',
    parrafo: 'Directo a tu mesa: productos frescos y de calidad'
  },
  {
    titulo: '¡La frescura no tiene precio!',
    parrafo: 'Ven y descubre nuestras pulpas naturales, perfectas para cada ocasión'
  },
  {
    titulo: 'Frutas y verduras de la mejor calidad',
    parrafo: 'Precios irresistibles, lo agradecerán tu salud y tu bolsillo'
  }
]

const HeroPrincipal = () => {

  return (
    <div className='heroPrincipal-contenedor'>
      <Navegacion />
      {
        textoHeros.map((informacion, index) => {
          const { titulo, parrafo } = informacion;
          return (
            <div key={index} className='heroPrincipal-contenido'>
              <img src={`../imagenes/hero_${index + 1}.webp`} alt="hero" className="heroPrincipal-imagen"/>
              <div className="heroPrincipal-sombreado">
                <div>
                  <h2>{titulo}</h2>
                  <p>{parrafo}</p>
                </div>
              </div>
            </div>
          );
        })
      }
    </div >
  )
}

export default HeroPrincipal