import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema(
    {
        logoEmpresa: {
            type: String,
            required: true
        },
        nombreEmpresa:{
            type:String,
            required:true,
            unique: true,
        },
        departamento: {
            type: String,
            required: true,
        },
        ciudad: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        nombreAdministrador: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
            required: true,
        },
        categorias: {
            type:[String],
            required: true
        }

    },
    {
    timestamps:true,
    }
)

export default mongoose.model("Proveedor", proveedorSchema);