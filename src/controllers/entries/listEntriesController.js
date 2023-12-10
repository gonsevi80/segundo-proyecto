// Importamos los modelos.
import selectAllEntriesModel from '../../models/entries/selectAllEntriesModel.js';

// Función controladora final que retorna el listado de entradas. Permite filtrar por palabra
// clave.
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos el query param.
        const { keyword } = req.query;

        // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
        // habrá momentos en los que no exista "req.user". Con la interrogación indicamos
        // a JavaScript que "user" puede ser undefined.
        const entries = await selectAllEntriesModel(keyword, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listEntriesController;