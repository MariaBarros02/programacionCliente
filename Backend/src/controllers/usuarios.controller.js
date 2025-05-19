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
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

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
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Alternar entre 'admin' y 'user'
        usuario.rol = usuario.rol === 'admin' ? 'user' : 'admin';

        await usuario.save();

        res.json({
            message: `Rol actualizado a ${usuario.rol}`,
            nuevoRol: usuario.rol
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al cambiar el rol",
            error: error.message
        });
    }
}
