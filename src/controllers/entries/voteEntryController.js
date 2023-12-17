// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import insertVoteModel from '../../models/entries/insertVoteModel.js';

// Importamos los servicios.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema.
import voteEntrySchema from '../../schemas/entries/voteEntrySchema.js';

// Importamos los errores.
import { cannotVoteOwnEntryError } from '../../services/errorService.js';

// Función controladora final que permite votar una entrada.
const voteEntryController = async (req, res, next) => {
    try {
        const { entryId } = req.params;
        const { value } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(voteEntrySchema, req.body);

        // Obtenemos los detalles de la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si somos los dueños de la entrada lanzamos un error.
        if (entry.userId === req.user.id) {
            cannotVoteOwnEntryError();
        }

        // Insertamos el voto y obtenemos la nueva media.
        const votesAvg = await insertVoteModel(value, entryId, req.user.id);

        res.send({
            status: 'ok',
            data: {
                votesAvg,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default voteEntryController;