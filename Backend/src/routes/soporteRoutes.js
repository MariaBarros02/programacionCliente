import { Router } from 'express';
import {
    createMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
  } from '../controllers/soporteController.js';

import { autRequerida } from '../middlewares/validarToken.js';
import { verifyAdmin } from '../middlewares/verifyRole.js';

const router = Router();

// Ruta pública (no necesita autenticación)
router.post('/', createMessage);
// Rutas protegidas
router.get('/',autRequerida,verifyAdmin, getAllMessages);
router.get('/:id',verifyAdmin, getMessageById);
router.delete('/:id', verifyAdmin, deleteMessage);

export default router;
