// Importamos los modelos.
import updateUserRegCodeModel from '../../models/updateUserRegCodeModel.js';

// Función controladora final que valida a un usuario recién registrado.
const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro de los path params.
        const { registrationCode } = req.params;
        
        // Activamos el usuario.
        const user = await updateUserRegCodeModel(registrationCode);
        console.log(user);
        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;