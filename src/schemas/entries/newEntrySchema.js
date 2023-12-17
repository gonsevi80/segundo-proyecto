// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newEntrySchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    place: joi.string().min(3).max(30).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(10)
        .max(500)
        .required()
        .messages(joiErrorMessages),
});

export default newEntrySchema;