import Proveedor from "../models/proveedor.model.js";

export const obtenerProveedores = async (req, res) => {
    const proveedores = await Proveedor.find();
    res.json(proveedores)
}

export const crearProveedor = async (req, res) => {
    const {logoEmpresa, nombreEmpresa, departamento, ciudad, direccion, nombreAdministrador, email, telefono, categorias} = req.body;

    const nuevoProveedor = new Proveedor({logoEmpresa, nombreEmpresa, departamento, ciudad, direccion, nombreAdministrador, email, telefono, categorias})
    const proveedorGuardado = await nuevoProveedor.save();
    res.json(proveedorGuardado);
}

export const actualizarProveedor = async (req, res) =>{
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })
    const proveedorGuardado = await proveedorActualizado.save();
    res.json(proveedorGuardado);
}

export const eliminarProveedor = async (req, res)=>{
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if(!proveedor) return res.status(404).json({menssage:"Proveedor no encontrado" })
    return res.sendStatus(204);
}