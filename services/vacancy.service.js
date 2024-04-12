// services/vacancy.service.js

const Vacancy = require('../models/Vacancy');
const Error = require('../middleware/errorHandlerMiddleware')

/**
 * Servicio de gestión de vacantes.
 */
class VacancyService {
  /**
   * Crea una nueva vacante.
   * @param {Object} vacancyData - Datos de la vacante a crear.
   * @param {Object} authUser - Objeto de usuario autenticado.
   * @returns {Promise<Vacancy>} Vacante creada.
   * @throws {Error} Si el usuario autenticado no tiene rol de administrador.
   */
  static async createVacancy(vacancyData, authUser) {
    // Verificar si el usuario autenticado tiene rol de administrador
    if (!authUser || authUser.rol !== 'admin') {
      throw new Error('Acceso no autorizado para crear vacantes.');
    }

    // Crear una nueva vacante
    const vacancy = new Vacancy(vacancyData);
    await vacancy.save();

    return vacancy;
  }

  /**
   * Obtiene todas las vacantes disponibles.
   * @returns {Promise<Array<Vacancy>>} Arreglo de vacantes.
   */
  static async getAllVacancy() {
    
    const vacancies = await Vacancy.find({});
    return vacancies;
  }

  /**
   * Obtiene una vacante por su ID.
   * @param {string} vacancyId - ID de la vacante.
   * @returns {Promise<Vacancy>} Objeto de vacante.
   * @throws {Error} Si la vacante no se encuentra.
   */
  static async getVacancyById(vacancyId) {
    
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      throw new Error('Vacante no encontrada.');
    }
    return vacancy;
  }

  /**
   * Actualiza una vacante existente.
   * @param {string} vacancyId - ID de la vacante a actualizar.
   * @param {Object} vacancyData - Nuevos datos de la vacante.
   * @param {Object} authUser - Objeto de usuario autenticado.
   * @returns {Promise<Vacancy>} Vacante actualizada.
   * @throws {Error} Si la vacante no se encuentra o el usuario autenticado no tiene rol de administrador.
   */
  static async updateVacancy(vacancyId, vacancyData, authUser) {
    // Verificar si el usuario autenticado tiene rol de administrador
    if (!authUser || authUser.rol !== 'admin') {
      throw new Error('Acceso no autorizado para actualizar vacantes.');
    }

    // Obtener la vacante por su ID
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      throw new Error('Vacante no encontrada.');
    }

    // Actualizar los datos de la vacante
    Object.assign(vacancy, vacancyData);
    await vacancy.save();

    return vacancy;
  }

  /**
   * Elimina una vacante existente.
   * @param {string} vacancyId - ID de la vacante a eliminar.
   * @param {Object} authUser - Objeto de usuario autenticado.
   * @returns {Promise<Vacancy>} Vacante eliminada.
   * @throws {Error} Si la vacante no se encuentra o el usuario autenticado no tiene rol de administrador.
   */
  static async deleteVacancy(vacancyId, authUser) {
    // Verificar si el usuario autenticado tiene rol de administrador
    if (!authUser || authUser.rol !== 'admin') {
      throw new Error('Acceso no autorizado para eliminar vacantes.');
    }

    // Obtener la vacante por su ID
    const vacancy = await Vacancy.findByIdAndDelete(vacancyId);
    if (!vacancy) {
      throw new Error('Vacante no encontrada.');
    }

    return vacancy;
  }
}

module.exports = VacancyService;