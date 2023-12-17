// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para obtener el listado de entradas.
const selectAllEntriesModel = async (keyword = '', userId = '') => {
    const pool = await getPool();

    // Obtenemos el listado de entradas.
    const [entries] = await pool.query(
        `
                SELECT 
                    E.id,
                    E.title,
                    E.place, 
                    E.userId = ? AS owner,
                    E.createdAt
                FROM entries E
            `,
        [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    // Retornamos las entradas.
    return entries;
};

export default selectAllEntriesModel;