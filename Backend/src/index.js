import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser"
import { conectarDB } from './db.js';
import proveedorRoutes from './routes/proveedor.routes.js'


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', proveedorRoutes)
conectarDB();
app.listen(4000);
console.log("Servidor corriendo en el puerto 4000")