// controllers/applicationController.js
const Application = require('../models/Application');

const applicationController = {
  createApplication: async (req, res) => {
    try {
      const { userId, jobId, details } = req.body;

      // Verificar si ya existe una aplicación para este usuario y trabajo
      const existingApplication = await Application.findOne({ userId, jobId });

      if (existingApplication) {
        return res.status(400).json({ error: 'Ya has aplicado a esta vacante.' });
      }

      const application = new Application({ userId, jobId, details });
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

  updateApplicationStatus: async (req, res) => {
    const { applicationId, status } = req.body;

    try {
      const updatedApplication = await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true }
      );

      res.json(updatedApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = applicationController;