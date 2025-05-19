import { Router } from 'express';
import { obtenerUsuarios, eliminarUsuario, cambiarRol } from '../controllers/usuarios.controller.js';
import { autRequerida } from '../middlewares/validarToken.js';
import { verifyAdmin } from '../middlewares/verifyRole.js';

const router = Router()

router.get('/usuarios', autRequerida, verifyAdmin, obtenerUsuarios);

router.delete('/usuario/:id', autRequerida, verifyAdmin, eliminarUsuario);

router.put('/usuario/:id', autRequerida, verifyAdmin, cambiarRol);

export default router
