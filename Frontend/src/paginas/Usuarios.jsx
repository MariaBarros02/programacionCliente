import React from 'react';
import Cabecera from '../plantillas/Cabecera';
import Footer from '../plantillas/Footer';
import Cookies from 'js-cookie';
import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import { HiHome } from "react-icons/hi";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Alerta from '../componentes/Alerta';



const Usuarios = () => {
    const [perfil, setPerfil] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    // Cargar perfil del usuario actual
    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/perfil', { withCredentials: true });
                setPerfil(response.data);
                if (response.data.fechaCreacion) {
                    setFechaCreacion(response.data.fechaCreacion.substring(0, 10));
                }
            } catch (error) {
                console.log(error);
            }
        };
        cargarPerfil();
    }, []);

    // Cargar usuarios (solo cuando perfil._id esté disponible)
    useEffect(() => {
        if (perfil.id) {
            const cargarUsuarios = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/usuarios', { withCredentials: true });
                    setUsuarios(response.data.filter(usuario => usuario._id !== perfil.id));
                } catch (error) {
                    console.log(error);
                }
            };
            cargarUsuarios();
        }
    }, [perfil.id]);

    const eliminarUsuario = async (id) => {
        const confirmar = confirm('¿Desea eliminar a este usuario?')
        if(!confirmar){
            return
        }
        try {
            await axios.delete(`http://localhost:4000/api/usuario/${id}`, { withCredentials: true });
            setAlerta({ msg: "El usuario ha sido eliminado correctamente", error: false });
            setUsuarios(usuarios.filter(usuario => usuario._id !== id)); // Optimización: Filtro local
            setTimeout(() => setAlerta({}), 5000);
        } catch (error) {
            console.log(error);
        }
    };

    const cerrarSesion = async () => {

        try {
            await axios.post(`http://localhost:4000/api/salir`, {}, { withCredentials: true });
            Cookies.remove('token');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const cambiarRol = async (id) => {
        
        const confirmar = confirm('¿Desea cambiar el rol de este usuario?')
        if(!confirmar){
            return
        }
        try {
            const {data} = await axios.put(`http://localhost:4000/api/usuario/${id}`,{}, { withCredentials: true })
            const updatedUsuarios = usuarios.map(usuario =>
                usuario._id === id ? { ...usuario, rol: data.nuevoRol } : usuario
            );
            setUsuarios(updatedUsuarios);

            setAlerta({ msg: "El rol ha sido cambiado correctamente", error: false });
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const {msg} = alerta;

    return (
        <>
            <Cabecera />
            <div className='grid md:grid-cols-2 '>
                <div className='fondoPersonalizado py-5 pb-10' >
                    <Breadcrumb className='ml-5 mb-3' aria-label="Default breadcrumb example">
                        <BreadcrumbItem href="/" icon={HiHome}>Inicio</BreadcrumbItem>
                        <BreadcrumbItem href="/administracion">Administración</BreadcrumbItem>
                        <BreadcrumbItem>Usuarios</BreadcrumbItem>
                    </Breadcrumb>

                    <div className='text-center'>
                        <h2 className='font-bold text-3xl text-orange-500'>Mi Perfil</h2>
                        <p> Revisa tu <span className='font-bold'>informacion personal </span> </p>
                    </div>
                    <div className='bg-white p-4 rounded-2xl shadow-2xl w-10/12 m-auto mt-5'>
                        <p className='font-bold'>Nombres: <span className='font-normal'>{perfil.nombres}</span></p>
                        <p className='font-bold'>Apellidos: <span className='font-normal'>{perfil.apellidos}</span></p>
                        <p className='font-bold'>Correo: <span className='font-normal'>{perfil.correo}</span></p>
                        <p className='font-bold'>Celular: <span className='font-normal'>{perfil.celular}</span></p>
                        <p className='font-bold'>Rol: <span className='font-normal'>{perfil.rol === 'admin' ? "Administrador" : "Usuario"}</span></p>
                        <p className='font-bold'>Fecha de Creación: <span className='font-normal'>{fechaCreacion}</span></p>
                        <Button className='my-4 block' color="red" onClick={cerrarSesion}>Cerrar Sesión</Button>
                    </div>
                </div>
                <div className='py-5 bg-gray-50'>
                    <div className='text-center'>
                        <h2 className='font-bold text-3xl text-lime-700'>Listado de Usuarios</h2>
                        <p>Administra los usuarios de tu <span className='font-bold'>pagína</span></p>
                    </div>
                    <div className='w-11/12 m-auto mt-5'>
                        {usuarios.length === 0 ? (
                            <p className="text-center text-gray-500">No hay usuarios registrados.</p>
                        ) : (

                            <div className="overflow-x-auto">
                                {msg && <Alerta alerta={alerta}/>}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeadCell>Nombre Completo</TableHeadCell>
                                            <TableHeadCell>Contacto</TableHeadCell>
                                            <TableHeadCell>Rol</TableHeadCell>
                                            <TableHeadCell>
                                                <span className="sr-only">Cambiar</span>
                                            </TableHeadCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="divide-y">
                                        {usuarios.map((usuario, index) => (
                                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 " key={index}>
                                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {usuario.primerNombre} {usuario.segundoNombre}<br /> {usuario.primerApellido} {usuario.segundoApellido}
                                                </TableCell>
                                                <TableCell>{usuario.correo} <br /> {usuario.celular}</TableCell>
                                                <TableCell>{usuario.rol === 'admin' ? "Administrador" : "Usuario"}</TableCell>
                                                <TableCell>
                                                    <Button className='mb-2 w-full' onClick={() => cambiarRol(usuario._id)} >
                                                        Cambiar Rol
                                                    </Button>
                                                    <Button className='w-full' color="red" onClick={e => eliminarUsuario(usuario._id)}>
                                                        Eliminar Cuenta
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Usuarios;