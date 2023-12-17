// Importamos los modelos.
import selectEntryByIdModel from "../models/entries/selectEntryByIdModel.js";

// Importamos los errores.
import { unauthorizedUserError } from "../services/errorService.js";

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar
// una entrada.
const canEditController = async (req, res, next) => {
  try {
    // Obtenemos el id de la entrada en la cuál tendra lugar el cambio.
    const { entryId } = req.params;

    // Obtenemos los datos de la entrada.
    const entry = await selectEntryByIdModel(entryId);

    // Si no somos los propietarios lanzamos un error.
    if (entry.userId !== req.user.id) {
      unauthorizedUserError();
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export default canEditController;
