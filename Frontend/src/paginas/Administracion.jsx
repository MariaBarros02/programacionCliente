import React from 'react'
import Cabecera from '../plantillas/Cabecera'
import { FaUsersCog } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { RiTruckLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { Link } from 'react-router-dom';
import Footer from '../plantillas/Footer';
import { FaArrowCircleLeft } from "react-icons/fa";


// Mapeo de nombres a componentes de íconos
const iconos = {
  FaUsersCog,
  LuMessagesSquare,
  RiTruckLine,
  ImProfile,
};

const entradas = [
  {
    titulo: "Mi Perfil",
    descripcion: "Administra la información personal de tu cuenta. Desde aquí puedes editar tus datos, actualizar tu contraseña y personalizar tu experiencia en la plataforma.",
    link: "/miPerfil",
    icono: "ImProfile"
  },
  {
    titulo: "Usuarios",
    descripcion: "Supervisa y gestiona los roles de todos los usuarios registrados en la página web. Ideal para mantener un control organizado sobre los permisos y accesos dentro de tu empresa.",
    link: "/usuarios",
    icono: "FaUsersCog"
  },
  {
    titulo: "Soporte",
    descripcion: "Consulta el historial de mensajes enviados al equipo de soporte. Aquí puedes dar seguimiento a tus solicitudes, ver respuestas anteriores y mantener una comunicación directa con la empresa.",
    link: "/soporte",
    icono: "LuMessagesSquare"
  },
  {
    titulo: "Proveedores",
    descripcion: "Agrega y administra los proveedores de tu empresa. Esta sección te permite mantener un registro actualizado de tus socios comerciales y facilitar su integración en los procesos internos.",
    link: "/proveedores",
    icono: "RiTruckLine"
  }
];

const Administracion = () => {
  return (
    <>
      <Cabecera />
      <div className='fondoPersonalizado h-full'>
        <div className='fondoPersonalizado_contenido'> 
          <div className='w-10/12 md:w-8/12 m-auto flex flex-col items-center justify-center pb-10'>
            <Link className=' my-5' to="/"><FaArrowCircleLeft className="text-orange-500 text-5xl" /></Link>
            {entradas.map((entrada, index) => {
              const Icono = iconos[entrada.icono];
              return (
                <Link to={`/administracion${entrada.link}`} className='block bg-white shadow-2xl p-4 rounded-2xl border-3 border-white hover:border-lime-600 hover:scale-110 transition-transform duration-300 mb-8 flex items-center' key={index}>
                  <Icono className='text-lime-600 text-8xl mr-4 md:text-6xl' />
                  <div>
                    <h2 className='font-bold'>{entrada.titulo}</h2>
                    <p className='text-xs '>{entrada.descripcion}</p>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Administracion;
