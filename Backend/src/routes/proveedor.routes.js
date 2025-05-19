import {Router} from 'express'
import { obtenerProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } from '../controllers/proveedor.controller.js'
import {cargarUnArchivo} from "../middlewares/upload.middleware.js"
import { autRequerida } from '../middlewares/validarToken.js'
const router = Router()

router.get('/proveedores', obtenerProveedores);
router.post('/proveedores', autRequerida , cargarUnArchivo, crearProveedor)
router.put('/proveedor/:id', autRequerida , cargarUnArchivo, actualizarProveedor)
router.delete('/proveedor/:id',autRequerida , eliminarProveedor)

export default router; 