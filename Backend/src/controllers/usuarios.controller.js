import Usuario from '../models/usuario.model.js'

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        };

        res.status(200).json({ message: "Usuario eliminado corrrectamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const cambiarRol = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuariod) return res.status(400).json({ message: "Usuario no encontrada" });

        usuario.rol = !propiedad.visibilidad;
        await propiedad.save();

        res.json({ visibilidad: propiedad.visibilidad });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
