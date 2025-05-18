import bcrypt from 'bcrypt'
import Usuario from '../models/usuario.model.js'
import { crearAccesoToken, crearConfirmacionToken } from '../libs/jwt.js'

export const registrar = async (req, res) => {
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, correo, celular, contrasena } = req.body
    try {
        const contrasenahash = await bcrypt.hash(contrasena, 10)

        const nuevoUsuario = new Usuario({
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            correo,
            celular,
            contrasena: contrasenahash
        })

        const token = await crearConfirmacionToken({ id: nuevoUsuario._id, tipo: "confirmacion" })

        nuevoUsuario.token = token;

        const usuarioGuardado = await nuevoUsuario.save()

        res.json({
            id: usuarioGuardado._id,
            nombres: usuarioGuardado.primerNombre + " " + usuarioGuardado.segundoNombre,
            apellidos: usuarioGuardado.primerApellido + " " + usuarioGuardado.segundoApellido,
            correo: usuarioGuardado.correo,
            celular: usuarioGuardado.celular,
            token: usuarioGuardado.token,
            confirmado: usuarioGuardado.confirmado,
            fechaCreacion: usuarioGuardado.createdAt,
            fechaActualizacion: usuarioGuardado.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params;
    try {
        const usuarioConfirmar = await Usuario.findOne({ token });
        if (!usuarioConfirmar) return res.status(400).json({ message: "Hubo error" })

        usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({
            id: usuarioConfirmar._id,
            nombres: usuarioConfirmar.primerNombre + " " + usuarioConfirmar.segundoNombre,
            apellidos: usuarioConfirmar.primerApellido + " " + usuarioConfirmar.segundoApellido,
            correo: usuarioConfirmar.correo,
            celular: usuarioConfirmar.celular,
            token: usuarioConfirmar.token,
            confirmado: usuarioConfirmar.confirmado,
            fechaCreacion: usuarioConfirmar.createdAt,
            fechaActualizacion: usuarioConfirmar.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const recuperarContrasena = async (req, res) => {
    const { correo } = req.body
    try {
        const usuarioExistente = await Usuario.findOne({ correo })
        if (!usuarioExistente) return res.status(400).json({ message: "Usuario no encontrado" })

        const token = await crearConfirmacionToken({ id: usuarioExistente._id, tipo: "recuperacion" })

        usuarioExistente.token = token;
        await usuarioExistente.save()

        res.json({
            id: usuarioExistente._id,
            nombres: usuarioExistente.primerNombre + " " + usuarioExistente.segundoNombre,
            apellidos: usuarioExistente.primerApellido + " " + usuarioExistente.segundoApellido,
            correo: usuarioExistente.correo,
            celular: usuarioExistente.celular,
            token: usuarioExistente.token,
            confirmado: usuarioExistente.confirmado,
            fechaCreacion: usuarioExistente.createdAt,
            fechaActualizacion: usuarioExistente.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const cambiarContrasena = async (req, res) => {
    const { token } = req.params;
    const { contrasena } = req.body;
    try {
        const usuarioExistente = await Usuario.findOne({ token });
        if (!usuarioExistente) return res.status(400).json({ message: "Hubo error" })

        const coincidencia = await bcrypt.compare(contrasena, usuarioExistente.contrasena)
        if (coincidencia) {
            return res.status(400).json({ message: "La contraseña nueva debe ser diferente a la actual" })
        }

        const contrasenahash = await bcrypt.hash(contrasena, 10)

        usuarioExistente.token = null
        usuarioExistente.contrasena = contrasenahash
        await usuarioExistente.save()

        res.json({
            id: usuarioExistente._id,
            nombres: usuarioExistente.primerNombre + " " + usuarioExistente.segundoNombre,
            apellidos: usuarioExistente.primerApellido + " " + usuarioExistente.segundoApellido,
            correo: usuarioExistente.correo,
            celular: usuarioExistente.celular,
            token: usuarioExistente.token,
            confirmado: usuarioExistente.confirmado,
            fechaCreacion: usuarioExistente.createdAt,
            fechaActualizacion: usuarioExistente.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const ingresar = async (req, res) => {
    const { correo, contrasena } = req.body
    try {
        const usuarioExistente = await Usuario.findOne({ correo })
        if (!usuarioExistente) return res.status(400).json({ message: "Usuario no encontrado" })

        // if (!usuarioExistente.confirmado) return res.status(400).json({ message: "Usuario sin confirmar" })

        const coincidencia = await bcrypt.compare(contrasena, usuarioExistente.contrasena)
        if (!coincidencia) {
            return res.status(400).json({ message: "Contraseña incorrecta" })
        }

        const token = await crearAccesoToken({ id: usuarioExistente._id })

        res.cookie("token", token)

        res.json({
            id: usuarioExistente._id,
            nombres: usuarioExistente.primerNombre + " " + usuarioExistente.segundoNombre,
            apellidos: usuarioExistente.primerApellido + " " + usuarioExistente.segundoApellido,
            correo: usuarioExistente.correo,
            celular: usuarioExistente.celular,
            rol: usuarioExistente.rol,
            fechaCreacion: usuarioExistente.createdAt,
            fechaActualizacion: usuarioExistente.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const salir = (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        expires: new Date(0),
    });
    return res.sendStatus(200)
}

export const perfil = async (req, res) => {
    const usuarioEncontrado = await Usuario.findById(req.user.id)

    if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario NO encontrado" });

    return res.json({
        id: usuarioEncontrado._id,
        nombres: usuarioEncontrado.primerNombre + " " + usuarioEncontrado.segundoNombre,
        apellidos: usuarioEncontrado.primerApellido + " " + usuarioEncontrado.segundoApellido,
        correo: usuarioEncontrado.correo,
        celular: usuarioEncontrado.celular,
        rol: usuarioEncontrado.rol,
        fechaCreacion: usuarioEncontrado.createdAt,
        fechaActualizacion: usuarioEncontrado.updatedAt
    });

}
