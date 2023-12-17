// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para obtener información de una
// entrada concreta.
const selectEntryByIdModel = async (entryId, userId = '') => {
    const pool = await getPool();

    // Obtenemos la información necesaria de la entrada.
    const [entries] = await pool.query(
        `
                SELECT 
                    E.id,
                    E.title,
                    E.place, 
                    E.description,
                    E.userId,
                    U.username,
                    BIT_OR(V.userId = ?) AS votedByMe, 
                    E.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    E.createdAt
                FROM entries E
                LEFT JOIN entryVotes V ON V.entryId = E.id
                INNER JOIN users U ON U.id = E.userId
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
        [userId, userId, entryId]
    );

    // Obtenemos el array de fotos de la entrada.
    const [photos] = await pool.query(
        `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
        [entryId]
    );

    // Agregamos el array de fotos a la entrada.
    entries[0].photos = photos;

    // Establecemos como valores booleanos "votedByMe" y "owner"
    entries[0].votedByMe = Boolean(entries[0].votedByMe);
    entries[0].owner = Boolean(entries[0].owner);

    // La media de votos es un valor de tipo String. Podemos convertirla a Number.
    entries[0].votes = Number(entries[0].votes);

    return {
        ...entries[0],
        photos,
    };
};

export default selectEntryByIdModel;