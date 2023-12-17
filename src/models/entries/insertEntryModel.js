// Importamos las dependencias.
import { v4 as uuid } from 'uuid';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para agregar una nueva entrada.
const insertEntryModel = async (title, place, description, userId) => {
    const pool = await getPool();

    // Generamos el id de la entrada.
    const entryId = uuid();

    // Insertamos la entrada.
    await pool.query(
        `INSERT INTO entries(id, title, place, description, userId) VALUES(?, ?, ?, ?, ?)`,
        [entryId, title, place, description, userId]
    );

    console.log(entryId)
    // Retornamos el id de la entrada.
    return entryId;
};

export default insertEntryModel;