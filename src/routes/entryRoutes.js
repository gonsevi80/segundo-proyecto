// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newEntryController,
  listEntriesController,
  getEntryController,
  canEditController,
  addEntryPhotoController,
  deleteEntryPhotoController,
  voteEntryController,
} from "../controllers/entries/index.js";

import {
  userExistsController,
  authUserController,
  authUserOptionalController,
  entryExistsController,
} from "../middleware/index.js";

// Crear una nueva entrada.
router.post(
  "/entries",
  authUserController,
  userExistsController,
  newEntryController
);

// Obtener el listado de entradas.
router.get("/entries", authUserOptionalController, listEntriesController);

// Obtener info de una entrada concreta.
router.get(
  "/entries/:entryId",
  authUserOptionalController,
  entryExistsController,
  getEntryController
);

// Agregar una foto a una entrada.
router.post(
  "/entries/:entryId/photos",
  authUserController,
  userExistsController,
  entryExistsController,
  canEditController,
  addEntryPhotoController
);

// Eliminar una foto de una entrada.
router.delete(
  "/entries/:entryId/photos/:photoId",
  authUserController,
  authUserOptionalController,
  userExistsController,
  entryExistsController,
  canEditController,
  deleteEntryPhotoController
);

// Votar una entrada.
router.post(
  "/entries/:entryId/votes",
  authUserController,
  userExistsController,
  entryExistsController,
  voteEntryController
);

// Editar una noticia
router.put(
  "/entries/:entryId",
  authUserController,
  authUserOptionalController,
  userExistsController,
  entryExistsController,
  canEditController,
  addEntryPhotoController
);

export default router;
