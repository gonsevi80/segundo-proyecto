// Importamos los modelos.
import selectUserByIdModel from '../../models/selectUserByIdModel.js';

const getUserProfileController = async (req, res, next) => {
    try {
        // Obtenemos el id del usuario de los path params.
        const { userId } = req.params;

        // Obtenemos los datos del usuario.
        const user = await selectUserByIdModel(userId);

        // Eliminamos los datos privados del usuario. (opcional)
        delete user.email;

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserProfileController;