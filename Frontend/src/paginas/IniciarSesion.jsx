import React from 'react'
import Cabecera from '../plantillas/Cabecera'
import { BsArrowLeftCircle, BsTrash3 } from "react-icons/bs";
import { TextInput, Label, Checkbox, Button } from 'flowbite-react'
import { Link } from 'react-router-dom';


const IniciarSesion = () => {
    return (
        <>
            <Cabecera />
            <div className='fondoPersonalizado'>
                <div className=' flex justify-center'>
                    <div>
                        <Link to="/"><BsArrowLeftCircle className='text-black' /></Link>
                        <h1 className='text-6xl'>Iniciar sesión</h1>
                        <form className="flex max-w-md flex-col gap-4 bg-white p-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1">Correo electrónico</Label>
                                </div>
                                <TextInput id="email1" type="email" placeholder="name@gmail.com" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password1">Contraseña</Label>
                                </div>
                                <TextInput id="password1" type="password" required />
                            </div>
                            <div className="flex items-center gap-2">
                            </div>
                            <Button type="submit">Iniciar Sesión</Button>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default IniciarSesion