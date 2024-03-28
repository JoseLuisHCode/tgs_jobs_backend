// controllers/applicationController.js
const Application = require('../models/Application');

const applicationController = {
  createApplication: async (req, res) => {
    try {
      const { resume } = req.body;
      const userId = req.user.userId;
      
      const jobId = req.params.jobId;
      

      // Verificar si ya existe una aplicación para este usuario y trabajo
      const existingApplication = await Application.findOne({ userId, jobId });

      if (existingApplication) {
        return res.status(400).json({ error: 'Ya has aplicado a esta vacante.' });
      }

      const application = new Application({ userId, jobId, resume });
      const savedApplication = await application.save();

      res.status(201).json(savedApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllApplications: async (req, res) => {
    try {
      const applications = await Application.find();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getApplicationsByJobId: async (req, res) => {
    const jobId = req.params.jobId;
    try {
      const applications = await Application.find({ jobId });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getApplicationsByUserId: async (req, res) => {
    const userId = req.user.userId;
    try {
      const applications = await Application.find({ userId });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateApplicationStatus: async (req, res) => {
    
    const validStatuses = ['approved', 'rejected'];
   const { id, status } = req.params;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Estado de aplicación no válido' });
  }

    try {
      const updatedApplication = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedApplication) {
        return res.status(404).json({ message: 'Aplicación no encontrada' });
      }

      res.json(updatedApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteApplicationsUser: async (req, res) => {
    const aplicaciones = req.body;
    const userId = req.user.userId;
    console.log(aplicaciones)
    console.log(userId);


    try {     
        const deletedApplications = await Application.deleteMany({ _id: { $in: aplicaciones }, userId });

        if (deletedApplications.deletedCount === 0) {
            return res.status(404).json({ message: 'No se encontraron aplicaciones para eliminar' });
        }

        res.json({ message: 'Aplicaciones eliminadas correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },

  deleteApplicationsAdmin: async (req, res) => {
    const  aplicaciones  = req.body; // Obtener los IDs de las aplicaciones a eliminar

    try {
        // Utilizar el método deleteMany para eliminar múltiples aplicaciones
        const deletedApplications = await Application.deleteMany({ _id: { $in: aplicaciones } });

        if (deletedApplications.deletedCount === 0) {
            return res.status(404).json({ message: 'No se encontraron aplicaciones para eliminar' });
        }

        res.json({ message: 'Aplicaciones eliminadas correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },

};

module.exports = applicationController;