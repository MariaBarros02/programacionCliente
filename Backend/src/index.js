import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser"
import { conectarDB } from './db.js';
import autRoutes from './routes/aut.routes.js'
import proveedorRoutes from './routes/proveedor.routes.js'
import soporteRoutes from './routes/soporteRoutes.js'
import cors from 'cors';
import path from 'path'



import { fileURLToPath } from "url";

const __nombreArchivo = fileURLToPath(import.meta.url);
const __directorioArchivo = path.dirname(__nombreArchivo);
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__directorioArchivo, 'public/uploads')))
app.use('/api', autRoutes)
app.use('/api', proveedorRoutes)
app.use('/api/soporte', soporteRoutes)
conectarDB();
app.listen(4000);
console.log("Servidor corriendo en el puerto 4000")