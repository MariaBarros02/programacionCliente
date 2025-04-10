import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser"
import { conectarDB } from './db.js';



const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
conectarDB();
app.listen(4000);
console.log("Servidor corriendo en el puerto 4000")