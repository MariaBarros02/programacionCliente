import {Router} from 'express'
import { obtenerProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } from '../controllers/proveedor.controller.js'
import {cargarUnArchivo} from "../middlewares/upload.middleware.js"
import { autRequerida } from '../middlewares/validarToken.js'
import { verifyAdmin } from '../middlewares/verifyRole.js'
const router = Router()

router.get('/proveedores', obtenerProveedores);
router.post('/proveedores', autRequerida , verifyAdmin, cargarUnArchivo, crearProveedor)
router.put('/proveedor/:id', autRequerida ,verifyAdmin, cargarUnArchivo, actualizarProveedor)
router.delete('/proveedor/:id',autRequerida ,verifyAdmin, eliminarProveedor)

export default router; 