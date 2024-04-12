// controllers/vancancy.controller.js

// Importar el servicio de vacantes.
const VacancyService = require('../services/vacancy.service');

const VacancyController = {
  /**
 * Crea una nueva vacante.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Object} next - Función para pasar al siguiente middleware.
 */
  createVacancy: async (req, res, next) => {
    try {
      const { body: vacancyData } = req;
      const { user: authUser } = req;

      const newVacancy = await VacancyService.createVacancy(vacancyData, authUser);
      res.status(201).json(newVacancy);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Obtiene todas las vacantes disponibles.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Object} next - Función para pasar al siguiente middleware.
   */
  getAllVacancy: async (req, res, next) => {
    try {
      const vacancies = await VacancyService.getAllVacancy();
      res.json(vacancies);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Obtiene una vacante por su ID.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Object} next - Función para pasar al siguiente middleware.
   */
  getVacancyById: async (req, res, next) => {
    try {
      const { params: { vacancyId } } = req;

      const vacancy = await VacancyService.getVacancyById(vacancyId);
      res.json(vacancy);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Actualiza una vacante existente.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Object} next - Función para pasar al siguiente middleware.
   */
  updateVacancy: async (req, res, next) => {
    try {
      const { params: { vacancyId }, body: vacancyData } = req;
      const { user: authUser } = req;

      const updatedVacancy = await VacancyService.updateVacancy(vacancyId, vacancyData, authUser);
      res.json(updatedVacancy);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Elimina una vacante existente.
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @param {Object} next - Función para pasar al siguiente middleware.
   */
  deleteVacancy: async (req, res, next) => {
    try {
      const { params: { vacancyId } } = req;
      const { user: authUser } = req;

      const deletedVacancy = await VacancyService.deleteVacancy(vacancyId, authUser);
      res.json(deletedVacancy);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = VacancyController;