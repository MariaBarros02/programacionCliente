import {Router} from 'express'
import { obtenerProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } from '../controllers/proveedor.controller.js'

const router = Router()

router.get('/proveedores', obtenerProveedores);
router.post('/proveedores', crearProveedor)
router.put('/proveedor/:id', actualizarProveedor)
router.delete('/proveedor/:id', eliminarProveedor)

export default router; 