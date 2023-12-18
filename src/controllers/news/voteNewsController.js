// Importamos los modelos.
import selectnewsByIdModel from "../../models/news/selectnewsByIdModel.js";
import insertVoteModel from "../../models/news/insertVoteModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import votenewsSchema from "../../schemas/news/votenewsSchema.js";

// Importamos los errores.
import { cannotVoteOwnnewsError } from "../../services/errorService.js";

// Función controladora final que permite votar una entrada.
const voteNewsController = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const { value } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(voteNewsSchema, req.body);

    // Obtenemos los detalles de la entrada.
    const news = await selectNewsByIdModel(newsId);

    // Si somos los dueños de la entrada lanzamos un error.
    if (news.userId === req.user.id) {
      cannotVoteOwnNewsError();
    }

    // Insertamos el voto y obtenemos la nueva media.
    const votesAvg = await insertVoteModel(value, newsId, req.user.id);

    res.send({
      status: "ok",
      data: {
        votesAvg,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default voteNewsController;
