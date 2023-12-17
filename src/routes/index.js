// Importamos las dependencias.
import express from 'express';

// Importamos las rutas de los usuarios y demás rutas
import userRoutes from './userRoutes.js';
import entryRoutes from './entryRoutes.js';

// Creamos un router.
const router = express.Router();

// Indicamos a express dónde están las rutas de los usuarios y otras
router.use(userRoutes);
router.use(entryRoutes);


export default router;
