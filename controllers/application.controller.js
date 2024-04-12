// controllers/application.controller.js

// Importar el servicio de aplicaciones.
const ApplicationService = require('../services/application.service');

/**
 * Controlador para gestionar las aplicaciones.
 */

const applicationController = {
    /**
     * Crea una nueva aplicación.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    createApplication: async (req, res, next) => {
        try {            
            const { resume } = req.body;
            const userId = req.user.userId;
            const vacancyId = req.params.vacancyId;

            const savedApplication = await ApplicationService.createApplication(userId, vacancyId, resume);
            res.status(201).json(savedApplication);
        } catch (err) {
            next(err);
        }
    },

    /**
     * Obtiene todas las aplicaciones.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    getAllApplications: async (req, res, next) => {
        try {
            const applications = await ApplicationService.getAllApplications();
            res.json(applications);
        } catch (err) {
            next(err);
        }
    },

    /**
     * Obtiene todas las aplicaciones para un trabajo específico.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    getApplicationsByVacancyId: async (req, res, next) => {
        const vacancyId = req.params.vacancyId;
        try {
            const applications = await ApplicationService.getApplicationsByVacancyId(vacancyId);
            res.json(applications);
        } catch (err) {
            next(err);
        }
    },

    /**
     * Obtiene todas las aplicaciones de un usuario específico.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    getApplicationsByUserId: async (req, res, next) => {
        const userId = req.user.userId;
        try {
            const applications = await ApplicationService.getApplicationsByUserId(userId);
            res.json(applications);
        } catch (err) {
            next(err);
        }
    },

    /**
     * Actualiza el estado de una aplicación.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    updateApplicationStatus: async (req, res, next) => {
        const { id, status } = req.params;

        try {
            const updatedApplication = await ApplicationService.updateApplicationStatus(id, status);
            res.json(updatedApplication);
        } catch (err) {
            next(err);
        }
    },

    /**
     * Elimina las aplicaciones de un usuario.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    deleteApplicationsUser: async (req, res, next) => {
        const aplicaciones = req.body;
        const userId = req.user.userId;

        try {
            const result = await ApplicationService.deleteApplicationsUser(aplicaciones, userId);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    /**
     * Elimina las aplicaciones de un administrador.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @param {Function} next - Función para pasar al siguiente middleware.
     */
    deleteApplicationsAdmin: async (req, res, next) => {
        const aplicaciones = req.body;

        try {
            const result = await ApplicationService.deleteApplicationsAdmin(aplicaciones);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = applicationController;