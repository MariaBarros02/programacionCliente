import { Router } from 'express';
import { obtenerUsuarios, eliminarUsuario, cambiarRol } from '../controllers/usuarios.controller';
import { autRequerida } from '../middlewares/validarToken';
import { verifyAdmin } from '../middlewares/verifyRole';

const router = Router()

router.get('/usuarios', autRequerida, verifyAdmin, obtenerUsuarios);

router.delete('/usuario/:id', autRequerida, verifyAdmin, eliminarUsuario);

router.put('/usuario/:id', autRequerida, verifyAdmin, cambiarRol);

export default router
