// Importamos las dependencias.
import { v4 as uuid } from 'uuid';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, entryId) => {
    const pool = await getPool();

    // Generamos el id de la foto.
    const photoId = uuid();

    // Insertamos la foto.
    await pool.query(
        `INSERT INTO entryPhotos(id, name, entryId) VALUES(?, ?, ?)`,
        [photoId, photoName, entryId]
    );

    return photoId;
};

export default insertPhotoModel;