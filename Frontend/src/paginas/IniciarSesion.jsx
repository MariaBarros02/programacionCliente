import React, { useEffect, useState } from 'react'
import Cabecera from '../plantillas/Cabecera'
import Footer from "../plantillas/Footer"
import { BsArrowLeftCircle, BsTrash3 } from "react-icons/bs";
import { TextInput, Label, Checkbox, Button } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../componentes/Alerta';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const IniciarSesion = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    const {iniciarSesion, isAuthenticated} = useAuth();

  


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            setTimeout(() => {
                setAlerta({})
            }, 5000);

            return;
        }

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(email)) {
            setAlerta({ msg: "El correo electrónico ingresado no es válido", error: true })
            setTimeout(() => {
                setAlerta({})
            }, 5000);
            return;
        }



        try {
            const res = await axios.post(`http://localhost:4000/api/ingresar`, {correo: email, contrasena: password}, {
                withCredentials: true,
            })
            setAlerta({ msg: "Ingreso exitoso, Redirigiendo.....", error: false })
            iniciarSesion(res.data);
            setTimeout(() => {
                setAlerta({})
                navigate('/')
            }, 3000);
        } catch (error) {
            console.log(error)
             setAlerta({ msg: "El correo o contraseña ingresada no coinciden. Intente nuevamente", error: true})
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
                            <h1 className='text-5xl font-bold '>Iniciar sesión</h1>
                        </div>

                        <form className="flex max-w-md flex-col gap-4 bg-white p-4 shadow-2xl rounded-xl" onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1">Correo electrónico</Label>
                                </div>
                                <TextInput id="email1" type="email" placeholder="name@gmail.com" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password1">Contraseña</Label>
                                </div>
                                <TextInput id="password1" type="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            {msg && <Alerta alerta={alerta} />}

                            <Link to="/registrarse" className='text-xs underline mr-10'><p className='hover:underline'>¿Aún no tienes cuenta? Registrate</p></Link>

                            <Button type="submit" color="green" className='bg-lime-600 '>Iniciar Sesión</Button>

                        </form>

                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default IniciarSesion