import React, { useEffect, useState } from 'react'
import Cabecera from '../plantillas/Cabecera'
import Footer from "../plantillas/Footer"
import { BsArrowLeftCircle, BsTrash3 } from "react-icons/bs";
import { TextInput, Label, Checkbox, Button } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../componentes/Alerta';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const Registrarse = () => {
  const [dataForm, setDataForm] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    celular: "",
    correo: "",
    contrasena: "",
    repetirContrasena: "",
  })

  const [alerta, setAlerta] = useState({})

  const { registrar, errors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDataForm(prev => ({
      ...prev,
      [id]: value
    }));
    console.log(dataForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const camposObligatorios = {
      primerNombre: "Primer nombre",
      primerApellido: "Primer apellido",
      celular: "Celular",
      correo: "Correo electrónico",
      contrasena: "Contraseña",
      repetirContrasena: "Repetir contraseña",
    };

    // Filtra los campos vacíos y crea un mensaje personalizado
    const camposFaltantes = Object.entries(camposObligatorios)
      .filter(([key]) => dataForm[key].trim() === "")
      .map(([_, label]) => label);

    if (camposFaltantes.length > 0) {
      setAlerta({
        msg: `Los siguientes campos son obligatorios: ${camposFaltantes.join(', ')}`,
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(dataForm.correo)) {
      setAlerta({ msg: "El correo electrónico ingresado no es válido", error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return;
    }
    const celularRegex = /^\d+$/;
    if (!celularRegex.test(dataForm.celular)) {
      setAlerta({ msg: "El número de celular ingresado no es válido", error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return;
    }

    if (!(dataForm.contrasena === dataForm.repetirContrasena)) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return;
    }

    try {
      const res = await axios.post(`http://localhost:4000/api/registrar`, dataForm, {
        withCredentials: true,
      })
      setAlerta({ msg: "Usuario creado correctamente. Redirigiendo.....", error: false })
      setTimeout(() => {
        setAlerta({})
        navigate('/iniciarSesion')
      }, 3000);
      setDataForm({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        celular: "",
        correo: "",
        contrasena: "",
        repetirContrasena: "",
      });
    } catch (error) {
      console.log(error)
      setAlerta({ msg: "Error al crear usuario, intente en otro momento", error: true })
      setDataForm({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        celular: "",
        correo: "",
        contrasena: "",
        repetirContrasena: "",
      });
    }

  }

  const { msg } = alerta;
  return (
    <>
      <Cabecera />
      <div className='fondoPersonalizado '>
        <div className=' flex justify-center items-center '>
          <div className='pt-10 pb-20'>
            <div className='flex items-center my-5'>
              <Link to="/"><BsArrowLeftCircle className='text-lime-600  text-3xl mr-4' /></Link>
              <h1 className='text-5xl font-bold '>Crear Cuenta</h1>
            </div>

            <form className="max-w-md mx-auto bg-white py-10 px-5 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="primerNombre"
                    id="primerNombre"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleChange}
                    value={dataForm.primerNombre}
                  />
                  <label
                    htmlFor="primerNombre"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Primer Nombre
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="segundoNombre"
                    id="segundoNombre"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    value={dataForm.segundoNombre}
                  />
                  <label
                    htmlFor="segundoNombre"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Segundo Nombre
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="primerApellido"
                    id="primerApellido"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleChange}
                    value={dataForm.primerApellido}
                  />
                  <label
                    htmlFor="primerApellido"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Primer Apellido
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="segundoApellido"
                    id="segundoApellido"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    value={dataForm.segundoApellido}
                  />
                  <label
                    htmlFor="segundoApellido"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Segundo Apellido
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  name="celular"
                  id="celular"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={dataForm.celular}
                />
                <label
                  htmlFor="celular"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Celular (xxx-xxx-xxxx)
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="correo"
                  id="correo"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={dataForm.correo}

                />
                <label
                  htmlFor="correo"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Correo Electrónico
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="contrasena"
                  id="contrasena"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={dataForm.contrasena}

                />
                <label
                  htmlFor="contrasena"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="repetirContrasena"
                  id="repetirContrasena"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  value={dataForm.repetirContrasena  }
                />
                <label
                  htmlFor="repetirContrasena"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>
              </div>

              {msg && <Alerta alerta={alerta} />}
              <button
                type="submit"
                className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-3 "
              >
                Registrarse
              </button>

            </form>

          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}

export default Registrarse