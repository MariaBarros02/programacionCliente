import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Cabecera = () => {
    return (
        <div className="cabecera-contenedor">
            <div>
                <p>Neiva, Huila | <a href="mailto:" target="_blank">fruverdelcampo@gmail.com</a></p>
            </div>
            <div className="cabecera-iconos">
                <a href="https://www.instagram.com/" target="_blank"> <FaInstagram /></a>
                <a href="https://facebook.com/" target="_blank"><FaFacebook /></a>
                <a href="https://www.whatsapp.com/" target="_blank"><FaWhatsapp /></a>
            </div>
        </div>
    )
}

export default Cabecera