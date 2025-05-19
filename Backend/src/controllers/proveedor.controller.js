import Proveedor from "../models/proveedor.model.js";
import fs from 'fs'
import { fileURLToPath } from "url";
import path from "path";

const __nombreArchivo = fileURLToPath(import.meta.url);
const __directorioArchivo = path.dirname(__nombreArchivo);

export const obtenerProveedores = async (req, res) => {
    try {

        const proveedores = await Proveedor.find();
        res.json(proveedores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const crearProveedor = async (req, res) => {
    const { nombreEmpresa, departamento, ciudad, direccion, nombreAdministrador, correo, telefono, categorias } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "Debe subir una imagen" });
        }

        const logoEmpresa = `/uploads/${req.file.filename}`;
        console.log(logoEmpresa)
        const nuevoProveedor = new Proveedor({ logoEmpresa, nombreEmpresa, departamento, ciudad, direccion, nombreAdministrador, correo, telefono, categorias })
        const proveedorGuardado = await nuevoProveedor.save();
        res.json(proveedorGuardado);
    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            })
        }
        res.status(500).json({ message: error.message })
    }

}

export const actualizarProveedor = async (req, res) => {

    try {
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        console.log(req.body)
        const proveedorGuardado = await proveedorActualizado.save();
        res.json(proveedorGuardado);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const eliminarProveedor = async (req, res) => {

    try {
        
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedor) return res.status(404).json({ menssage: "Proveedor no encontrado" })

        if (proveedor.logoEmpresa) {

            const imagePath = path.join(__directorioArchivo, '../public', proveedor.logoEmpresa);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

        }
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}