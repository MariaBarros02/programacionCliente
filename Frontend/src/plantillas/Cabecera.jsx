import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { LuLogIn, LuLogOut, LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";

const Cabecera = () => {
    const { salir } = useAuth();
    const [token, setToken] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        setToken(Cookies.get('token'));
    }, [])

    const cerrarSesion = async() => {
        try {
            const res = await axios.post(`http://localhost:4000/api/salir`, {
                withCredentials: true,
            })
            Cookies.remove('token');
            navigate('/')
            window.location.reload();
        } catch (error) {
           console.log(error)
        }
    }

    return (
        <div className="cabecera-contenedor  ">
            <div>
                <p>Neiva, Huila | <a href="mailto:" target="_blank">fruverdelcampo@gmail.com</a></p>
            </div>
            <div className="cabecera-iconos ">

                <a href="https://www.instagram.com/" target="_blank"> <FaInstagram /></a>
                <a href="https://facebook.com/" target="_blank"><FaFacebook /></a>
                <a href="https://www.whatsapp.com/" target="_blank"><FaWhatsapp /></a>
                {token ?
                    <div className="flex">
                        <Link to="/administracion"><LuUser /></Link>
                        <button onClick={cerrarSesion} className="pointer"><LuLogOut className="text-xl" /></button>
                    </div>
                    : <Link to="/iniciarSesion"><LuLogIn /></Link>}
            </div>
        </div>
    )
}

export default Cabecera