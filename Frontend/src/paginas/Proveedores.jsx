import React, { useState, useRef } from 'react'
import Cabecera from '../plantillas/Cabecera'
import Footer from "../plantillas/Footer"
import "../estilos.css"
import axios from 'axios'
import Alerta from '../componentes/Alerta'
import { Button, Checkbox, Label, TextInput, FileInput, HelperText } from "flowbite-react";
import { useEffect } from 'react'


const categorias = ["frutas", "verduras", "pulpas de fruta", "carnes", "huevos"]
const Proveedores = () => {
    const [vistaFormulario, setVistaFormulario] = useState(false);
    const [alerta, setAlerta] = useState({})
    const [dataForm, setDataForm] = useState({
        nombreEmpresa: '',
        departamento: "",
        ciudad: '',
        direccion: '',
        nombreAdministrador: '',
        correo: '',
        telefono: '',
        categorias: []
    });
    const fileInputRef = useRef(null);

    const [logoEmpresa, setLogoEmpresa] = useState('');
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        cargarProveedores();
        console.log(proveedores)
    }, [])

    const cargarProveedores = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/proveedores');
            setProveedores(response.data);
        } catch (error) {

        }
    }


    const handleChange = (e) => {

        const { id, value } = e.target;
        setDataForm(prev => ({
            ...prev,
            [id]: value
        }))
        console.log(dataForm)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogoEmpresa(file);
        console.log(logoEmpresa)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const hayCamposVacios = Object.values(dataForm).some(value => {
            if (typeof value === 'string') return value.trim() === '';
            if (Array.isArray(value)) return value.length === 0;
            return value === undefined || value === null;
        });

        if (!logoEmpresa) {
            setAlerta({ msg: "El logo es obligatorio", error: true });
            return;
        }

        if (hayCamposVacios) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('logoEmpresa', logoEmpresa);

            for (const key in dataForm) {
                if (Array.isArray(dataForm[key])) {
                    dataForm[key].forEach(item => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, dataForm[key]);
                }
            }

            const response = await axios.post('http://localhost:4000/api/proveedores', formData, { withCredentials: true });
            const resultado = response.data;
            console.log("Respuesta del servidor:", resultado);

            setAlerta({ msg: "Formulario enviado correctamente", error: false });

        } catch (error) {
            setAlerta({ msg: "Error al enviar el formulario", error: true });
            console.log(error)

        }

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        setDataForm({
            nombreEmpresa: '',
            logoEmpresa: '',
            departamento: "",
            ciudad: '',
            direccion: '',
            nombreAdministrador: '',
            correo: '',
            telefono: '',
            categorias: []
        })
        setLogoEmpresa("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        cargarProveedores();
    };

    const { msg } = alerta

    return (
        <>
            <Cabecera />
            <div className='grid md:grid-cols-2 '>
                <div className='fondoPersonalizado py-5 pb-10' >


                    <div className='text-center'>
                        <h2 className='font-bold text-3xl text-orange-500'>Formulario Proveedores</h2>
                        <p> <span className='font-bold'>Añade o actualiza</span> la información de tus proveedores</p>
                    </div>
                    <Button className="block w-8/12 m-auto uppercase md:hidden my-3" onClick={e => setVistaFormulario(!vistaFormulario)} color="green">{vistaFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}</Button>
                    <form className={`flex max-w-md bg-white p-4 rounded shadow-2xl flex-col gap-4 mt-5 m-auto ${vistaFormulario ? "flex" : "hidden"} md:flex`} onSubmit={handleSubmit}>
                        <div>
                            <div className=" block">
                                <Label htmlFor="nombreEmpresa">Nombre de la empresa</Label>
                            </div>
                            <TextInput id="nombreEmpresa" type="text" sizing="sm" required onChange={handleChange} value={dataForm.nombreEmpresa} />
                        </div>
                        <div>
                            <Label className=" block" htmlFor="logoEmpresa">
                                Logo de la empresa
                            </Label>
                            <FileInput sizing="sm" id="logoEmpresa" onChange={handleFileChange} ref={fileInputRef} />
                            <HelperText className="mt-1">SVG, PNG, JPG or WEBP.</HelperText>
                        </div>
                        <div className='flex gap-5'>
                            <div className='w-full'>
                                <div className=" block">
                                    <Label htmlFor="departamento">Departamento</Label>
                                </div>
                                <TextInput id="departamento" type="text" sizing="sm" required onChange={handleChange} value={dataForm.departamento} />
                            </div>
                            <div className='w-full'>
                                <div className=" block">
                                    <Label htmlFor="ciudad">Municipio</Label>
                                </div>
                                <TextInput id="ciudad" type="text" sizing="sm" required onChange={handleChange} value={dataForm.ciudad} />
                            </div>
                        </div>
                        <div>
                            <div className=" block">
                                <Label htmlFor="direccion">Dirección</Label>
                            </div>
                            <TextInput id="direccion" type="text" sizing="sm" required onChange={handleChange} value={dataForm.direccion} />
                        </div>
                        <div>
                            <div className=" block">
                                <Label htmlFor="nombreAdministrador">Nombre del Administrador</Label>
                            </div>
                            <TextInput id="nombreAdministrador" type="text" sizing="sm" required onChange={handleChange} value={dataForm.nombreAdministrador} />
                        </div>
                        <div>
                            <div className=" block">
                                <Label htmlFor="correo">Correo electrónico</Label>
                            </div>
                            <TextInput id="correo" type="email" placeholder='example@example.com' sizing="sm" required onChange={handleChange} value={dataForm.correo} />
                        </div>
                        <div>
                            <div className=" block">
                                <Label htmlFor="telefono">Télefono</Label>
                            </div>
                            <TextInput id="telefono" type="tel" placeholder='XXX-XXX-XXXX' sizing="sm" required onChange={handleChange} value={dataForm.telefono} />
                        </div>
                        <div className="flex max-w-md flex-col " id="checkbox">
                            <div className='mb-2'>
                                <Label htmlFor='' >Categorias</Label>
                            </div >
                            {categorias.map((categoria, index) => (
                                <div className="flex items-center gap-2 mb-1 " key={index}>
                                    <Checkbox
                                        id={categoria}
                                        checked={dataForm.categorias.includes(categoria)} // ✅ Controlado
                                        onChange={(e) => {
                                            const { checked } = e.target;
                                            setDataForm(prev => {
                                                const nuevasCategorias = checked
                                                    ? [...prev.categorias, categoria]
                                                    : prev.categorias.filter(c => c !== categoria);

                                                return {
                                                    ...prev,
                                                    categorias: nuevasCategorias
                                                };
                                            });
                                        }}
                                    />
                                    <Label htmlFor={categoria} className="flex text-xs capitalize">
                                        {categoria}
                                    </Label>
                                </div>
                            ))}


                        </div>

                        {msg && <Alerta alerta={alerta} />}


                        <Button type="submit" color="green" className='uppercase'>Crear Proveedor</Button>
                    </form>
                </div>
                <div className='py-5 bg-gray-50'>
                    <div className='text-center'>
                        <h2 className='font-bold text-3xl text-lime-700'>Listado de Proveedores</h2>
                        <p>Administra tus <span className='font-bold'>proveedores</span></p>
                    </div>

                    <div className='w-10/12 m-auto mt-5'>

                        {
                            proveedores.map((proveedor, index) => {
                                <div className='bg-white py-4 px-2 shadow-2xl rounded-2xl flex items-center text-sm'>

                                    <img className="h-36" src='/imagenes/proveedor1.webp' />
                                    <div className='w-full'>
                                        <div >
                                            <p className='font-bold'>Nombre: <span className='font-normal'></span></p>
                                            <p className='font-bold'>Dirección: <span className='font-normal'></span></p>
                                            <p>Departamento - municipio</p>
                                            <p className='font-bold'>Contacto: <span className='font-normal'></span></p>
                                            <p className='font-bold'>Categorias: <span className='font-normal'></span></p>
                                        </div>
                                        <div className='flex justify-between mt-3 w-11/12'>
                                            <Button size='xs'>Editar</Button>
                                            <Button color="red" size='xs'>Borrar</Button>
                                        </div>


                                    </div>
                                </div>
                            })}


                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Proveedores