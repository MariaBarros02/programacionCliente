import { Router } from 'express';
import {
    createMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
  } from '../controllers/soporteController.js';

import { autRequerida } from '../middlewares/validarToken.js';

const router = Router();

// Ruta pública (no necesita autenticación)
router.post('/', createMessage);
// Rutas protegidas
router.get('/',autRequerida, getAllMessages);
router.get('/:id', getMessageById);
router.delete('/:id', deleteMessage);

export default router;
