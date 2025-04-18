import mongoose from 'mongoose';

const soporteSchema = new mongoose.Schema(
    {
  nombre: {
     type: String,
    required: true 
    },
  correo: { 
    type: String, 
    required: true 
    },
  direccion: { 
    type: String, 
    required: true 
    },
  ciudad: {
     type: String, 
    required: true 
    },
  telefono: { 
    type: String, 
    required: true 
    },
  mensaje: { 
    type: String, 
    required: true
    }
}, { timestamps: true });

const Soporte = mongoose.model('Soporte', soporteSchema);
export default Soporte;
