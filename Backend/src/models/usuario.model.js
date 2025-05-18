import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    primerNombre: {
        type: String,
        required: true

    },

    segundoNombre: {
        type: String,

    },

    primerApellido: {
        type: String,
        required: true

    },

    segundoApellido: {
        type: String,

    },

    correo: {
        type: String,
        unique: true,
        required: true

    },

    celular: {
        type: String,
        required: true

    },

    contrasena: {
        type: String,
        required: true

    },

    rol: {
        type:String,
        default: "user"
    },
    token: {
        type: String,
        default: null

    },

    confirmado: {
        type: Boolean,
        default: false

    }

},{
    timestamps: true
})
export default mongoose.model('Usuario', usuarioSchema)
