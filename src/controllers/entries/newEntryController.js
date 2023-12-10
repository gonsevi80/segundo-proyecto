// Importamos los modelos.
import insertEntryModel from '../../models/entries/insertEntryModel.js';

// Importamos los servicios.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema.
import newEntrySchema from '../../schemas/entries/newEntrySchema.js';

// Función controladora final que agrega una nueva entrada.
const newEntryController = async (req, res, next) => {
    try {
        const { title, place, description } = req.body;

        // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
        await validateSchemaUtil(
            newEntrySchema,
            Object.assign(req.body)
        );

        // Insertamos la entrada y obtenemos el id que se le ha asignado.
        const entryId = await insertEntryModel(
            title,
            place,
            description,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                entry: {
                    id: entryId,
                    title,
                    place,
                    description,
                    userId: req.user.id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newEntryController;