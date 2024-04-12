// services/application.service.js

const Application = require('../models/Application');
const Error = require('../middleware/errorHandlerMiddleware')

class ApplicationService {
    /**
   * Crea una nueva aplicación.
   * @param {string} userId - ID del usuario.
   * @param {string} vacancyId - ID de la vacante.
   * @param {string} resume - Resumen de la aplicación.
   * @returns {Promise<Application>} La aplicación creada.
   */
static async createApplication (userId, vacancyId, resume){
    try {
        // Verificar si ya existe una aplicación para este usuario y trabajo
        const existingApplication = await application.findOne({ userId, vacancyId });

        if (existingApplication) {
            throw new Error('Ya has aplicado a esta vacante.', 400);
        }

        const application = new Application({ userId, vacancyId, resume });
        await application.save();

        return application;
    } catch (error) {
        throw new Error(error.message);
    }

}
/**
   * Obtiene todas las aplicaciones.
   * @returns {Promise<Array<Application>>} Todas las aplicaciones.
   */
static async getAllApplications() {
    try {
      const applications = await Application.find();
      return applications;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Obtiene las aplicaciones por ID de la vacante.
   * @param {string} vacancyId - ID de la vacante.
   * @returns {Promise<Array<Application>>} Las aplicaciones para el trabajo especificado.
   */
  static async getApplicationsByVacancyId(vacancyId) {
    try {
      const applications = await Application.find({ vacancyId });
      return applications;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Obtiene las aplicaciones por ID de usuario.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<Array<Application>>} Las aplicaciones para el usuario especificado.
   */
  static async getApplicationsByUserId(userId) {
    try {
      const applications = await Application.find({ userId });
      return applications;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Actualiza el estado de una aplicación.
   * @param {string} id - ID de la aplicación.
   * @param {string} status - Nuevo estado de la aplicación.
   * @returns {Promise<Application>} La aplicación actualizada.
   */
  static async updateApplicationStatus(id, status) {
    try {
      const validStatuses = ['approved', 'rejected'];

      if (!validStatuses.includes(status)) {
        throw new Error('Estado de aplicación no válido', 400);
      }

      const updatedApplication = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedApplication) {
        throw new Error('Aplicación no encontrada', 404);
      }

      return updatedApplication;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Elimina las aplicaciones de un usuario.
   * @param {Array<string>} applicationIds - IDs de las aplicaciones a eliminar.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<string>} Mensaje de éxito.
   */
  static async deleteApplicationsUser(applicationIds, userId) {
    try {
      const deletedApplications = await Application.deleteMany({ _id: { $in: applicationIds }, userId });

      if (deletedApplications.deletedCount === 0) {
        throw new Error('No se encontraron aplicaciones para eliminar');
      }

      return 'Aplicaciones eliminadas correctamente';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Elimina las aplicaciones de un administrador.
   * @param {Array<string>} applicationIds - IDs de las aplicaciones a eliminar.
   * @returns {Promise<string>} Mensaje de éxito.
   */
  static async deleteApplicationsAdmin(applicationIds) {
    try {
      const deletedApplications = await Application.deleteMany({ _id: { $in: applicationIds } });

      if (deletedApplications.deletedCount === 0) {
        throw new Error('No se encontraron aplicaciones para eliminar');
      }

      return 'Aplicaciones eliminadas correctamente';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ApplicationService;

