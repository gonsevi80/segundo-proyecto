// Importamos las dependencias.
import { v4 as uuid } from 'uuid';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { voteAlreadyExistsError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para votar una entrada.
const insertVoteModel = async (value, entryId, userId) => {
    const pool = await getPool();

    // Comprobamos si ya existe un voto previo por parte del usuario que está intentando
    // votar.
    const [votes] = await pool.query(
        `SELECT id FROM entryVotes WHERE userId = ? AND entryId = ?`,
        [userId, entryId]
    );

    // Si la longitud del array de votos es mayor que cero lanzamos un error indicando
    // que la entrada ya ha sido votada por este usuario.
    if (votes.length > 0) {
        voteAlreadyExistsError();
    }

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO entryVotes(id, value, entryId, userId) VALUES(?, ?, ?, ?)`,
        [uuid(), value, entryId, userId]
    );

    // Obtenemos la media de votos.
    const [votesAvg] = await pool.query(
        `SELECT AVG(value) AS avg FROM entryVotes WHERE entryId = ?`,
        [entryId]
    );

    // Retornamos la media de votos.
    return Number(votesAvg[0].avg);
};

export default insertVoteModel;