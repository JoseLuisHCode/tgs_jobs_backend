// utils/custom.error.js
/**
 * Clase de error personalizada que extiende de la clase Error de JavaScript.
 * Permite agregar información adicional a los errores, como un código de error
 * y datos adicionales relevantes.
 */
class CustomError extends Error {
    /**
     * Crea una instancia de CustomError.
     * @param {string} message - Mensaje de error.
     * @param {number} code - Código de error.
     * @param {*} data - Datos adicionales relevantes para el error.
     */
    constructor(message, code, data) {
      super(message);
      this.code = code;
      this.data = data;
    }
  }
  
  module.exports = CustomError;