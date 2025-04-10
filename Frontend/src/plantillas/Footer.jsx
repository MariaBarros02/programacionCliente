import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const yearActual = new Date().getFullYear(); //Obtener año actual

const Footer = () => {
    return (
        <footer className="footer-contenedor">
            <div className="footer-contenedorImagen">
                <img src="/imagenes/logo.png" alt="logo"></img>
                <div>
                    <a href="https://www.instagram.com/" target="_blank"> <FaInstagram color="white" /></a>
                    <a href="https://facebook.com/" target="_blank"><FaFacebook color="white" /></a>
                    <a href="https://www.whatsapp.com/" target="_blank"><FaWhatsapp color="white" /></a>
                </div>
            </div>
            <div>
                <h3>Encuentranos en: </h3>
                <p>fruverdelcampo@gmail.com</p>
                <p>(608) 87554566</p>
                <p>Carrera 16 #45 - 05 (Neiva, Huila)</p>
                <p>© Copyright {yearActual}</p>
            </div>
            <div>
                <h3>Horario de atención </h3>
                <p>Lunes a Viernes: 7:00 am a 8:00pm</p>
                <p>Sábado: 8:00 am a 7:00pm</p>
                <p>Domingo: 9:00 am a 6:00pm</p>
            </div>

        </footer>
    )
}

export default Footer