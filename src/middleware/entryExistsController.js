// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../db/getPool.js';

// Importamos los errores.
import { notFoundError } from '../services/errorService.js';

const entryExistsController = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Obtenemos el id de la entrada de los path params.
        const { entryId } = req.params;

        const [entries] = await pool.query(
            `SELECT id FROM entries WHERE id = ?`,
            [entryId]
        );

        // Lanzamos un error si la entrada no existe.
        if (entries.length < 1) {
            notFoundError('entrada');
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default entryExistsController;