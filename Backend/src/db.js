import mongoose from "mongoose"

export const conectarDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost/fruverDelCampo");
        console.log("Base de datos conectada exitosamente")
    } catch (error) {
        console.log(error)
    }
}