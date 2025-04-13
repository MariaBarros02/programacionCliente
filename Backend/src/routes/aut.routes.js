import { Router } from 'express';
import {registrar, confirmar, recuperarContrasena, cambiarContrasena, ingresar, salir, perfil } from '../controllers/aut.controller.js'
import { autRequerida, autPrevia, autNecesaria } from '../middlewares/validarToken.js'
import { validarSchema } from '../middlewares/validador.middleware.js';
import { registrarSchema, ingresarSchema, recuperarContraseñaSchema, cambiarContrasenaSchema } from '../schema/aut.schema.js';

const router = Router()

router.post('/registrar', validarSchema(registrarSchema), registrar);

router.get('/confirmar/:token', autPrevia, confirmar);

router.post('/recuperarContrasena/', validarSchema(recuperarContraseñaSchema), recuperarContrasena);

router.post('/cambiarContrasena/:token', autNecesaria, validarSchema(cambiarContrasenaSchema), cambiarContrasena);

router.post('/ingresar', validarSchema(ingresarSchema), ingresar);

router.post('/salir', salir);

router.get('/perfil', autRequerida, perfil);

export default router
