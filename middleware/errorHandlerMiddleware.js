const CustomError = require('../utils/custom.error');

/**
 * Middleware de manejo de errores.
 * Captura y maneja los errores personalizados (CustomError) y otros errores genéricos.
 * @param {Error} err - Error capturado.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    // Manejar errores personalizados
    res.status(err.code).json({ message: err.message, data: err.data });
  } else {
    // Manejar otros errores
    res.status(500).json({ message: 'Ha ocurrido un error inesperado.' });
  }
};

module.exports = errorHandlerMiddleware;